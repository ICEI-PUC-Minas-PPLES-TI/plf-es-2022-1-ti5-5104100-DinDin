// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables, use_key_in_widget_constructors
import 'dart:convert';
import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Register extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _LoginState();
  }
}

class _LoginState extends State<Register> {
  final TextEditingController _emailController = TextEditingController();
  String email = '';
  String password = '';
  String confirmPassword = '';
  String name = '';
  bool acceptedTerms = false;
  final formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    Color getColor(Set<MaterialState> states) {
      const Set<MaterialState> interactiveStates = <MaterialState>{
        MaterialState.pressed,
        MaterialState.hovered,
        MaterialState.focused,
      };
      if (states.any(interactiveStates.contains)) {
        return Theme.of(context).primaryColor;
      }
      return Colors.grey;
    }

    final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
    return Scaffold(
      key: _scaffoldKey,
      body: LayoutBuilder(builder: (context, viewportConstraints) {
        return SingleChildScrollView(
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: viewportConstraints.maxHeight,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 0.0, vertical: 20.0),
                          child: Align(
                            alignment: Alignment.bottomLeft,
                            child: Column(children: [
                              Text(
                                "Register",
                                style: const TextStyle(
                                    fontSize: 40, fontWeight: FontWeight.w400),
                              ),
                            ]),
                          ),
                        ),
                      ),
                      Form(
                        key: formKey,
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            children: [
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0.0, vertical: 10.0),
                                    child: TextFormField(
                                      onChanged: (text) {
                                        email = text;
                                      },
                                      keyboardType: TextInputType.emailAddress,
                                      decoration: InputDecoration(
                                          labelText: 'Email Adress',
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
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0.0, vertical: 10.0),
                                    child: TextFormField(
                                      controller: _emailController,
                                      keyboardType: TextInputType.emailAddress,
                                      decoration: InputDecoration(
                                          labelText: 'Your Name',
                                          border: OutlineInputBorder(),
                                          focusedBorder: OutlineInputBorder(
                                            borderSide:
                                                BorderSide(color: Colors.green),
                                          )),
                                      validator: (value) {
                                        if (value!.isEmpty ||
                                            !RegExp(r"^[a-zA-Z ]")
                                                .hasMatch(value)) {
                                          return "Enter correct name (only letters)";
                                        } else {
                                          null;
                                        }
                                      },
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0.0, vertical: 10.0),
                                    child: TextFormField(
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
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0.0, vertical: 10.0),
                                    child: TextFormField(
                                      onChanged: (text) {
                                        password = text;
                                      },
                                      obscureText: true,
                                      decoration: InputDecoration(
                                          labelText: 'Confirm Password',
                                          border: OutlineInputBorder(),
                                          focusedBorder: OutlineInputBorder(
                                            borderSide:
                                                BorderSide(color: Colors.green),
                                          )),
                                      validator: (value) {
                                        if (value!.isEmpty) {
                                          return "Confirm your password!";
                                        } else if (value != password) {
                                          return "Passwords don't match!";
                                        }
                                        return null;
                                      },
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 0.0, vertical: 10.0),
                                    child: Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Checkbox(
                                            checkColor: Colors.white,
                                            splashRadius: 20.0,
                                            fillColor: MaterialStateProperty
                                                .resolveWith(getColor),
                                            value: acceptedTerms,
                                            onChanged: (bool? value) {
                                              setState(() {
                                                acceptedTerms = value!;
                                              });
                                            },
                                          ),
                                          Flexible(
                                            child: Text(
                                              "I’ve read and agree to the terms of privacy policy",
                                            ),
                                          )
                                        ]),
                                  ),
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 0.0, vertical: 10.0),
                                child: SizedBox(
                                  height: 40,
                                  width: double.infinity,
                                  child: ElevatedButton(
                                    child: Text("Register"),
                                    style: ElevatedButton.styleFrom(
                                      primary: Colors.grey,
                                    ),
                                    onPressed: () {
                                      if (formKey.currentState!.validate()) {
                                        final snackBarTrue = SnackBar(
                                            content: Text('User created'));
                                        final snackBarFalse = SnackBar(
                                            content:
                                                Text('Fail to create user'));
                                        createUser(email, password, name)
                                            .then((res) => {
                                                  if (res == 0)
                                                    {
                                                      _scaffoldKey.currentState!
                                                          .showSnackBar(
                                                              snackBarTrue)
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
                              )
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text("Already have an account?"),
                            ],
                          ),
                          Row(
                            children: [
                              RichText(
                                text: TextSpan(
                                    text: "LOGIN",
                                    style: TextStyle(color: Colors.green[800]),
                                    recognizer: TapGestureRecognizer()
                                      ..onTap = () {
                                        Navigator.pushNamed(context, "/login");
                                      }),
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
                )
              ],
            ),
          ),
        );
      }),
    );
  }
}

Future<Object> createUser(String email, String name, String password) async {
  String url = "http://localhost:3001/api/user";
  final Uri uri = Uri.parse(url);
  var response = await http
      .post(uri, body: {'email': email, 'password': password, 'name': name});
  int status = response.statusCode;
  if (status == 201) {
    return jsonDecode(response.body);
  }
  return {'message': "Fail to connect to the network"};
}
