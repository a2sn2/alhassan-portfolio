import 'package:evaluationproject/register_user.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'LecturerService.dart';
import 'course.dart';
import 'home_screen.dart';
import 'login_screen.dart';
import 'logout.dart';

void main() {

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Evaluation System',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => LoginPage(),
        '/login': (context) => LoginPage(), // استخدم مسار login
        '/home': (context) => HomeScreen(),
        '/logout': (context) => LogoutScreen(),
        '/get_lecturers': (context) => ManageLecturerScreen(),
        '/course': (context) => ManageCourseScreen(),
        '/register': (context) => RegisterUser(),
      },
    );
  }
}

class SplashScreen extends StatelessWidget {
  Future<bool> checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool('Login') ?? false; // القيمة الافتراضية false
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: checkLoginStatus(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else {
          if (snapshot.data == true) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              Navigator.pushReplacementNamed(context, '/home');
            });
          } else {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              Navigator.pushReplacementNamed(context, '/login'); // استخدم مسار login
            });
          }
          return const SizedBox.shrink();
        }
      },
    );
  }
}
