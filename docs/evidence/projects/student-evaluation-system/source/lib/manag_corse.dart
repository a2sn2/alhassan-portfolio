import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CourseApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Evaluation System',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: CourseManagementPage(),
    );
  }
}

class CourseManagementPage extends StatefulWidget {
  @override
  _CourseManagementPageState createState() => _CourseManagementPageState();
}

class _CourseManagementPageState extends State<CourseManagementPage> {
  final TextEditingController _nameController = TextEditingController();
  String? selectedCourseType;
  List<dynamic> courseTypes = [];

  // Fetch all course types from the server
  Future<void> fetchCourseTypes() async {
    var response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/getCourseTypes.php')); // Your API to get course types
    if (response.statusCode == 200) {
      setState(() {
        courseTypes = json.decode(response.body);
      });
    } else {
      print("Error fetching course types");
    }
  }

  // Insert course to the server
  Future<void> insertCourse() async {
    var response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/Course.php'), // Your API for inserting
      body: {
        'name_course': _nameController.text,
        'Id_type_course': selectedCourseType.toString(),
      },
    );
    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Course inserted!")));
      fetchCourses(); // Update UI after insertion
    } else {
      print("Error inserting course");
    }
  }

  // Fetch all courses from the server
  List<dynamic> courses = [];
  Future<void> fetchCourses() async {
    var response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/getCourses.php')); // Your API to get courses
    if (response.statusCode == 200) {
      setState(() {
        courses = json.decode(response.body);
      });
    } else {
      print("Error fetching courses");
    }
  }

  // Delete a course
  Future<void> deleteCourse(int id) async {
    var response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/deleteCourse.php'),
      body: {'Id_course': id.toString()},
    );
    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Course deleted!")));
      fetchCourses();
    } else {
      print("Error deleting course");
    }
  }

  @override
  void initState() {
    super.initState();
    fetchCourses();
    fetchCourseTypes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Course Management'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Course Name'),
            ),
            DropdownButton<String>(
              hint: Text("Select Course Type"),
              value: selectedCourseType,
              onChanged: (String? newValue) {
                setState(() {
                  selectedCourseType = newValue;
                });
              },
              items: courseTypes.map((type) {
                return DropdownMenuItem<String>(
                  value: type['Id_type_course'].toString(),
                  child: Text(type['type_course']),
                );
              }).toList(),
            ),
            ElevatedButton(
              onPressed: insertCourse,
              child: Text('Insert Course'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: courses.length,
                itemBuilder: (context, index) {
                  var course = courses[index];
                  return ListTile(
                    title: Text(course['name_course']),
                    subtitle: Text('Type: ${course['Id_type_course']}'),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () => deleteCourse(course['Id_course']),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
