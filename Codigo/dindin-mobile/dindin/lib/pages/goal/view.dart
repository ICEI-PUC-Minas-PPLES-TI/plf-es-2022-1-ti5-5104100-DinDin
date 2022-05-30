import 'dart:convert';
import 'package:percent_indicator/percent_indicator.dart';
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
  var walletDescription;
  @override
  void initState() {
    setState(() {
      description = widget.goal.description;
      status = widget.goal.status!;
      type = widget.goal.type == 'B' ? 'Saving' : 'Achievement';
      value = widget.goal.value!;
      expireAt = widget.goal.expireAt!;
      var splited = (expireAt.substring(0, 10)).split('-');
      expireAt = splited[2] + "/" + splited[1] + "/" + splited[0];
      walletId = (widget.goal.walletId).toString();
      walletDescription = widget.goal.walletDescription;
    });
    super.initState();
    getReportProgress(widget.goal.id);
  }

  void getReportProgress(id) async {
    var response = await ApiURL.get('/report/goal/$id');
    Map<String, dynamic> body = jsonDecode(response.body);
    if (body['value'] != null) {
      setState(() {
        valueUntilNow = double.parse(body['value']);
        progress = valueUntilNow / value;
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
                Navigator.pushReplacement(
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
                          LinearPercentIndicator(
                            backgroundColor: Colors.grey.shade100,
                            width: MediaQuery.of(context).size.width * 0.8,
                            animation: true,
                            lineHeight: 20.0,
                            linearStrokeCap: LinearStrokeCap.roundAll,
                            animationDuration: 1000,
                            center: Text(
                              "\$$valueUntilNow",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            percent: progress,
                            progressColor: Colors.lightGreen,
                          ),
                          if (progress < 1)
                            Padding(
                              padding: const EdgeInsets.only(top: 8.0),
                              child: Text(
                                ('${100 - (progress * 100)}% left to reach your goal!'),
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          if (progress >= 1)
                            const Padding(
                              padding: EdgeInsets.only(top: 8.0),
                              child: Text(
                                ('Congratulations, you reach your goal!'),
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            )
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
                        subtitle: Text(walletDescription['description'])),
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
