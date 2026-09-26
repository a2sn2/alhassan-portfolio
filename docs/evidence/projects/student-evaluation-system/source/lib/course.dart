import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ManageCourseScreen extends StatefulWidget {
  @override
  _ManageCourseScreenState createState() => _ManageCourseScreenState();
}

class _ManageCourseScreenState extends State<ManageCourseScreen> {
  final TextEditingController courseNameController = TextEditingController();
  final TextEditingController oldCourseNameController = TextEditingController();
  final TextEditingController newCourseNameController = TextEditingController();
  bool isLoading = false;
  List<dynamic> courses = [];
  List<dynamic> courseTypes = [];
  String? selectedCourseType;

  @override
  void initState() {
    super.initState();
    fetchCourses();
    fetchCourseTypes();
  }

  Future<void> fetchCourses() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_courses.php'));

      if (response.statusCode == 200) {
        setState(() {
          courses = jsonDecode(response.body);
        });
      } else {
        throw Exception('فشل في تحميل الكورسات');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('خطأ: $e')));
    }
  }

  Future<void> fetchCourseTypes() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_course_types.php'));

      if (response.statusCode == 200) {
        final List<dynamic> fetchedTypes = jsonDecode(response.body);
        print(fetchedTypes); // تحقق من البيانات المستلمة
        setState(() {
          courseTypes = fetchedTypes;
        });
      } else {
        throw Exception('فشل في تحميل أنواع الكورسات');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('خطأ: $e')));
    }
  }

  Future<void> insertCourse() async {
    setState(() {
      isLoading = true;
    });

    try {
      final response = await http.post(
        Uri.parse('http://192.168.1.107/EvaluationSystem/insert_course.php'),
        body: {
          'name_course': courseNameController.text,
          'Id_type_course': selectedCourseType,
        },
      );

      if (response.statusCode == 200) {
        fetchCourses(); // Refresh the list
        courseNameController.clear();
        selectedCourseType = null;
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('تم إضافة الكورس بنجاح.')));
      } else {
        throw Exception('فشل في إضافة الكورس.');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('خطأ: $e')));
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> updateCourseByName(String oldName, String newName) async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.1.107/EvaluationSystem/update_course.php'),
        body: {
          'old_name_course': oldName,
          'new_name_course': newName,
        },
      );

      if (response.statusCode == 200) {
        fetchCourses(); // Refresh the list
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('تم تحديث الكورس بنجاح.')));
      } else {
        throw Exception('فشل في تحديث الكورس.');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('خطأ: $e')));
    }
  }

  Future<void> deleteCourseByName(String name) async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.1.107/EvaluationSystem/delete_course.php'),
        body: {'name_course': name},
      );

      if (response.statusCode == 200) {
        fetchCourses(); // Refresh the list
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('تم حذف الكورس بنجاح.')));
      } else {
        throw Exception('فشل في حذف الكورس.');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('خطأ: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Manage Course'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextFormField(
              controller: courseNameController,
              decoration: InputDecoration(
                labelText: 'Course name',
              ),
            ),
            SizedBox(height: 10),
          DropdownButton<String>(
            value: selectedCourseType,
            hint: Text('Choose type course'),
            items: courseTypes.map<DropdownMenuItem<String>>((type) {
              return DropdownMenuItem<String>(
                value: type['Id_type_course'].toString(),
                child: Text(type['type_course']),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                selectedCourseType = newValue; // تأكد من تحديث القيمة المختارة
              });
            },
          ),
          SizedBox(height: 10),
            ElevatedButton(
              onPressed: isLoading ? null : insertCourse,
              child: isLoading ? CircularProgressIndicator() : Text('Insert Course'),
            ),
            SizedBox(height: 10),
            // إدخال اسم الكورس القديم
            TextFormField(
              controller: oldCourseNameController,
              decoration: InputDecoration(
                labelText: 'Old Course Name',
              ),
            ),
            // إدخال اسم الكورس الجديد
            TextFormField(
              controller: newCourseNameController,
              decoration: InputDecoration(
                labelText: 'New Course Name',
              ),
            ),
            ElevatedButton(
              onPressed: () {
                String oldName = oldCourseNameController.text;
                String newName = newCourseNameController.text;
                if (oldName.isNotEmpty && newName.isNotEmpty) {
                  updateCourseByName(oldName, newName);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('يرجى إدخال كلا الاسمين.')));
                }
              },
              child: Text('Update Course'),
            ),
            ElevatedButton(
              onPressed: () {
                String name = courseNameController.text;
                if (name.isNotEmpty) {
                  deleteCourseByName(name);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('يرجى إدخال اسم.')));
                }
              },
              child: Text('Delete Course'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: courses.length,
                itemBuilder: (context, index) {
                  final course = courses[index];
                  return ListTile(
                    title: Text(course['name_course']),
                    subtitle: Text('Type: ${course['Id_type_course']}'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit),
                          onPressed: () {
                            oldCourseNameController.text = course['name_course'];
                          },
                        ),
                      ],
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
