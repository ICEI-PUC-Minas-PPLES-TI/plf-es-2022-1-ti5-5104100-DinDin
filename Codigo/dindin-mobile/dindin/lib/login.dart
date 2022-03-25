// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, use_key_in_widget_constructors

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Login extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginState();
  }
}

class _LoginState extends State<Login> {
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
          child: SizedBox(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height,
              child: Padding(
                padding: const EdgeInsets.all(15.0),
                child: Column(children: [
                  SizedBox(height: 20),
                  Row(
                    children: [
                      Text("Log In",
                      style: const TextStyle(
                      fontSize: 40,
                      fontWeight: FontWeight.w400),),
                    ],
                  ),
                  SizedBox(height: 80),
                  Container(
                    height: 40,
                    child: TextField(
                      onChanged: (text) {
                        email = text;
                      },
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Enter Email Adress',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                  SizedBox(height: 10),
                  Container(
                    height: 40,
                    child: TextField(
                      onChanged: (text) {
                        password = text;
                      },
                      obscureText: true,
                      decoration: InputDecoration(
                          labelText: 'Password', border: OutlineInputBorder()),
                    ),
                  ),
                  SizedBox(height: 45),
                  SizedBox(
                    height: 40,
                    width: double.infinity,
                    child: ElevatedButton(
                      child: Text("Login"),
                      style: ElevatedButton.styleFrom(
                        primary: Colors.grey,
                        
                      ),
                      onPressed: () {
                        print("Login: " + email + "\nPassword: " + password);
                      },
                    ),
                  ),
                  SizedBox(height: 90),
                  Row(children: [
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
                            Text("REGISTER  ->",
                            style: TextStyle(
                              color: Colors.green[800]
                            ),),
                          ],
                        ),
                      ],
                    )
                  ],)
                  
                ]),
                    ),
                  )));
  }
}