import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'evaluation_student.dart';
import 'home_screen.dart'; // Assuming you have a separate Home screen for users
import 'register_user.dart'; // استيراد صفحة التسجيل

class LoginApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login System',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(),
      routes: {
        '/register': (context) => RegisterUser(), // تعريف مسار التسجيل
      },
    );
  }
}

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController _idController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String _loginType = 'student'; // Default login type
  final String apiUrl = "http://192.168.1.107/EvaluationSystem/";
  bool _isLoading = false; // Indicator for loading state

  Future<void> _login() async {
    setState(() {
      _isLoading = true; // Start loading
    });

    var data;
    String url;

    if (_loginType == 'student') {
      // Student Login
      url = apiUrl + "student_login.php";
      data = {
        'Id_student': _idController.text,
        'phone': _phoneController.text,
      };
    } else {
      // User Login
      url = apiUrl + "user_login.php";
      data = {
        'user_name': _usernameController.text,
        'password': _passwordController.text,
      };
    }

    final response = await http.post(
      Uri.parse(url),
      body: data,
    );

    setState(() {
      _isLoading = false; // Stop loading
    });

    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      if (jsonResponse['status'] == 'success') {
        // Navigate based on login type
        if (_loginType == 'student') {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => EvaluationForm()), // Navigate to Student Home Page
          );
        } else {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => HomeScreen()), // Navigate to User Home Page
          );
        }
      } else {
        _showErrorDialog(jsonResponse['message']);
      }
    } else {
      _showErrorDialog("Error connecting to the server.");
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Login Failed'),
        content: Text(message),
        actions: <Widget>[
          TextButton(
            child: Text('OK'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login Page'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              'Login as:',
              style: TextStyle(fontSize: 18.0),
            ),
            Row(
              children: <Widget>[
                Radio(
                  value: 'student',
                  groupValue: _loginType,
                  onChanged: (value) {
                    setState(() {
                      _loginType = value!;
                    });
                  },
                ),
                Text('Student'),
                Radio(
                  value: 'user',
                  groupValue: _loginType,
                  onChanged: (value) {
                    setState(() {
                      _loginType = value!;
                    });
                  },
                ),
                Text('User'),
              ],
            ),
            _loginType == 'student'
                ? Column(
              children: <Widget>[
                TextField(
                  controller: _idController,
                  decoration: InputDecoration(labelText: 'Student ID'),
                ),
                TextField(
                  controller: _phoneController,
                  decoration: InputDecoration(labelText: 'Phone Number'),
                ),
              ],
            )
                : Column(
              children: <Widget>[
                TextField(
                  controller: _usernameController,
                  decoration: InputDecoration(labelText: 'Username'),
                ),
                TextField(
                  controller: _passwordController,
                  decoration: InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
              ],
            ),
            SizedBox(height: 20),
            _isLoading
                ? Center(child: CircularProgressIndicator()) // Loading spinner
                : ElevatedButton(
              onPressed: _login,
              child: Text('Login'),
            ),
            SizedBox(height: 20),
            // الزر الذي يأخذ المستخدم إلى صفحة التسجيل
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/register'); // انتقال إلى صفحة التسجيل
              },
              child: Text("Don't have an account? Register here"),
            ),
          ],
        ),
      ),
    );
  }
}
