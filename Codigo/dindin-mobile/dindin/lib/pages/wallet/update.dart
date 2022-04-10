import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class WalletUpdate extends StatefulWidget {
  const WalletUpdate({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _WalletUpdateState();
  }
}

class _WalletUpdateState extends State<WalletUpdate> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text(
              'Update Goal',
            ),
            backgroundColor: Theme.of(context).primaryColor),
        body: Form(
          child: Scrollbar(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Description field
                    const Text('Description',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    const TextField(
                      decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'ex: Money under the mattress',
                          suffixIcon:
                              Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                    ),
                    // End description field
                    const SizedBox(height: 20),
                    SizedBox(
                      height: 40,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Update"),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: () {},
                      ),
                    ),
                    const SizedBox(height: 20),
                    Center(
                      child: TextButton(
                        onPressed: () => showDialog<String>(
                          context: context,
                          builder: (BuildContext context) => AlertDialog(
                            title: const Padding(
                              padding: EdgeInsets.only(left: 90.0),
                              child: FaIcon(FontAwesomeIcons.trash,
                                  size: 50.0, color: Colors.red),
                            ),
                            content: const Text(
                              "Delete ?",
                              textAlign: TextAlign.center,
                            ),
                            actions: <Widget>[
                              TextButton(
                                onPressed: () => Navigator.pop(context, 'OK'),
                                child: const Text('No',
                                    style: TextStyle(color: Colors.black)),
                                style: ElevatedButton.styleFrom(
                                  primary: Theme.of(context).canvasColor,
                                ),
                              ),
                              TextButton(
                                onPressed: () => Navigator.pop(context, 'OK'),
                                child: const Text('Yes',
                                    style: TextStyle(color: Colors.black)),
                                style: ElevatedButton.styleFrom(
                                  primary: Theme.of(context).canvasColor,
                                ),
                              ),
                            ],
                            actionsAlignment: MainAxisAlignment.spaceAround,
                            actionsPadding: EdgeInsets.all(16.0),
                          ),
                        ),
                        child: const Text(
                          'Delete Wallet',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}
