import 'package:flutter/material.dart';
import 'API.dart';
class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  ApiService apiService = ApiService();
  int studentCount = 0;
  int lecturerCount = 0;
  int courseCount = 0;
  int evaluationResultCount = 0;

  @override
  void initState() {
    super.initState();
    fetchDashboardData();
  }

  Future<void> fetchDashboardData() async {
    try {
      int students = await apiService.getStudentCount();
      int lecturers = await apiService.getLecturerCount();
      int courses = await apiService.getCourseCount();
      int results = await apiService.getEvaluationResultCount();

      setState(() {
        studentCount = students;
        lecturerCount = lecturers;
        courseCount = courses;
        evaluationResultCount = results;
      });
    } catch (e) {
      print('Error fetching dashboard data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Total Students: $studentCount'),
            Text('Total Lecturers: $lecturerCount'),
            Text('Total Courses: $courseCount'),
            Text('Evaluation Results: $evaluationResultCount'),
          ],
        ),
      ),
    );
  }
}
