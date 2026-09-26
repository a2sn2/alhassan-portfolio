import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'login_screen.dart'; // استيراد واجهة تسجيل الدخول

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'نموذج التقييم',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: EvaluationForm(),
    );
  }
}

class EvaluationForm extends StatefulWidget {
  @override
  _EvaluationFormState createState() => _EvaluationFormState();
}

class _EvaluationFormState extends State<EvaluationForm> {
  List<dynamic> lecturerQuestions = [];
  List<dynamic> courseQuestions = [];
  Map<int, int> lecturerAnswers = {};
  Map<int, int> courseAnswers = {};

  @override
  void initState() {
    super.initState();
    fetchLecturerQuestions();
    fetchCourseQuestions();
  }

  Future<void> fetchLecturerQuestions() async {
    final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_lecturer_questions.php'));
    if (response.statusCode == 200) {
      setState(() {
        lecturerQuestions = jsonDecode(response.body).map((question) {
          question['Id_question_lecturer'] = int.parse(question['Id_question_lecturer']);
          return question;
        }).toList();
      });
    }
  }

  Future<void> fetchCourseQuestions() async {
    final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_course_questions.php'));
    if (response.statusCode == 200) {
      setState(() {
        courseQuestions = jsonDecode(response.body).map((question) {
          question['Id_question_course'] = int.parse(question['Id_question_course']);
          return question;
        }).toList();
      });
    }
  }

  void submitEvaluation() async {
    final response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/submit_evaluation.php'),
      body: jsonEncode({
        'lecturer_answers': lecturerAnswers,
        'course_answers': courseAnswers,
      }),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('تم إرسال التقييم بنجاح!')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('فشل في إرسال التقييم.')));
    }
  }

  void logout(BuildContext context) {
    // Navigate to the Login screen
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('نموذج التقييم'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () => logout(context), // زر تسجيل الخروج
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('أسئلة المحاضر', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ...lecturerQuestions.map((question) {
              int questionId = question['Id_question_lecturer'];
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(question['text_qestion_lecturer']),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: List.generate(5, (index) {
                      return Radio<int>(
                        value: index + 1,
                        groupValue: lecturerAnswers[questionId],
                        onChanged: (value) {
                          setState(() {
                            lecturerAnswers[questionId] = value!;
                          });
                        },
                      );
                    }),
                  ),
                ],
              );
            }).toList(),
            SizedBox(height: 20),
            Text('أسئلة الدورة', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ...courseQuestions.map((question) {
              int questionId = question['Id_question_course'];
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(question['text_question_course']),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: List.generate(5, (index) {
                      return Radio<int>(
                        value: index + 1,
                        groupValue: courseAnswers[questionId],
                        onChanged: (value) {
                          setState(() {
                            courseAnswers[questionId] = value!;
                          });
                        },
                      );
                    }),
                  ),
                ],
              );
            }).toList(),
            SizedBox(height: 20),
            Center(
              child: ElevatedButton(
                onPressed: submitEvaluation,
                child: Text('إرسال التقييم'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
