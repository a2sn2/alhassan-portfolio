// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a es locale. All the
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
  String get localeName => 'es';

  static String m0(exposure) => "Exposición: ${exposure}";

  static String m1(value) => "Valor del Joystick Horizontal: ${value}";

  static String m2(count) => "Conteo de Capturas Rápidas: ${count}";

  static String m3(time) => "Tiempo de grabación: ${time}";

  static String m4(value) => "Valor del Joystick Vertical: ${value}";

  static String m5(zoom) => "Zoom: ${zoom}";

  final messages = _notInlinedMessages(_notInlinedMessages);
  static Map<String, Function> _notInlinedMessages(_) => <String, Function>{
        "appTitle":
            MessageLookupByLibrary.simpleMessage("Controlador de Drone"),
        "cameraNotReady":
            MessageLookupByLibrary.simpleMessage("La cámara no está lista"),
        "capturePhoto": MessageLookupByLibrary.simpleMessage("Capturar Foto"),
        "contactSupport":
            MessageLookupByLibrary.simpleMessage("Contactar Soporte"),
        "errorDeletingFile": MessageLookupByLibrary.simpleMessage(
            "Error al eliminar el archivo"),
        "exposure": m0,
        "failedToInitializeCamera": MessageLookupByLibrary.simpleMessage(
            "Error al inicializar la cámara."),
        "faq": MessageLookupByLibrary.simpleMessage("Preguntas Frecuentes"),
        "fileDeleted":
            MessageLookupByLibrary.simpleMessage("Archivo eliminado"),
        "flashOff": MessageLookupByLibrary.simpleMessage("Flash Apagado"),
        "flashOn": MessageLookupByLibrary.simpleMessage("Flash Encendido"),
        "helpAndSupport": MessageLookupByLibrary.simpleMessage(
            "Para ayuda y soporte, por favor elija una opción a continuación:"),
        "horizontalJoystick": m1,
        "inAppSupport":
            MessageLookupByLibrary.simpleMessage("Soporte en la Aplicación"),
        "joinUserCommunity": MessageLookupByLibrary.simpleMessage(
            "Unirse a la Comunidad de Usuarios"),
        "mediaGallery":
            MessageLookupByLibrary.simpleMessage("Galería de Medios"),
        "rapidCaptureCount": m2,
        "recordingTime": m3,
        "startRapidCapture":
            MessageLookupByLibrary.simpleMessage("Iniciar Captura Rápida"),
        "startRecording":
            MessageLookupByLibrary.simpleMessage("Iniciar Grabación"),
        "stopRapidCapture":
            MessageLookupByLibrary.simpleMessage("Detener Captura Rápida"),
        "stopRecording":
            MessageLookupByLibrary.simpleMessage("Detener Grabación"),
        "verticalJoystick": m4,
        "welcomeToSupport":
            MessageLookupByLibrary.simpleMessage("¡Bienvenido al Soporte!"),
        "zoom": m5
      };
}
