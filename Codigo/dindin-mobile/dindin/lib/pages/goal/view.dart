import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/goal.dart';
import 'package:dindin/pages/goal/edit.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

class GoalView extends StatelessWidget {
  const GoalView({Key? key, required this.idGoal}) : super(key: key);
  final int idGoal;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getGoal(idGoal),
        builder: (context, snap) {
          if (snap.hasData) {
            Goal goal = snap.data! as Goal;
            String goalName = goal.description;
            // Color statusColor = goal.status === "PENDING" ? Colors.amber : 
            //                     goal.status === ""
            return Scaffold(
              appBar: AppBar(
                title: Text(goalName),
                backgroundColor: Theme.of(context).primaryColor,
              ),
              body: ListView(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32.0),
                    child: Form(
                      key: key,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Card(
                            elevation: 5,
                            color: HexColor("F5F6FA"),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: Column(
                              children: [
                                Padding(
                                  padding:
                                      const EdgeInsets.only(top: 20, right: 20),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      IconButton(
                                        alignment: Alignment.topRight,
                                        icon: const FaIcon(
                                          FontAwesomeIcons.ellipsis,
                                          size: 30.0,
                                          color: Colors.black,
                                        ),
                                        color: Colors.black,
                                        onPressed: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) =>
                                                    const GoalEdit()),
                                          );
                                        },
                                      ),
                                    ],
                                  ),
                                ),
                                Center(
                                    child: Text(goal.description,
                                        style: const TextStyle(
                                            fontSize: 50,
                                            fontWeight: FontWeight.bold))),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      top: 8.0, left: 8, right: 8, bottom: 40),
                                  child: Text(
                                    ("Status: " + (goal.status ?? "")),
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w700,
                                        color: Colors.amber),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                LinearProgressIndicator(
                                  backgroundColor: Colors.grey.shade100,
                                  color: Colors.lightGreen,
                                  minHeight: 15,
                                  semanticsLabel: "\$ 741.50",
                                  value: 0.75,
                                ),
                                const Padding(
                                  padding: EdgeInsets.only(top: 8.0),
                                  child: Text(
                                    "\$ 741.50",
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                )
                              ],
                            ),
                          ),
                          const SizedBox(
                            height: 35,
                          ),
                          Card(
                            child: ListTile(
                                leading: const Padding(
                                  padding: EdgeInsets.only(top: 4.0, left: 4.0),
                                  child: FaIcon(
                                    FontAwesomeIcons.dollarSign,
                                    size: 30.0,
                                    color: Colors.black,
                                  ),
                                ),
                                title: const Text('Achievement Amount'),
                                subtitle: Text('\$ ' + goal.value.toString())),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Card(
                            child: ListTile(
                                leading: const Padding(
                                  padding: EdgeInsets.only(top: 4.0, left: 4.0),
                                  child: FaIcon(
                                    FontAwesomeIcons.calendar,
                                    size: 30.0,
                                    color: Colors.black,
                                  ),
                                ),
                                title: const Text('Limit Date'),
                                subtitle: Text(DateFormat('dd-MM-yyyy').format(
                                    DateTime.parse(goal.expireAt.toString())))),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Card(
                            child: ListTile(
                                leading: const Padding(
                                  padding: EdgeInsets.only(top: 4.0, left: 4.0),
                                  child: FaIcon(
                                    FontAwesomeIcons.bullseye,
                                    size: 30.0,
                                    color: Colors.black,
                                  ),
                                ),
                                title: const Text('Goal Type'),
                                subtitle: Text(goal.type.toString())),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Card(
                            child: ListTile(
                                leading: const Padding(
                                  padding: EdgeInsets.only(top: 4.0, left: 4.0),
                                  child: FaIcon(
                                    FontAwesomeIcons.wallet,
                                    size: 30.0,
                                    color: Colors.black,
                                  ),
                                ),
                                title: const Text('Wallet'),
                                subtitle: Text(goal.wallet?.description??"")),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          } else if (snap.hasError) {
            return Scaffold(
                appBar: AppBar(
                  title: const Text('Goal'),
                  backgroundColor: Theme.of(context).primaryColor,
                ),
                body: Center(
                    child: Text(
                        "Erro ao carregar dados: " + snap.error.toString())));
          } else {
            return const Center(
              child: CircularProgressIndicator(backgroundColor: Colors.white),
            );
          }
        });
  }
}

Future<Goal> getGoal(int idGoal) async {
  Response response = await ApiURL.get("/goal/" + idGoal.toString());
  if (response.statusCode == 200) {
    return Goal.fromJson(jsonDecode(response.body));
  } else {
    throw Exception(jsonDecode(response.body).message);
  }
}
