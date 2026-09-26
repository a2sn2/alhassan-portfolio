import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl = "http://192.168.1.107/EvaluationSystem/";

  // استرجاع بيانات المستخدم
  Future<Map<String, dynamic>> getUserData(String userId) async {
    final response = await http.get(Uri.parse("${baseUrl}getUser.php?userId=$userId"));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load user data');
    }
  }

  // استرجاع عدد الطلاب
  Future<int> getStudentCount() async {
    final response = await http.get(Uri.parse("${baseUrl}getStudentCount.php"));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      return data['total_students'];
    } else {
      throw Exception('Failed to load student count');
    }
  }

  // استرجاع عدد المحاضرين
  Future<int> getLecturerCount() async {
    final response = await http.get(Uri.parse("${baseUrl}getLecturerCount.php"));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      return data['total_lecturers'];
    } else {
      throw Exception('Failed to load lecturer count');
    }
  }

  // استرجاع عدد الدورات
  Future<int> getCourseCount() async {
    final response = await http.get(Uri.parse("${baseUrl}getCourseCount.php"));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      return data['total_courses'];
    } else {
      throw Exception('Failed to load course count');
    }
  }

  Future<int> getEvaluationResultCount() async {
    final response = await http.get(Uri.parse("${baseUrl}getEvaluationResultCount.php"));

    if (response.statusCode == 200) {
      var data = json.decode(response.body);
      return data['total_results'];
    } else {
      throw Exception('Failed to load evaluation results count');
    }
  }
}
