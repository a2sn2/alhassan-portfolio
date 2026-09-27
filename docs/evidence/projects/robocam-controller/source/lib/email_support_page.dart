import 'package:flutter/material.dart';
import 'package:flutter_email_sender/flutter_email_sender.dart';
import 'package:permission_handler/permission_handler.dart';

class EmailSupportPage extends StatefulWidget {
  @override
  _EmailSupportPageState createState() => _EmailSupportPageState();
}

class _EmailSupportPageState extends State<EmailSupportPage> {
  final TextEditingController _subjectController = TextEditingController();
  final TextEditingController _bodyController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  // Method to check and request storage permissions
  Future<void> checkAndRequestPermissions() async {
    // Check if storage permission is granted
    if (await Permission.storage.isGranted) {
      print('Storage permission already granted');
      // Permission is granted, proceed with sending the email
      sendEmail();
    } else {
      // Request storage permission if not granted
      PermissionStatus status = await Permission.storage.request();

      // If permission is granted, proceed with sending the email
      if (status.isGranted) {
        print('Storage permission granted');
        sendEmail();
      } else {
        print('Storage permission not granted');
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Storage permission is required to send the email'),
        ));
      }
    }
  }

  // Method to send the email
  Future<void> sendEmail() async {
    if (_formKey.currentState!.validate()) {
      print('Sending email...');
      final Email email = Email(
        body: _bodyController.text,
        subject: _subjectController.text,
        recipients: ['hassan1alshami6@gmail.com'],
        isHTML: false,
      );

      try {
        await FlutterEmailSender.send(email);
        print('Email sent successfully');
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Support request sent successfully'),
        ));
      } catch (error) {
        print('Failed to send email: $error');
        String errorMessage = error.toString().contains('not_available')
            ? 'No email clients found. Please ensure an email app is installed and configured on your device.'
            : 'Failed to send support request. Please try again later.';

        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(errorMessage),
        ));
      }
    }
  }

  @override
  void dispose() {
    _subjectController.dispose();
    _bodyController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Support'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _subjectController,
                decoration: InputDecoration(labelText: 'Subject'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a subject';
                  }
                  return null;
                },
              ),
              SizedBox(height: 10),
              TextFormField(
                controller: _bodyController,
                decoration: InputDecoration(labelText: 'Message'),
                maxLines: 5,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a message';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  // Call the permission check and email sending method
                  checkAndRequestPermissions();
                },
                child: Text('Send Email'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
