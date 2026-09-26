import 'package:flutter/material.dart';
import 'API.dart';

class UserScreen extends StatefulWidget {
  @override
  _UserScreenState createState() => _UserScreenState();
}

class _UserScreenState extends State<UserScreen> {
  ApiService apiService = ApiService();
  String userId = "1";
  Map<String, dynamic>? userData;

  @override
  void initState() {
    super.initState();
    fetchUserData();
  }

  Future<void> fetchUserData() async {
    try {
      Map<String, dynamic> data = await apiService.getUserData(userId);
      setState(() {
        userData = data;
      });
    } catch (e) {
      print('Error fetching user data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Information'),
      ),
      body: userData == null
          ? Center(child: CircularProgressIndicator())
          : Column(
        children: [
          Text('Name: ${userData!['name']}'),
          Text('Email: ${userData!['email']}'),
        ],
      ),
    );
  }
}
