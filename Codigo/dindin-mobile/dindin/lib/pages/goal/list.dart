import 'package:dindin/pages/goal/create.dart';
import 'package:dindin/pages/goal/view.dart';
import 'package:dindin/models/goal.dart';
import 'package:dindin/helpers/api_url.dart';
import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
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
    response = await ApiURL.get('/goal');
    final goalsJson = jsonDecode(response.body)['goals'];
    num status = response.statusCode;
    if (status == 200) {
      for (var goal in goalsJson) {
        goalsList.add(Goal.fromJson(goal));
      }
    } else {
      throw Exception('Failed to load goals');
    }

    return goalsList;
  } catch (e) {
    print(e);
  }

  return goalsList;
}

class _GoalListState extends State<GoalList> {
  late Future<List<Goal>> goals;

  @override
  void initState() {
    super.initState();
    goals = fetchGoals();
  }

  void deleteGoal(id) async {
    var url = ApiURL.baseUrl + "/goal/" + id;
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    try {
      var response = await http.delete(uri, headers: {'Authorization': token});
      var status = response.statusCode;
      if (status == 204) {
        print('delete');
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const GoalList()),
        );
      } else {
        print(response.body);
      }
    } catch (e) {
      print(e);
    }
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
                        final Goal goal = Goal(
                            id: snapshot.data[index].id,
                            createdAt: '',
                            deletedAt: '',
                            updatedAt: '',
                            description: snapshot.data[index].description,
                            expireAt: snapshot.data[index].expireAt,
                            walletId: snapshot.data[index].walletId,
                            value: snapshot.data[index].value,
                            type: snapshot.data[index].type,
                            status: snapshot.data[index].status,
                            walletDescription:
                                snapshot.data[index].walletDescription);
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => GoalView(goal)),
                        );
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: Slidable(
                          actionPane: const SlidableScrollActionPane(),
                          actions: [
                            IconSlideAction(
                                caption: 'Delete',
                                color: Colors.red,
                                icon: Icons.delete,
                                onTap: () => {
                                      deleteGoal(
                                          (snapshot.data[index].id).toString())
                                    })
                          ],
                          actionExtentRatio: 1 / 5,
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
