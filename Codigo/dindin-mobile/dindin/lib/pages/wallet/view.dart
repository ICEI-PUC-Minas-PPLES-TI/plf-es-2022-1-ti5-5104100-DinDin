import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl_phone_field/intl_phone_field.dart';

class WalletView extends StatefulWidget {
  const WalletView({Key? key}) : super(key: key);

  @override
  _WalletViewState createState() => _WalletViewState();
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

class _WalletViewState extends State<WalletView> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet X'),
        backgroundColor: primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const SizedBox(height: 20),
              Card(
                elevation: 5,
                color: HexColor("F5F6FA"),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(right: 20, top: 20),
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
                    Padding(
                      padding: const EdgeInsets.only(top: 25.0),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(10.0),
                        child: const Center(
                            child: Text('Wallet X',
                                style: TextStyle(
                                    fontSize: 50,
                                    fontWeight: FontWeight.bold))),
                      ),
                    ),
                    const SizedBox(height: 5.0),
                    const Text(
                      "Description",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 25.0),
                    const Text(
                      "Receipient type: Private",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 60.0),
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
                        FontAwesomeIcons.user,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Wallet Holder'),
                    subtitle: Text('Zé João')),
              ),
              const SizedBox(
                height: 10,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.buildingColumns,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Bank Name'),
                    subtitle: Text('Inter')),
              ),
              const SizedBox(
                height: 10,
              ),
              const Card(
                child: ListTile(
                    leading: Padding(
                      padding: EdgeInsets.only(top: 4.0, left: 4.0),
                      child: FaIcon(
                        FontAwesomeIcons.envelope,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    title: Text('Share Wallet'),
                    subtitle: Text('zejoao@protonmail.com')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
