// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, use_key_in_widget_constructors
import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:dindin/pages/dashboard.dart';

class Login extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginState();
  }
}

class _LoginState extends State<Login> {
  String email = '';
  String password = '';
  final formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
    return Scaffold(
      key: _scaffoldKey,
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
          Form(
            key: formKey,
            child: Expanded(
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
                                TextFormField(
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
                                  validator: (value) {
                                    if (value!.isEmpty ||
                                        !RegExp(r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                                            .hasMatch(value)) {
                                      return "Enter correct email";
                                    } else {
                                      null;
                                    }
                                  },
                                ),
                                SizedBox(height: 20),
                                TextFormField(
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
                                  validator: (value) {
                                    if (value!.isEmpty) {
                                      return "Password can't be empty";
                                    } else {
                                      null;
                                    }
                                  },
                                ),
                                SizedBox(height: 20),
                                SizedBox(
                                  height: 40,
                                  width: double.infinity,
                                  child: ElevatedButton(
                                    child: Text("Login"),
                                    style: ElevatedButton.styleFrom(
                                      primary: Colors.grey,
                                    ),
                                    onPressed: () {
                                      if (formKey.currentState!.validate()) {
                                        final snackBarTrue =
                                            SnackBar(content: Text('Loging'));
                                        final snackBarFalse = SnackBar(
                                            content: Text('User not Found'));
                                        userAuth(email, password)
                                            .then((res) => {
                                                  if (res == true)
                                                    {
                                                      _scaffoldKey.currentState!
                                                          .showSnackBar(
                                                              snackBarTrue),
                                                      Navigator.push(
                                                        context,
                                                        MaterialPageRoute(
                                                            builder: (context) =>
                                                                const Dashboard()),
                                                      )
                                                    }
                                                  else
                                                    {
                                                      _scaffoldKey.currentState!
                                                          .showSnackBar(
                                                              snackBarFalse)
                                                    }
                                                });
                                      } else {
                                        final snackBar = SnackBar(
                                            content:
                                                Text('Invalid credencials'));
                                        _scaffoldKey.currentState!
                                            .showSnackBar(snackBar);
                                      }
                                    },
                                  ),
                                ),
                              ],
                            )),
                      ],
                    ),
                  ),
                )),
          ),
          Expanded(
              flex: 1,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          children: [
                            Text("Don't have an account?"),
                          ],
                        ),
                        Row(
                          children: [
                            RichText(
                              text: TextSpan(
                                text: "REGISTER ",
                                style: TextStyle(color: Colors.green[800]),
                                recognizer: TapGestureRecognizer()
                                  ..onTap = () {
                                    Navigator.pushNamed(context, "/register");
                                  },
                              ),
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

Future<bool> userAuth(String email, String password) async {
  return true;
  var url = "http://localhost:3001/api/user/auth";
  final Uri uri = Uri.parse(url);
  var response =
      await http.post(uri, body: {'email': email, 'password': password});
  var status = response.statusCode;
  if (status == 200) {
    return true;
  }
  return false;
}
