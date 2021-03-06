import 'dart:convert';
import 'package:dindin/pages/goal/edit.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../helpers/api_url.dart';
import '../../models/goal.dart';

class GoalView extends StatefulWidget {
  final Goal goal;

  const GoalView(this.goal, {Key? key}) : super(key: key);

  @override
  _GoalViewState createState() => _GoalViewState();
}

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

class _GoalViewState extends State<GoalView> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  String description = '';
  String status = '';
  num value = 0;
  String type = '';
  String expireAt = '';
  String walletId = '';
  var progress = 0.0;
  bool hasProgress = false;
  num valueUntilNow = 0;
  // ignore: prefer_typing_uninitialized_variables
  var walletDescription = '';
  @override
  void initState() {
    getGoal(widget.goal.id);
    super.initState();
  }

  void getGoal(id) async {
    var response = await ApiURL.get('/goal/$id');
    Map<String, dynamic> body = jsonDecode(response.body);
    setState(() {
      description = body['description'];
      status = body['status'];
      type = body['type'] == 'B' ? 'Saving' : 'Achievement';
      value = body['value'];
      expireAt = body['expire_at'];
      var splited = (expireAt.substring(0, 10)).split('-');
      expireAt = splited[2] + "/" + splited[1] + "/" + splited[0];
      walletId = body['wallet_id'];
      walletDescription = (body['wallet']['description']);
      getReportProgress(id);
    });
  }

  void getReportProgress(id) async {
    var response = await ApiURL.get('/report/goal/$id');
    Map<String, dynamic> body = jsonDecode(response.body);
    if (body['value'] != null) {
      setState(() {
        valueUntilNow = body['value'];
        progress = valueUntilNow / value;

        if (progress > 1) {
          progress = 1;
        } else if (progress < 0) {
          progress = 0;
        }
        hasProgress = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          description,
          style: TextStyle(fontSize: description.length > 8 ? 15 : 20),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 0, 20, 0),
            child: IconButton(
              icon: const FaIcon(FontAwesomeIcons.penToSquare),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => GoalEdit(widget.goal)),
                );
              },
            ),
          ),
        ],
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ListView(
        children: [
          const SizedBox(
            height: 20,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32.0),
            child: Form(
              key: _formKey,
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
                        Center(
                            child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 30, 10, 0),
                          child: Text(description,
                              style: TextStyle(
                                  fontSize: description.length > 8 ? 30 : 50,
                                  fontWeight: FontWeight.bold)),
                        )),
                        Padding(
                          padding: const EdgeInsets.only(
                              top: 8.0, left: 8, right: 8, bottom: 40),
                          child: Text(
                            "Status: " + status,
                            style: const TextStyle(
                                fontWeight: FontWeight.w700,
                                color: Colors.amber),
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (hasProgress)
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          LinearProgressIndicator(
                            backgroundColor: Colors.grey.shade100,
                            color: progress < 0.3
                                ? Colors.red
                                : progress < 0.7
                                    ? Colors.amber
                                    : Colors.green,
                            minHeight: 20,
                            value: progress,
                          ),
                          if (progress < 1)
                            Padding(
                              padding: const EdgeInsets.only(top: 8.0),
                              child: Text(
                                ('\$${(value - valueUntilNow).toStringAsFixed(2)} left to reach your goal!'),
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          if (progress >= 1)
                            const Padding(
                              padding: EdgeInsets.only(top: 8.0),
                              child: Text(
                                ('Congratulations, you reached your goal!'),
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ),
                        ],
                      ),
                    ),
                  const SizedBox(
                    height: 20,
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
                        title: Text('Achievement Amount'),
                        subtitle: Text('\$' + value.toString())),
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
                        subtitle: Text(expireAt)),
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
                        subtitle: Text(type)),
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
                        subtitle: Text(walletDescription)),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
