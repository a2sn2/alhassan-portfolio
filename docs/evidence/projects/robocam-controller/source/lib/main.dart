import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'generated/l10n.dart';
import 'camera_control_page.dart';
import 'package:firebase_core/firebase_core.dart';
import 'LoginScreen.dart';

void main() async{

  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(apiKey: "AIzaSyAB4ZcUoPWgxwXJ6yHUGxCwg_Og8aTnVmc",
        appId: "1:803995153292:android:d5f2faaadf1bf7f8a7dca9",
        messagingSenderId: "803995153292",
        projectId: "project1-a2541"
  )
  );
  runApp(MyApp());
}

class DroneControllerApp extends StatefulWidget {
  @override
  _DroneControllerAppState createState() => _DroneControllerAppState();
}

class _DroneControllerAppState extends State<DroneControllerApp> {
  Locale? _locale;

  void _setLocale(Locale value) {
    setState(() {
      _locale = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Drone Controller',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: DroneControlPage(setLocale: _setLocale),
      locale: _locale,
      localizationsDelegates: [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
    );
  }
}




class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Firebase Auth',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        // Theme data
      ),
      home: LoginScreen(), // Start with the LoginScreen
      // home: Material(), //
    );
  }
}
