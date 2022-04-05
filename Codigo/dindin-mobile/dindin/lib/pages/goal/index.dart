import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:dindin/pages/goal/model.dart';

class GoalList extends StatefulWidget {
  const GoalList({Key? key}) : super(key: key);

  @override
  State<GoalList> createState() => _GoalListState();
}

Future<List<Goal>> fetchGoals() async {
  List<Goal> goalsList = <Goal>[];
  http.Response response;

  try {
    response = await http.get(Uri.parse(
        'http://localhost:3001/api/goal?page=1&limit=5&attribute=id&order=ASC'));
  } catch (e) {
    final String response = await rootBundle.loadString('assets/goals.json');
    final goalsJson = jsonDecode(response)['goals'];
    for (var goal in goalsJson) {
      goalsList.add(Goal.fromJson(goal));
    }
    return goalsList;
  }

  if (response.statusCode == 200) {
    final goalsJson = jsonDecode(response.body)['goals'];
    for (var goal in goalsJson) {
      goalsList.add(Goal.fromJson(goal));
    }
    return goalsList;
  } else {
    throw Exception('Failed to load goals');
  }
}

class _GoalListState extends State<GoalList> {
  late Future<List<Goal>> goals;

  @override
  void initState() {
    super.initState();
    goals = fetchGoals();
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Goals'),
        backgroundColor: primaryColor,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchGoals(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: InkWell(
                      onTap: () {
                        print("Open Goal Visualization at id: " +
                            snapshot.data[index].id.toString());
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: ListTile(
                          leading: const Padding(
                            padding: EdgeInsets.only(top: 5.0),
                            child: FaIcon(
                              FontAwesomeIcons.bullseye,
                              size: 30.0,
                              color: Colors.redAccent,
                            ),
                          ),
                          title: Text((snapshot.data[index].description)),
                        ),
                      ),
                    ),
                  );
                });
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Create a new Goal");
        },
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
