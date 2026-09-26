import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class EvaluationResult {
  final int id;
  final String nameLecturer;
  final double avgLecturer;
  final String nameCourse;
  final String typeCourse;
  final double avgCourse;

  EvaluationResult({
    required this.id,
    required this.nameLecturer,
    required this.avgLecturer,
    required this.nameCourse,
    required this.typeCourse,
    required this.avgCourse,
  });

  factory EvaluationResult.fromJson(Map<String, dynamic> json) {
    return EvaluationResult(
      id: json['Id_Avg'],
      nameLecturer: json['Name_Lecturer'] ?? '',
      avgLecturer: json['Avg_lecturer'],
      nameCourse: json['Name_Course'] ?? '',
      typeCourse: json['type_course'] ?? '',
      avgCourse: json['Avg_course'],
    );
  }
}

class EvaluationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Result Evaluation'),
      ),
      body: FutureBuilder<List<EvaluationResult>>(
        future: fetchEvaluationResults(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('There is no information to display!!!'));
          } else {
            return DataTable(
              columns: [
                DataColumn(label: Text('No')),
                DataColumn(label: Text('Name Lecturer')),
                DataColumn(label: Text('Avg Lecturer')),
                DataColumn(label: Text('Name Course')),
                DataColumn(label: Text('Type Course')),
                DataColumn(label: Text('Avg Course')),
              ],
              rows: snapshot.data!
                  .map(
                    (result) => DataRow(cells: [
                  DataCell(Text(result.id.toString())),
                  DataCell(Text(result.nameLecturer)),
                  DataCell(Text(result.avgLecturer.toString())),
                  DataCell(Text(result.nameCourse)),
                  DataCell(Text(result.typeCourse)),
                  DataCell(Text(result.avgCourse.toString())),
                ]),
              )
                  .toList(),
            );
          }
        },
      ),
    );
  }
}

Future<List<EvaluationResult>> fetchEvaluationResults() async {
  final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/getEvaluationResultCount.php')); // استبدل بـ API الخاص بك

  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => EvaluationResult.fromJson(data)).toList();
  } else {
    throw Exception('Failed to load results');
  }
}
