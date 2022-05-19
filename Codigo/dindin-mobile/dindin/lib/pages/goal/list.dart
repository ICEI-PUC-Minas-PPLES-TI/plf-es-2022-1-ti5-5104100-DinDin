import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/pages/goal/create.dart';
import 'package:dindin/pages/goal/view.dart';
import 'package:dindin/models/goal.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GoalList extends StatefulWidget {
  const GoalList({Key? key}) : super(key: key);

  @override
  State<GoalList> createState() => _GoalListState();
}

Future<List<Goal>> fetchGoals() async {
  List<Goal> goalsList = <Goal>[];
  http.Response response;

  try {
    response = await ApiURL.get('/goal?page=1&attribute=id&order=ASC');
  } catch (e) {
    final String response =
        await rootBundle.loadString('assets/data/goals.json');
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
    return Scaffold(
      appBar: AppBar(
          title: const Text('Goals'),
          backgroundColor: Theme.of(context).primaryColor),
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
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                                  GoalView(idGoal: snapshot.data[index].id)),
                        );
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
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const GoalCreate()),
          );
        },
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
