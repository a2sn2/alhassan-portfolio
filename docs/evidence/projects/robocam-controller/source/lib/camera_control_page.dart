import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:io';
import 'dart:async';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_joystick/flutter_joystick.dart';
import 'media_gallery_page.dart';
import 'support_page.dart';
import 'generated/l10n.dart';
import 'package:logger/logger.dart';
import 'package:flutter/services.dart';


/// This page controls the camera and drone functionalities,
/// including video recording, photo capture, and exposure settings.
class CameraControlPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Camera Control')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {  },
          child: Text('Trigger Action'),
        ),
      ),
    );
  }
}

class DroneControlPage extends StatefulWidget {
  final Function(Locale) setLocale;

  DroneControlPage({required this.setLocale});
  @override
  _DroneControlPageState createState() => _DroneControlPageState();
}

class _DroneControlPageState extends State<DroneControlPage> {
  // Add a theme variable
  bool _isDarkMode = false;

  // Camera controller and other variables
  CameraController? _cameraController;
  List<CameraDescription>? cameras;
  double _currentZoom = 1.0;
  double _maxZoom = 1.0;
  bool _isInitializing = true;
  bool _flashOn = false;
  bool _isRecording = false;
  bool _isCapturing = false;
  bool _isRapidCapturing = false;
  int _captureInterval = 200; // Interval in milliseconds

  double _currentExposureOffset = 0.0;
  double _minExposureOffset = 0.0;
  double _maxExposureOffset = 0.0;

  Timer? _recordingTimer;
  Timer? _rapidCaptureTimer;
  int _recordingTime = 0; // Recording time in seconds
  int _captureCount = 0; // Rapid capture count

  @override
  void initState() {
    super.initState();
    _initializeCamera();
    _requestPermissions();
  }


  /// Initializes the camera and requests necessary permissions.

  Future<void> _initializeCamera() async {
    try {
      cameras = await availableCameras();
      _cameraController = CameraController(
        cameras![0],
        ResolutionPreset.high,
      );

      await _cameraController?.initialize();

      if (_cameraController != null && _cameraController!.value.isInitialized) {
        _minExposureOffset = await _cameraController!.getMinExposureOffset();
        _maxExposureOffset = await _cameraController!.getMaxExposureOffset();
        _maxZoom = await _cameraController!.getMaxZoomLevel();
        setState(() {
          _currentExposureOffset = 0.0;
        });
      }

      setState(() {
        _isInitializing = false;
      });
    } catch (e) {
      setState(() {
        _isInitializing = false;
      });
      _showSnackbar('Error initializing camera: $e', isError: true);
    }
  }

  Future<void> _requestPermissions() async {
    final permissions = [
      Permission.camera,
      Permission.storage,
      Permission.manageExternalStorage,
    ];

    for (var permission in permissions) {
      if (!await permission.isGranted) {
        final result = await permission.request();
        if (result.isDenied) {
          // Show a dialog or snackbar to inform the user
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Permission for ${permission.toString()} is denied.')),
          );
        }
      }
    }
  }


  @override
  void dispose() {
    _stopRecording(); // Ensure recording is stopped
    _cameraController?.dispose();
    _recordingTimer?.cancel();
    _rapidCaptureTimer?.cancel();
    super.dispose();
  }

  Future<void> _setExposure(double exposureOffset) async {
    if (_cameraController != null && _cameraController!.value.isInitialized) {
      try {
        await _cameraController!.setExposureOffset(exposureOffset);
        setState(() {
          _currentExposureOffset = exposureOffset;
        });
      } catch (e) {
        _showSnackbar('Error setting exposure: $e', isError: true);
      }
    }
  }

  Future<void> _setZoom(double zoomLevel) async {
    if (_cameraController != null && _cameraController!.value.isInitialized) {
      try {
        await _cameraController!.setZoomLevel(zoomLevel);
        setState(() {
          _currentZoom = zoomLevel;
        });
      } catch (e) {
        _showSnackbar('Error setting zoom: $e', isError: true);
      }
    }
  }

  Future<void> _toggleFlash() async {
    if (_cameraController != null && _cameraController!.value.isInitialized) {
      try {
        if (_flashOn) {
          await _cameraController!.setFlashMode(FlashMode.off);
          setState(() {
            _flashOn = false;
          });
        } else {
          await _cameraController!.setFlashMode(FlashMode.torch);
          setState(() {
            _flashOn = true;
          });
        }
      } catch (e) {
        _showSnackbar('Error toggling flash: $e', isError: true);
      }
    }
  }
  /// Starts or stops video recording based on the current recording state.

  Future<void> _startStopRecording() async {
    if (_isRecording) {
      await _stopRecording(); // Stop recording if currently recording
    } else {
      try {
        await _cameraController!.setFlashMode(FlashMode.off);// Ensure flash is off
        await _cameraController!.startVideoRecording();// Start video recording
        setState(() {
          _isRecording = true;
          _recordingTime = 0;// Reset recording time
        });

        // Periodic timer to update recording time every second

        _recordingTimer = Timer.periodic(Duration(seconds: 1), (timer) {
          setState(() {
            _recordingTime++; // Increment recording time
          });
        });

        _showSnackbar('Recording started');
      } catch (e) {
        _showSnackbar('Error starting video recording: $e', isError: true);
      }
    }
  }

  Future<void> _stopRecording() async {
    if (_cameraController != null &&
        _cameraController!.value.isRecordingVideo) {
      try {
        final XFile file = await _cameraController!.stopVideoRecording();
        final String filePath = file.path;

        final File originalFile = File(filePath);
        if (await originalFile.exists()) {
          final String newPath =
              '${await _getExternalDirectory('Videos')}/video_${DateTime.now().millisecondsSinceEpoch}.mp4';
          await _saveFile(originalFile, newPath);
          _showSnackbar('Video saved to $newPath');
        } else {
          _showSnackbar('Error: Video file does not exist', isError: true);
        }

        setState(() {
          _isRecording = false;
        });
        _recordingTimer?.cancel();
      } catch (e) {
        _showSnackbar('Error stopping video recording: $e', isError: true);
      }
    }
  }

  /// Starts rapid photo capture at a defined interval.
  /// Stops if _isCapturing is set to false.
  Future<void> _startRapidCapture() async {
    if (_isCapturing) {
      setState(() {
        _isCapturing = false;
      });
      _rapidCaptureTimer?.cancel();
      _showSnackbar('Rapid capture stopped');
      return;
    }

    setState(() {
      _isCapturing = true;
      _captureCount = 0;
    });

    _rapidCaptureTimer =
        Timer.periodic(Duration(milliseconds: _captureInterval), (timer) async {
          if (!_isCapturing) {
            timer.cancel();
            return;
          }

          // Ensure the camera is ready for the next capture
          try {
            // Check if the camera is processing a previous capture
            if (_cameraController!.value.isTakingPicture) {
              return; // Skip this capture, try again later
            }

            await _capturePhoto();
            setState(() {
              _captureCount++;
            });
          } catch (e) {
            _showSnackbar('Error during rapid capture: $e', isError: true);
            _isCapturing = false;
            timer.cancel();
          }
        });

    _showSnackbar('Rapid capture started');
  }

  Future<void> _capturePhoto() async {
    if (_isRecording) {
      _showSnackbar('Photo capture while recording is not supported',
          isError: true);
      return;
    }

    try {
      await _cameraController!.setFlashMode(FlashMode.off);

      final XFile file = await _cameraController!.takePicture();
      final String filePath = file.path;

      final File originalFile = File(filePath);
      if (await originalFile.exists()) {
        final String newPath =
            '${await _getExternalDirectory('Photos')}/photo_${DateTime.now().millisecondsSinceEpoch}.jpg';
        await _saveFile(originalFile, newPath);
        _showSnackbar('Photo saved to $newPath');
      } else {
        _showSnackbar('Error: Photo file does not exist', isError: true);
      }
    } catch (e) {
      _showSnackbar('Error capturing photo: $e', isError: true);
    }
  }

  Future<String> _getExternalDirectory(String type) async {
    if (await Permission.manageExternalStorage.isGranted) {
      const sdCardPath =
          '/storage/0123-4567'; // Replace with your SD card path if different
      final drone1Dir = Directory('$sdCardPath/Drone1/$type');
      if (!await drone1Dir.exists()) {
        await drone1Dir.create(recursive: true);
      }
      return drone1Dir.path;
    }

    final internalDir = await getApplicationDocumentsDirectory();
    final drone1Dir = Directory('${internalDir.path}/Drone1/$type');
    if (!await drone1Dir.exists()) {
      await drone1Dir.create(recursive: true);
    }
    return drone1Dir.path;
  }

  Future<void> _saveFile(File originalFile, String newPath) async {
    try {
      await originalFile.copy(newPath);
      await originalFile.delete();
    } catch (e) {
      _showSnackbar('Error saving file: $e', isError: true);
    }
  }

  void _showSnackbar(String message, {bool isError = false}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red : Colors.green,
      ),
    );
  }

  Widget _buildAnimatedFunctionButton(
      String label,
      IconData icon,
      VoidCallback onPressed, {
        Color? highContrastColor,
      }) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: highContrastColor ?? Colors.blue,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 24),
          SizedBox(height: 8),
          Text(label, style: TextStyle(fontSize: 16)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final localizations = S.of(context); // Access localization
    if (_isInitializing) {
      return Center(child: CircularProgressIndicator());
    }

    // Toggle theme based on _isDarkMode
    final themeData = _isDarkMode ? ThemeData.dark() : ThemeData.light();
    if (_cameraController == null || !_cameraController!.value.isInitialized) {
      return Center(child: Text(localizations.failedToInitializeCamera));
    }

    final bool isHighContrast = MediaQuery.of(context).highContrast;
    final Color buttonColor =
    isHighContrast ? Colors.yellow : Colors.blueAccent;

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text(localizations.appTitle),
        backgroundColor: _isDarkMode ? Colors.black : Colors.blue,
        actions: [
          IconButton(
            icon: Icon(Icons.photo_library),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => MediaGalleryPage()),
              );
            },
          ),
          IconButton(
            icon: Icon(Icons.help_outline),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SupportPage()),
              );
            },
          ),
          PopupMenuButton<Locale>(
            icon: Icon(Icons.language),
            onSelected: (Locale locale) {
              widget.setLocale(locale);
            },
            itemBuilder: (BuildContext context) => <PopupMenuEntry<Locale>>[
              PopupMenuItem<Locale>(
                value: Locale('en'),
                child: Text('English'),
              ),
              PopupMenuItem<Locale>(
                value: Locale('es'),
                child: Text('Español'),
              ),
              PopupMenuItem<Locale>(
                value: Locale('ar'),
                child: Text('العربية'),  // Arabic Language
              ),
              // Add more languages as needed
            ],
          ),

          IconButton(
            icon: Icon(_isDarkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () {
              setState(() {
                _isDarkMode = !_isDarkMode; // Toggle dark mode
              });
            },
          ),

        ],
      ),
      body: Container(
        child: Column(
          children: [
            AspectRatio(
              aspectRatio: _cameraController!.value.aspectRatio,
              child: CameraPreview(_cameraController!),
            ),

            Expanded(
              child: ListView(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        SizedBox(height: 20),
                        Wrap(
                          spacing: 16.0,
                          runSpacing: 16.0,
                          alignment: WrapAlignment.center,
                          children: <Widget>[
                            _buildAnimatedFunctionButton(
                              localizations.capturePhoto,
                              Icons.camera,
                              _capturePhoto,
                              highContrastColor: buttonColor,
                            ),
                            _buildAnimatedFunctionButton(
                              _isRecording
                                  ? localizations.stopRecording
                                  : localizations.startRecording,
                              _isRecording ? Icons.stop : Icons.videocam,
                              _startStopRecording,
                              highContrastColor: buttonColor,
                            ),
                            _buildAnimatedFunctionButton(
                              _flashOn
                                  ? localizations.flashOff
                                  : localizations.flashOn,
                              _flashOn ? Icons.flash_off : Icons.flash_on,
                              _toggleFlash,
                              highContrastColor: buttonColor,
                            ),
                            _buildAnimatedFunctionButton(
                              _isCapturing
                                  ? localizations.stopRapidCapture
                                  : localizations.startRapidCapture,
                              Icons.camera,
                              _startRapidCapture,
                              highContrastColor: buttonColor,
                            ),
                          ],
                        ),
                        SizedBox(height: 20),
                        Text(
                          '${localizations.recordingTime(_recordingTime)}', // Adjust according to your localization function
                          style: TextStyle(color: Colors.white),
                        ),
                        SizedBox(height: 20),
                        Slider(
                          value: _currentExposureOffset,
                          min: _minExposureOffset,
                          max: _maxExposureOffset,
                          onChanged: (newValue) {
                            _setExposure(newValue);
                          },
                          activeColor: Colors.white,
                          inactiveColor: Colors.grey,
                          label: localizations.exposure(_currentExposureOffset.toStringAsFixed(1)), // Update to call the function directly
                        ),
                        SizedBox(height: 20),
                        Text(
                          '${localizations.zoom(_currentZoom.toStringAsFixed(1))}',
                          style: TextStyle(color: Colors.white),
                        ),
                        Slider(
                          value: _currentZoom,
                          min: 1.0,
                          max: _maxZoom,
                          onChanged: (newValue) {
                            _setZoom(newValue);
                          },
                          activeColor: Colors.white,
                          inactiveColor: Colors.grey,
                          label:
                          '${_currentZoom.toStringAsFixed(1)}x',
                        ),
                        SizedBox(height: 20),
                        Text(
                          '${localizations.rapidCaptureCount(_captureCount)}',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Horizontal Joystick
                  Container(
                    width: 120,
                    height: 120,
                    child: Center(
                      child: AbsorbPointer(
                        absorbing: false,
                        child: Joystick(
                          mode: JoystickMode.horizontal,
                          listener: (details) {
                            if (details != null) {
                              print(localizations.horizontalJoystick(details.x));
                            }
                          }
                          ,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 20),
                  // Vertical Joystick
                  Container(
                    width: 120,
                    height: 120,
                    child: Center(
                      child: AbsorbPointer(
                        absorbing: false,
                        child: Joystick(
                          mode: JoystickMode.vertical,
                          listener: (details) {
                            if (details != null) {
                              print(localizations.verticalJoystick(details.y));
                            }
                          }
                          ,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

