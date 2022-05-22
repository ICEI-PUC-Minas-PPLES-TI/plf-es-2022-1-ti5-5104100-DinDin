import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
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

  void formSubmit() async{
    if (inviteCode.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Empty Code"),
      ));
      return;
    }

    var url = ApiURL.baseUrl + "/wallet/invite";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();

    var response = await http.post(uri, headers: {'Authorization': token}, body: {'code' : inviteCode.text });
    var status = response.statusCode;
    var json = jsonDecode(response.body);
    if (status == 201) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Now you have acess to a new wallet!"),
      ));
      Navigator.of(context).pop();
    } else {
      var text = json['message'] ?? "Could not join wallet!";
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(text),
      ));
    }
  }

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
                        inputFormatters: [
                          LengthLimitingTextInputFormatter(8),
                        ],
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'ex: AAA323#',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                        style: const TextStyle(fontSize: 40),
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                      height: 60,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Join", style: TextStyle(fontSize: 30),),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: formSubmit,
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
