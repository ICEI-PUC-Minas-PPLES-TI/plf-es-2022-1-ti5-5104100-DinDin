import 'package:flutter/material.dart';

class Transaction extends StatefulWidget {
  @override
  _TransactionState createState() => _TransactionState();
}

class _TransactionState extends State<Transaction> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Add transaction"),
        backgroundColor: Colors.green,
      ),
      body: SingleChildScrollView(
        primary: false,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(children: [
            
          ]),
        ),
      ),
    );
  }
}
