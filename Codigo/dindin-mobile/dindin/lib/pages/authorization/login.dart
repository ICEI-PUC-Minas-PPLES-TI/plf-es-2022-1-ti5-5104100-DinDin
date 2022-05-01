import 'package:dindin/pages/dashboard.dart';

import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

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
      resizeToAvoidBottomInset : false,
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
                    child: Column(children: const [
                      Flexible(
                        flex: 2,
                        child: SizedBox(height: double.infinity),
                      ),
                      Flexible(
                        flex: 2,
                        child: Text(
                          "Log In",
                          style: TextStyle(
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
                                  decoration: const InputDecoration(
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
                                const SizedBox(height: 20),
                                TextFormField(
                                  onChanged: (text) {
                                    password = text;
                                  },
                                  obscureText: true,
                                  decoration: const InputDecoration(
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
                                const SizedBox(height: 20),
                                SizedBox(
                                  height: 40,
                                  width: double.infinity,
                                  child: ElevatedButton(
                                    child: const Text("Login"),
                                    style: ElevatedButton.styleFrom(
                                      primary: Color.fromARGB(255, 84, 179, 88),
                                    ),
                                    onPressed: () {
                                      if (formKey.currentState!.validate()) {
                                        const snackBarTrue =
                                            SnackBar(content: Text('Loging'));
                                        const snackBarFalse = SnackBar(
                                            content: Text('User not Found'));
                                        userAuth(email, password)
                                            .then((res) => {
                                              print(res),
                                                  if (res == true)
                                                    {
                                                      _scaffoldKey.currentState!
                                                          .showSnackBar(
                                                              snackBarTrue),
                                                      Navigator.pushReplacement(
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
                                        const snackBar = SnackBar(
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
          Wrap(
              children: [Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          children: const [
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
                            const Icon(
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
              )])
        ],
      ),
    );
  }
}

Future<bool> userAuth(String email, String password) async {
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
