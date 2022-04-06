import 'package:flutter/material.dart';

class GoalCreate extends StatefulWidget {
  const GoalCreate({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _GoalCreateState();
  }

}

class _GoalCreateState extends State<GoalCreate> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Create Goal',
        ),
        backgroundColor: Theme.of(context).primaryColor
      ),
      body: Form(
        child: Scrollbar(
          child: SingleChildScrollView(
            child: Row(
              children: [
                Column(
                  children: const [
                    ...[
                      Text('oi'),
                      TextField(
                        decoration: InputDecoration(
                          labelText: 'Description'
                        ),
                      ),
                    ]
                  ],
                )
              ],
            ),
          ),
        ),
      )
    );
  }
}