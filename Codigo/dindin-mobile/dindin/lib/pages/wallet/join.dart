import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class WalletJoin extends StatefulWidget {
  const WalletJoin({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() {
    return _WalletJoinState();
  }
}

class _WalletJoinState extends State<WalletJoin> {
  final inviteCode = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text(
              'Join Wallet',
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
                    //only visible if shared
                      const Text('Wallet invite code', style: TextStyle(fontWeight: FontWeight.bold)),
                      TextField(
                        controller: inviteCode,
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'ex: AAA323#',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                      height: 40,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Join"),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: () {
                          print("Joining wallet");
                          print(inviteCode.text);
                        },
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
