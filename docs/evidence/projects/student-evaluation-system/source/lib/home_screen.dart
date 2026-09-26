import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'login_screen.dart'; // استيراد واجهة تسجيل الدخول

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int totalStudents = 0;
  int totalLecturers = 0;
  int totalCourses = 0;
  int totalResults = 0;

  @override
  void initState() {
    super.initState();
    fetchStatistics();
  }

  Future<void> fetchStatistics() async {
    final urls = [
      Uri.parse('http://192.168.1.107/EvaluationSystem/getStudentCount.php'),
      Uri.parse('http://192.168.1.107/EvaluationSystem/getLecturerCount.php'),
      Uri.parse('http://192.168.1.107/EvaluationSystem/getCourseCount.php'),
      Uri.parse('http://192.168.1.107/EvaluationSystem/getEvaluationResultCount.php'),
    ];

    try {
      final responses = await Future.wait(urls.map((url) => http.get(url)));

      setState(() {
        totalStudents = int.tryParse(jsonDecode(responses[0].body)['Id_student'].toString()) ?? 0;
        totalLecturers = int.tryParse(jsonDecode(responses[1].body)['Id_lecturer'].toString()) ?? 0;
        totalCourses = int.tryParse(jsonDecode(responses[2].body)['Id_course'].toString()) ?? 0;
        totalResults = int.tryParse(jsonDecode(responses[3].body)['Id_result'].toString()) ?? 0;
      });

    } catch (e) {
      print('Error fetching statistics: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Evaluation System'),
      ),
      drawer: _buildDrawer(),
      body: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          _buildHeroSection(),
          SizedBox(height: 20),
          _buildStatisticsGrid(),
          SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(color: Colors.blue),
            child: Column(
              children: [
                CircleAvatar(
                  backgroundImage: AssetImage('assets/image/logo2.png'),
                  radius: 40,
                ),
                SizedBox(height: 10),
                Text(
                  'Evaluation System',
                  style: TextStyle(color: Colors.white, fontSize: 18),
                ),
              ],
            ),
          ),
          _buildDrawerItem(Icons.home, 'Home Page', '/home'),
          _buildDrawerItem(Icons.person, 'Manage Lecturer', '/get_lecturers'),
          _buildDrawerItem(Icons.book, 'Manage Course', '/course'),
          _buildDrawerItem(Icons.logout, 'LogOut', '', onTap: () => logout(context)), // تعديل زر الخروج
        ],
      ),
    );
  }

  ListTile _buildDrawerItem(IconData icon, String title, String route, {Function? onTap}) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: () {
        if (onTap != null) {
          onTap();
        } else {
          Navigator.pushNamed(context, route);
        }
      },
    );
  }

  void logout(BuildContext context) {
    // Navigate to the Login screen
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

  Widget _buildHeroSection() {
    return Container(
      alignment: Alignment.center,
      height: 150,
      color: Colors.blueAccent,
      child: Center(
        child: Text(
          'Welcome to the evaluation system',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  Widget _buildStatisticsGrid() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: GridView.count(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        crossAxisCount: 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        children: <Widget>[
          _buildCard('Evaluation Student', totalStudents, Icons.school, Colors.blue),
          _buildCard('Evaluation Lecturer', totalLecturers, Icons.person, Colors.green),
          _buildCard('Evaluation Course', totalCourses, Icons.book, Colors.orange),
          _buildCard('Result', totalResults, Icons.poll, Colors.red),
        ],
      ),
    );
  }

  Widget _buildCard(String title, int count, IconData icon, Color color) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: color,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10),
            Text(
              '$count',
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            SizedBox(height: 10),
            Icon(icon, size: 35, color: color),
          ],
        ),
      ),
    );
  }
}
