import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RegisterUser extends StatefulWidget {
  @override
  _RegisterUserState createState() => _RegisterUserState();
}

class _RegisterUserState extends State<RegisterUser> {
  // Controllers for student
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _semesterController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();

  // Controllers for user
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  String _userType = 'user'; // النوع الافتراضي
  bool _isLoading = false; // مؤشر التحميل

  Future<void> _register() async {
    setState(() {
      _isLoading = true; // بدأ التحميل
    });

    String apiUrl;
    Map<String, String> data;

    if (_userType == 'student') {
      // إعداد بيانات الطالب
      apiUrl = "http://192.168.1.107/EvaluationSystem/student_register.php";
      data = {
        "name": _nameController.text,
        "semester": _semesterController.text,
        "phone": _phoneController.text,
      };
    } else {
      // إعداد بيانات المستخدم العادي
      apiUrl = "http://192.168.1.107/EvaluationSystem/user_register.php";
      data = {
        "user_name": _usernameController.text,
        "password": _passwordController.text,
      };
    }

    final response = await http.post(
      Uri.parse(apiUrl),
      body: data,
    );

    setState(() {
      _isLoading = false; // إيقاف التحميل
    });

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['status'] == 'success') {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Registration successful!')));
        Navigator.pushReplacementNamed(context, '/login');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(data['message'])));
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to connect to server')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Register'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              'Register as:',
              style: TextStyle(fontSize: 18.0),
            ),
            Row(
              children: <Widget>[
                Radio(
                  value: 'student',
                  groupValue: _userType,
                  onChanged: (value) {
                    setState(() {
                      _userType = value!;
                    });
                  },
                ),
                Text('Student'),
                Radio(
                  value: 'user',
                  groupValue: _userType,
                  onChanged: (value) {
                    setState(() {
                      _userType = value!;
                    });
                  },
                ),
                Text('User'),
              ],
            ),
            if (_userType == 'student') ...[
              TextField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
              ),
              TextField(
                controller: _semesterController,
                decoration: InputDecoration(labelText: 'Semester'),
              ),
              TextField(
                controller: _phoneController,
                decoration: InputDecoration(labelText: 'Phone Number'),
              ),
            ] else ...[
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
            SizedBox(height: 20),
            _isLoading
                ? Center(child: CircularProgressIndicator())
                : ElevatedButton(
              onPressed: _register,
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
