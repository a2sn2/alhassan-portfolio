import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Map<String, dynamic>> getUserData() async {
  final response = await http.get(Uri.parse('http://192.168.1.107/EvaluationSystem/get_user.php'));

  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load user data');
  }
}
