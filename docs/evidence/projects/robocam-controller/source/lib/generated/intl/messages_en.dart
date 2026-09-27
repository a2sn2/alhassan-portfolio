// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a en locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names, avoid_escaping_inner_quotes
// ignore_for_file:unnecessary_string_interpolations, unnecessary_string_escapes

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary {
  String get localeName => 'en';

  static String m0(exposure) => "Exposure: ${exposure}";

  static String m1(value) => "Horizontal Joystick Value: ${value}";

  static String m2(count) => "Rapid Capture Count: ${count}";

  static String m3(time) => "Recording time: ${time}";

  static String m4(value) => "Vertical Joystick Value: ${value}";

  static String m5(zoom) => "Zoom: ${zoom}";

  final messages = _notInlinedMessages(_notInlinedMessages);
  static Map<String, Function> _notInlinedMessages(_) => <String, Function>{
        "appTitle": MessageLookupByLibrary.simpleMessage("Drone Controller"),
        "cameraNotReady":
            MessageLookupByLibrary.simpleMessage("Camera is not ready"),
        "capturePhoto": MessageLookupByLibrary.simpleMessage("Capture Photo"),
        "contactSupport":
            MessageLookupByLibrary.simpleMessage("Contact Support"),
        "errorDeletingFile":
            MessageLookupByLibrary.simpleMessage("Error deleting file"),
        "exposure": m0,
        "failedToInitializeCamera": MessageLookupByLibrary.simpleMessage(
            "Failed to initialize camera."),
        "faq": MessageLookupByLibrary.simpleMessage("FAQ"),
        "fileDeleted": MessageLookupByLibrary.simpleMessage("File deleted"),
        "flashOff": MessageLookupByLibrary.simpleMessage("Flash Off"),
        "flashOn": MessageLookupByLibrary.simpleMessage("Flash On"),
        "helpAndSupport": MessageLookupByLibrary.simpleMessage(
            "For help and support, please choose an option below:"),
        "horizontalJoystick": m1,
        "inAppSupport": MessageLookupByLibrary.simpleMessage("In-App Support"),
        "joinUserCommunity":
            MessageLookupByLibrary.simpleMessage("Join User Community"),
        "mediaGallery": MessageLookupByLibrary.simpleMessage("Media Gallery"),
        "photos": MessageLookupByLibrary.simpleMessage("Photos"),
        "rapidCaptureCount": m2,
        "recordingTime": m3,
        "startRapidCapture":
            MessageLookupByLibrary.simpleMessage("Start Rapid Capture"),
        "startRecording":
            MessageLookupByLibrary.simpleMessage("Start Recording"),
        "stopRapidCapture":
            MessageLookupByLibrary.simpleMessage("Stop Rapid Capture"),
        "stopRecording": MessageLookupByLibrary.simpleMessage("Stop Recording"),
        "verticalJoystick": m4,
        "videos": MessageLookupByLibrary.simpleMessage("Videos"),
        "welcomeToSupport":
            MessageLookupByLibrary.simpleMessage("Welcome to Support!"),
        "zoom": m5
      };
}
