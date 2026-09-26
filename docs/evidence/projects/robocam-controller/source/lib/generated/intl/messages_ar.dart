// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a ar locale. All the
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
  String get localeName => 'ar';

  static String m0(exposure) => "التعرض: ${exposure}";

  static String m1(value) => "قيمة عصا التحكم الأفقية: ${value}";

  static String m2(count) => "عدد الالتقاط السريع: ${count}";

  static String m3(time) => "وقت التسجيل: ${time}";

  static String m4(value) => "قيمة عصا التحكم الرأسية: ${value}";

  static String m5(zoom) => "تقريب: ${zoom}";

  final messages = _notInlinedMessages(_notInlinedMessages);
  static Map<String, Function> _notInlinedMessages(_) => <String, Function>{
        "appTitle": MessageLookupByLibrary.simpleMessage(
            "وحدة التحكم بالطائرة المسيرة"),
        "cameraNotReady":
            MessageLookupByLibrary.simpleMessage("الكاميرا غير جاهزة"),
        "capturePhoto": MessageLookupByLibrary.simpleMessage("التقاط صورة"),
        "contactSupport":
            MessageLookupByLibrary.simpleMessage("الاتصال بالدعم"),
        "errorDeletingFile":
            MessageLookupByLibrary.simpleMessage("خطأ في حذف الملف"),
        "exposure": m0,
        "failedToInitializeCamera":
            MessageLookupByLibrary.simpleMessage("فشل في تهيئة الكاميرا."),
        "faq": MessageLookupByLibrary.simpleMessage("الأسئلة الشائعة"),
        "fileDeleted": MessageLookupByLibrary.simpleMessage("تم حذف الملف"),
        "flashOff": MessageLookupByLibrary.simpleMessage("الفلاش مطفأ"),
        "flashOn": MessageLookupByLibrary.simpleMessage("الفلاش قيد التشغيل"),
        "helpAndSupport": MessageLookupByLibrary.simpleMessage(
            "للحصول على المساعدة والدعم، يرجى اختيار خيار أدناه:"),
        "horizontalJoystick": m1,
        "inAppSupport":
            MessageLookupByLibrary.simpleMessage("الدعم داخل التطبيق"),
        "joinUserCommunity": MessageLookupByLibrary.simpleMessage(
            "الانضمام إلى مجتمع المستخدمين"),
        "mediaGallery": MessageLookupByLibrary.simpleMessage("معرض الوسائط"),
        "rapidCaptureCount": m2,
        "recordingTime": m3,
        "startRapidCapture":
            MessageLookupByLibrary.simpleMessage("بدء الالتقاط السريع"),
        "startRecording": MessageLookupByLibrary.simpleMessage("بدء التسجيل"),
        "stopRapidCapture":
            MessageLookupByLibrary.simpleMessage("إيقاف الالتقاط السريع"),
        "stopRecording": MessageLookupByLibrary.simpleMessage("إيقاف التسجيل"),
        "verticalJoystick": m4,
        "welcomeToSupport":
            MessageLookupByLibrary.simpleMessage("مرحبًا بكم في الدعم!"),
        "zoom": m5
      };
}
