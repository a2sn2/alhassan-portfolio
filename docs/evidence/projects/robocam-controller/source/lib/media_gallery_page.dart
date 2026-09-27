import 'package:flutter/material.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:flutter/services.dart';
import 'package:video_player/video_player.dart';
import 'generated/l10n.dart';

/// Class to handle media gallery functionalities.
class MediaGalleryPage extends StatefulWidget {
  @override
  _MediaGalleryPageState createState() => _MediaGalleryPageState();
}

class _MediaGalleryPageState extends State<MediaGalleryPage> {
  List<Directory> _albums = [];

  @override
  void initState() {
    super.initState();
    _loadAlbums();
  }

  Future<void> _loadAlbums() async {
    final mediaDir = await _getMediaDirectory();
    final directories = mediaDir.listSync().whereType<Directory>();

    setState(() {
      _albums = directories.toList();
    });
  }

  Future<Directory> _getMediaDirectory() async {
    const sdCardPath = '/storage/0123-4567'; // Replace with your SD card path if different
    final mediaDir = Directory('$sdCardPath/Drone1');
    if (!await mediaDir.exists()) {
      await mediaDir.create(recursive: true);
    }
    return mediaDir;
  }

  Future<void> _deleteFile(FileSystemEntity file) async {
    try {
      await file.delete();
      _loadAlbums(); // Refresh the list after deletion
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(S.of(context).fileDeleted)),
      );
    } on PlatformException catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('${S.of(context).errorDeletingFile}: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final localizations = S.of(context); // Access localization

    return Scaffold(
      appBar: AppBar(
        title: Text(localizations.mediaGallery),
        backgroundColor: Colors.black,
      ),
      body: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 4.0,
          mainAxisSpacing: 4.0,
        ),
        itemCount: _albums.length,
        itemBuilder: (context, index) {
          final album = _albums[index];
          return AlbumTile(album: album);
        },
      ),
    );
  }
}

class AlbumTile extends StatelessWidget {
  final Directory album;

  const AlbumTile({required this.album});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => MediaFilesPage(album: album),
          ),
        );
      },
      child: Card(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.folder, size: 50, color: Colors.blue),
            SizedBox(height: 8),
            Text(
              album.path.split('/').last,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

class MediaFilesPage extends StatefulWidget {
  final Directory album;

  const MediaFilesPage({required this.album});

  @override
  _MediaFilesPageState createState() => _MediaFilesPageState();
}

class _MediaFilesPageState extends State<MediaFilesPage> {
  List<FileSystemEntity> _mediaFiles = [];

  @override
  void initState() {
    super.initState();
    _loadMediaFiles();
  }

  Future<void> _loadMediaFiles() async {
    final files = widget.album.listSync();
    setState(() {
      _mediaFiles = files;
    });
  }

  Future<void> _deleteFile(FileSystemEntity file) async {
    try {
      await file.delete();
      _loadMediaFiles(); // Refresh the list after deletion
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(S.of(context).fileDeleted)),
      );
    } on PlatformException catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('${S.of(context).errorDeletingFile}: $e')),
      );
    }
  }

  String _getFileType(FileSystemEntity file) {
    final extension = file.path.split('.').last.toLowerCase();

    if (_isImageFile(extension)) {
      return 'image';
    } else if (_isVideoFile(extension)) {
      return 'video';
    }

    return 'unknown';
  }

  bool _isImageFile(String extension) {
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    return imageExtensions.contains(extension);
  }

  bool _isVideoFile(String extension) {
    const videoExtensions = ['mp4', 'avi', 'mov'];
    return videoExtensions.contains(extension);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.album.path.split('/').last),
        backgroundColor: Colors.black,
      ),
      body: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 4.0,
          mainAxisSpacing: 4.0,
        ),
        itemCount: _mediaFiles.length,
        itemBuilder: (context, index) {
          final file = _mediaFiles[index];
          final fileType = _getFileType(file);

          if (fileType == 'image') {
            // Show images
            return GestureDetector(
              onTap: () {
                // Navigate to Image Viewer on tap
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ImageViewerScreen(imagePath: file.path),
                  ),
                );
              },
              child: GridTile(
                child: Image.file(
                  File(file.path),
                  fit: BoxFit.cover,
                ),
                footer: GridTileBar(
                  backgroundColor: Colors.black54,
                  trailing: IconButton(
                    icon: Icon(Icons.delete, color: Colors.red),
                    onPressed: () => _deleteFile(file),
                  ),
                ),
              ),
            );
          } else if (fileType == 'video') {
            // Show video thumbnail
            return VideoGridTile(file: file, onDelete: _deleteFile);
          } else {
            return Container(); // Placeholder for unsupported file types
          }
        },
      ),
    );
  }
}

class VideoGridTile extends StatefulWidget {
  final FileSystemEntity file;
  final Function(FileSystemEntity) onDelete;

  const VideoGridTile({required this.file, required this.onDelete});

  @override
  _VideoGridTileState createState() => _VideoGridTileState();
}

class _VideoGridTileState extends State<VideoGridTile> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.file(File(widget.file.path))
      ..initialize().then((_) {
        setState(() {}); // Refresh to show video thumbnail
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GridTile(
      child: GestureDetector(
        onTap: () {
          // Play video on tap
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => VideoPlayerScreen(controller: _controller),
            ),
          );
        },
        child: _controller.value.isInitialized
            ? VideoPlayer(_controller)
            : CircularProgressIndicator(), // Loading indicator until the video is ready
      ),
      footer: GridTileBar(
        backgroundColor: Colors.black54,
        trailing: IconButton(
          icon: Icon(Icons.delete, color: Colors.red),
          onPressed: () => widget.onDelete(widget.file),
        ),
      ),
    );
  }
}

class ImageViewerScreen extends StatelessWidget {
  final String imagePath;

  const ImageViewerScreen({required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Image Viewer'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        child: Image.file(File(imagePath)), // Display the image
      ),
    );
  }
}

class VideoPlayerScreen extends StatelessWidget {
  final VideoPlayerController controller;

  const VideoPlayerScreen({required this.controller});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Video Player'),
        backgroundColor: Colors.black,
      ),
      body: Center(
        child: controller.value.isInitialized
            ? AspectRatio(
          aspectRatio: controller.value.aspectRatio,
          child: VideoPlayer(controller),
        )
            : CircularProgressIndicator(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (controller.value.isPlaying) {
            controller.pause();
          } else {
            controller.play();
          }
        },
        child: Icon(controller.value.isPlaying ? Icons.pause : Icons.play_arrow),
      ),
    );
  }
}
