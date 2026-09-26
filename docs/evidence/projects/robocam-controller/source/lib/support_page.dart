import 'package:flutter/material.dart';
import 'email_support_page.dart'; // Import the EmailSupportPage
import 'generated/l10n.dart'; // Import localization
import 'package:intl/intl.dart';

class SupportPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final localizations = S.of(context); // Access localization

    return Scaffold(
      appBar: AppBar(
        title: Text(localizations.inAppSupport),
        backgroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              Intl.message(
                'Welcome to Support!',
                name: 'welcome',
              ),
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(
              localizations.helpAndSupport,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            ListTile(
              leading: Icon(Icons.help_outline, semanticLabel: 'FAQ Icon'),
              title: Text(localizations.faq, semanticsLabel: 'FAQ'),
              onTap: () {
                // Navigate to FAQ page
                Navigator.pushNamed(context, '/faq');
              },
            ),
            ListTile(
              leading: Icon(Icons.email_outlined, semanticLabel: 'Email Icon'),
              title: Text(localizations.contactSupport, semanticsLabel: 'Contact Support'),
              onTap: () {
                // Navigate to EmailSupportPage
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => EmailSupportPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.group, semanticLabel: 'Community Icon'),
              title: Text(localizations.joinUserCommunity, semanticsLabel: 'Join User Community'),
              onTap: () {
                // Navigate to community page or open external link
                // For example:
                // Navigator.pushNamed(context, '/community');
              },
            ),
          ],
        ),
      ),
    );
  }
}
