import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GoalView extends StatefulWidget {
  const GoalView({Key? key}) : super(key: key);

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Goal X'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
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
                    Padding(
                      padding: const EdgeInsets.only(top: 20, right: 20),
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
                              // Respond to icon toggle
                            },
                          ),
                        ],
                      ),
                    ),
                    const Center(
                        child: Text('Goal X',
                            style: TextStyle(
                                fontSize: 50, fontWeight: FontWeight.bold))),
                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text(
                        "Status: In progress",
                        style: TextStyle(
                            fontWeight: FontWeight.w700, color: Colors.amber),
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
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 35,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.dollarSign,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Achievement Amount'),
                    subtitle: Text('\$ 1,000.00')),
              ),
              const SizedBox(
                height: 10,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.calendar,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Limit Date'),
                    subtitle: Text('10/12/2022')),
              ),
              const SizedBox(
                height: 10,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.bullseye,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Goal Type'),
                    subtitle: Text('Achievement')),
              ),
              const SizedBox(
                height: 10,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.wallet,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Wallet'),
                    subtitle: Text('Personal')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
