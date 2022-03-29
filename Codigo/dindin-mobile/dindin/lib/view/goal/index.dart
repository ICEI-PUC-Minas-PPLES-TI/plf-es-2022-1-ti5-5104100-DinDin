import 'package:flutter/material.dart';

class Goals extends StatelessWidget {
  const Goals({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Goals'),
        backgroundColor: primaryColor,
      ),
      body: const Center(child: Text('Press the button below!')),
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