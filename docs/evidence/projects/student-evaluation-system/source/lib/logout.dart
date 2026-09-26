import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class LogoutScreen extends StatefulWidget {
  @override
  _LogoutScreenState createState() => _LogoutScreenState();
}

class _LogoutScreenState extends State<LogoutScreen> {
  bool isLoading = false;

  Future<void> logout() async {
    setState(() {
      isLoading = true;
    });

    // إرسال طلب إلى API
    final response = await http.get(
      Uri.parse('http://192.168.1.107/EvaluationSystem/logout.php'), // استبدل بـ URL الخاص بالخادم
    );

    if (response.statusCode == 200) {
      // تحليل استجابة JSON
      final jsonResponse = jsonDecode(response.body);

      if (jsonResponse['success']) {
        // مسح بيانات الجلسة من SharedPreferences
        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.clear();

        // الانتقال إلى شاشة تسجيل الدخول
        Navigator.pushReplacementNamed(context,'/login');
      } else {
        // إظهار رسالة خطأ إذا فشل تسجيل الخروج
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('فشل في تسجيل الخروج. حاول مرة أخرى.')),
        );
      }
    } else {
      // التعامل مع الخطأ إذا فشل الطلب
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('خطأ أثناء تسجيل الخروج. حاول مرة أخرى لاحقًا.')),
      );
    }

    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('logout'),
      ),
      body: Center(
        child: isLoading
            ? CircularProgressIndicator()
            : ElevatedButton(
          onPressed: () {
            logout();
          },
          child: Text('logout'),
        ),
      ),
    );
  }
}
