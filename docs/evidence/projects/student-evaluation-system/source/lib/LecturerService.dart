import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ManageLecturerScreen extends StatefulWidget {
  @override
  _ManageLecturerScreenState createState() => _ManageLecturerScreenState();
}

class _ManageLecturerScreenState extends State<ManageLecturerScreen> {
  final TextEditingController nameLecturerController = TextEditingController();
  final TextEditingController oldNameController = TextEditingController();
  final TextEditingController newNameController = TextEditingController();
  bool isLoading = false;
  List<dynamic> lecturers = [];

  @override
  void initState() {
    super.initState();
    fetchLecturers();
  }

  Future<void> fetchLecturers() async {
    final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_lecturers.php'));

    if (response.statusCode == 200) {
      setState(() {
        lecturers = jsonDecode(response.body);
      });
    } else {
      throw Exception('Failed to load lecturers');
    }
  }

  Future<void> insertLecturer() async {
    setState(() {
      isLoading = true;
    });

    final response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/insert_lecturer.php'),
      body: {'name_lecturer': nameLecturerController.text},
    );

    if (response.statusCode == 200) {
      setState(() {
        isLoading = false;
        fetchLecturers(); // Refresh the list
        nameLecturerController.clear();
      });
    } else {
      setState(() {
        isLoading = false;
      });
    }
  }

  // دالة تحديث المحاضر بناءً على الاسم
  Future<void> updateLecturerByName(String oldName, String newName) async {
    final response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/update_lecturer.php'),
      body: {
        'old_name_lecturer': oldName,
        'new_name_lecturer': newName,
      },
    );

    if (response.statusCode == 200) {
      fetchLecturers(); // Refresh the list
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Lecturer updated successfully.')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to update lecturer.')));
    }
  }

  // دالة حذف المحاضر بناءً على الاسم
  Future<void> deleteLecturerByName(String name) async {
    final response = await http.post(
      Uri.parse('http://192.168.1.107/EvaluationSystem/delete_lecturer.php'),
      body: {'name_lecturer': name},
    );

    if (response.statusCode == 200) {
      fetchLecturers(); // Refresh the list
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Lecturer deleted successfully.')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Failed to delete lecturer.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Manage Lecturer'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextFormField(
              controller: nameLecturerController,
              decoration: InputDecoration(
                labelText: 'Lecturer Name',
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: isLoading ? null : insertLecturer,
              child: isLoading ? CircularProgressIndicator() : Text('Insert Lecturer'),
            ),
            ElevatedButton(
              onPressed: () {
                String name = nameLecturerController.text;
                if (name.isNotEmpty) {
                  deleteLecturerByName(name);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Please enter a name.')));
                }
              },
              child: Text('Delete Lecturer by Name'),
            ),
            // إدخال اسم المحاضر القديم
            TextFormField(
              controller: oldNameController,
              decoration: InputDecoration(
                labelText: 'Old Lecturer Name',
              ),
            ),
            // إدخال اسم المحاضر الجديد
            TextFormField(
              controller: newNameController,
              decoration: InputDecoration(
                labelText: 'New Lecturer Name',
              ),
            ),
            ElevatedButton(
              onPressed: () {
                String oldName = oldNameController.text;
                String newName = newNameController.text;
                if (oldName.isNotEmpty && newName.isNotEmpty) {
                  updateLecturerByName(oldName, newName);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Please enter both names.')));
                }
              },
              child: Text('Update Lecturer'),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: lecturers.length,
                itemBuilder: (context, index) {
                  final lecturer = lecturers[index];
                  return ListTile(
                    title: Text(lecturer['name_lecturer']),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit),
                          onPressed: () {
                            // يمكنك هنا إدخال الاسم القديم مباشرة في الحقل المناسب
                            oldNameController.text = lecturer['name_lecturer'];
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
