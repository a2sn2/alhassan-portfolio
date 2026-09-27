// GENERATED CODE - DO NOT MODIFY BY HAND
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'intl/messages_all.dart';

// **************************************************************************
// Generator: Flutter Intl IDE plugin
// Made by Localizely
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values, avoid_escaping_inner_quotes

class S {
  S();

  static S? _current;

  static S get current {
    assert(_current != null,
        'No instance of S was loaded. Try to initialize the S delegate before accessing S.current.');
    return _current!;
  }

  static const AppLocalizationDelegate delegate = AppLocalizationDelegate();

  static Future<S> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false)
        ? locale.languageCode
        : locale.toString();
    final localeName = Intl.canonicalizedLocale(name);
    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      final instance = S();
      S._current = instance;

      return instance;
    });
  }

  static S of(BuildContext context) {
    final instance = S.maybeOf(context);
    assert(instance != null,
        'No instance of S present in the widget tree. Did you add S.delegate in localizationsDelegates?');
    return instance!;
  }

  static S? maybeOf(BuildContext context) {
    return Localizations.of<S>(context, S);
  }

  /// `Photos`
  String get photos {
    return Intl.message(
      'Photos',
      name: 'photos',
      desc: '',
      args: [],
    );
  }

  /// `Videos`
  String get videos {
    return Intl.message(
      'Videos',
      name: 'videos',
      desc: '',
      args: [],
    );
  }

  /// `Drone Controller`
  String get appTitle {
    return Intl.message(
      'Drone Controller',
      name: 'appTitle',
      desc: '',
      args: [],
    );
  }

  /// `In-App Support`
  String get inAppSupport {
    return Intl.message(
      'In-App Support',
      name: 'inAppSupport',
      desc: '',
      args: [],
    );
  }

  /// `Welcome to Support!`
  String get welcomeToSupport {
    return Intl.message(
      'Welcome to Support!',
      name: 'welcomeToSupport',
      desc: '',
      args: [],
    );
  }

  /// `For help and support, please choose an option below:`
  String get helpAndSupport {
    return Intl.message(
      'For help and support, please choose an option below:',
      name: 'helpAndSupport',
      desc: '',
      args: [],
    );
  }

  /// `FAQ`
  String get faq {
    return Intl.message(
      'FAQ',
      name: 'faq',
      desc: '',
      args: [],
    );
  }

  /// `Contact Support`
  String get contactSupport {
    return Intl.message(
      'Contact Support',
      name: 'contactSupport',
      desc: '',
      args: [],
    );
  }

  /// `Join User Community`
  String get joinUserCommunity {
    return Intl.message(
      'Join User Community',
      name: 'joinUserCommunity',
      desc: '',
      args: [],
    );
  }

  /// `Media Gallery`
  String get mediaGallery {
    return Intl.message(
      'Media Gallery',
      name: 'mediaGallery',
      desc: '',
      args: [],
    );
  }

  /// `Failed to initialize camera.`
  String get failedToInitializeCamera {
    return Intl.message(
      'Failed to initialize camera.',
      name: 'failedToInitializeCamera',
      desc: '',
      args: [],
    );
  }

  /// `Capture Photo`
  String get capturePhoto {
    return Intl.message(
      'Capture Photo',
      name: 'capturePhoto',
      desc: '',
      args: [],
    );
  }

  /// `Start Recording`
  String get startRecording {
    return Intl.message(
      'Start Recording',
      name: 'startRecording',
      desc: '',
      args: [],
    );
  }

  /// `Stop Recording`
  String get stopRecording {
    return Intl.message(
      'Stop Recording',
      name: 'stopRecording',
      desc: '',
      args: [],
    );
  }

  /// `Flash On`
  String get flashOn {
    return Intl.message(
      'Flash On',
      name: 'flashOn',
      desc: '',
      args: [],
    );
  }

  /// `Flash Off`
  String get flashOff {
    return Intl.message(
      'Flash Off',
      name: 'flashOff',
      desc: '',
      args: [],
    );
  }

  /// `Camera is not ready`
  String get cameraNotReady {
    return Intl.message(
      'Camera is not ready',
      name: 'cameraNotReady',
      desc: '',
      args: [],
    );
  }

  /// `Start Rapid Capture`
  String get startRapidCapture {
    return Intl.message(
      'Start Rapid Capture',
      name: 'startRapidCapture',
      desc: '',
      args: [],
    );
  }

  /// `Stop Rapid Capture`
  String get stopRapidCapture {
    return Intl.message(
      'Stop Rapid Capture',
      name: 'stopRapidCapture',
      desc: '',
      args: [],
    );
  }

  /// `Recording time: {time}`
  String recordingTime(Object time) {
    return Intl.message(
      'Recording time: $time',
      name: 'recordingTime',
      desc: '',
      args: [time],
    );
  }

  /// `Exposure: {exposure}`
  String exposure(Object exposure) {
    return Intl.message(
      'Exposure: $exposure',
      name: 'exposure',
      desc: '',
      args: [exposure],
    );
  }

  /// `Zoom: {zoom}`
  String zoom(Object zoom) {
    return Intl.message(
      'Zoom: $zoom',
      name: 'zoom',
      desc: '',
      args: [zoom],
    );
  }

  /// `Rapid Capture Count: {count}`
  String rapidCaptureCount(Object count) {
    return Intl.message(
      'Rapid Capture Count: $count',
      name: 'rapidCaptureCount',
      desc: '',
      args: [count],
    );
  }

  /// `File deleted`
  String get fileDeleted {
    return Intl.message(
      'File deleted',
      name: 'fileDeleted',
      desc: '',
      args: [],
    );
  }

  /// `Error deleting file`
  String get errorDeletingFile {
    return Intl.message(
      'Error deleting file',
      name: 'errorDeletingFile',
      desc: '',
      args: [],
    );
  }

  /// `Horizontal Joystick Value: {value}`
  String horizontalJoystick(Object value) {
    return Intl.message(
      'Horizontal Joystick Value: $value',
      name: 'horizontalJoystick',
      desc: '',
      args: [value],
    );
  }

  /// `Vertical Joystick Value: {value}`
  String verticalJoystick(Object value) {
    return Intl.message(
      'Vertical Joystick Value: $value',
      name: 'verticalJoystick',
      desc: '',
      args: [value],
    );
  }
}

class AppLocalizationDelegate extends LocalizationsDelegate<S> {
  const AppLocalizationDelegate();

  List<Locale> get supportedLocales {
    return const <Locale>[
      Locale.fromSubtags(languageCode: 'en'),
      Locale.fromSubtags(languageCode: 'ar'),
      Locale.fromSubtags(languageCode: 'es'),
    ];
  }

  @override
  bool isSupported(Locale locale) => _isSupported(locale);
  @override
  Future<S> load(Locale locale) => S.load(locale);
  @override
  bool shouldReload(AppLocalizationDelegate old) => false;

  bool _isSupported(Locale locale) {
    for (var supportedLocale in supportedLocales) {
      if (supportedLocale.languageCode == locale.languageCode) {
        return true;
      }
    }
    return false;
  }
}
