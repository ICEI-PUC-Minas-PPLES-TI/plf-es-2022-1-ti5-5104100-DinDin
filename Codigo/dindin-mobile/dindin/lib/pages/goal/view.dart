import 'package:dindin/pages/goal/edit.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(description),
        actions: [
          Padding(
            padding: const EdgeInsets.fromLTRB(0,0,20,0),
            child: IconButton(
              icon: const FaIcon(FontAwesomeIcons.penToSquare),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => GoalEdit(widget.goal)),
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
                              padding: const EdgeInsets.fromLTRB(0, 30, 0, 0),
                              child: Text(description,
                                  style: const TextStyle(
                                      fontSize: 50,
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
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: Text(
                            ('\$' + value.toString()),
                            style: const TextStyle(fontWeight: FontWeight.bold),
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
