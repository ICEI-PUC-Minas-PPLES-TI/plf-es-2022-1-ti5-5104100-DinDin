import 'package:flutter/material.dart';

class Goals extends StatefulWidget {
  const Goals({Key? key}) : super(key: key);

  @override
  State<Goals> createState() => _GoalsState();
}

class _GoalsState extends State<Goals> {
  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Goals'),
        backgroundColor: primaryColor,
      ),
      body: ListView(
        children: const <Widget>[
          Card(
            child: Padding(
              padding: EdgeInsets.only(top: 8.0, bottom: 8.0),
              child: ListTile(
                leading: FlutterLogo(size: 56.0),
                title: Text('Three-line ListTile'),
                trailing: Icon(Icons.more_vert),
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your onPressed code here!
        },
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
