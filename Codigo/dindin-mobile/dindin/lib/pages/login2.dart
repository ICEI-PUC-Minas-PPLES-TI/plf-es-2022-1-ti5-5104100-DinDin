// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, use_key_in_widget_constructors
import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Login2 extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginState();
  }
}

class _LoginState extends State<Login2> {
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Flexible(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: SizedBox(
                  height: double.infinity,
                  width: double.infinity,
                  child: Align(
                    alignment: Alignment.bottomLeft,
                    child: Column(children: [
                      Flexible(
                        flex: 2,
                        child: SizedBox(height: double.infinity),
                      ),
                      Flexible(
                        flex: 2,
                        child: Text(
                          "Log In",
                          style: const TextStyle(
                              fontSize: 40, fontWeight: FontWeight.w400),
                        ),
                      ),
                    ]),
                  ),
                ),
              )),
          Flexible(
              flex: 5,
              child: SizedBox(
                height: double.infinity,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Flexible(
                          flex: 2,
                          child: Column(
                            children: [
                              TextField(
                                onChanged: (text) {
                                  email = text;
                                },
                                keyboardType: TextInputType.emailAddress,
                                decoration: InputDecoration(
                                    labelText: 'Enter Email Adress',
                                    border: OutlineInputBorder(),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.green),
                                    )),
                              ),
                              SizedBox(height: 20),
                              TextField(
                                onChanged: (text) {
                                  password = text;
                                },
                                obscureText: true,
                                decoration: InputDecoration(
                                    labelText: 'Password',
                                    border: OutlineInputBorder(),
                                    focusedBorder: OutlineInputBorder(
                                      borderSide:
                                          BorderSide(color: Colors.green),
                                    )),
                              ),
                            ],
                          )),
                      Flexible(
                          flex: 3,
                          child: SizedBox(
                            height: 40,
                            width: double.infinity,
                            child: ElevatedButton(
                              child: Text("Login"),
                              style: ElevatedButton.styleFrom(
                                primary: Colors.grey,
                              ),
                              onPressed: () {
                                userAuth(email, password);
                              },
                            ),
                          ))
                    ],
                  ),
                ),
              )),
          Flexible(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text("Don't have an account?"),
                          ],
                        ),
                        Row(
                          children: [
                            Text(
                              "REGISTER ",
                              style: TextStyle(color: Colors.green[800]),
                            ),
                            Icon(
                              Icons.arrow_forward,
                              color: Colors.green,
                              size: 30.0,
                            ),
                          ],
                        ),
                      ],
                    )
                  ],
                ),
              ))
        ],
      ),
    );
  }
}

Future userAuth(String email, String password) async {
  var url = "http://localhost:3001/api/user/auth";
  final Uri uri = Uri.parse(url);
  var response =
      await http.post(uri, body: {'email': email, 'password': password});
  var status = response.statusCode;
  var responseBody = response.body;
  if (status == 200) {
    print('Voce está logado!');
  } else {
    print('Usuário não encontrado');
  }
  return response.body;
}
