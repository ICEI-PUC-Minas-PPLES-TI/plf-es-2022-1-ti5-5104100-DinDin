import 'package:dindin/pages/authorization/register.dart';
import 'package:dindin/pages/dashboard.dart';
import 'package:dindin/helpers/api_url.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/gestures.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutterfire_ui/auth.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _LoginState();
  }
}

class _LoginState extends State<Login> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
    return Scaffold(
      resizeToAvoidBottomInset: false,
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
                                  controller: _emailController,
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
                                    return null;
                                  },
                                ),
                                const SizedBox(height: 20),
                                TextFormField(
                                  obscureText: true,
                                  controller: _passController,
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
                                    return null;
                                  },
                                ),
                                const SizedBox(height: 20),
                                SizedBox(
                                  height: 40,
                                  width: double.infinity,
                                  child: ElevatedButton(
                                    child: const Text("Login"),
                                    style: ElevatedButton.styleFrom(
                                      primary: const Color.fromARGB(
                                          255, 84, 179, 88),
                                    ),
                                    onPressed: () {
                                      if (formKey.currentState!.validate()) {
                                        const snackBarTrue =
                                            SnackBar(content: Text('Loging'));
                                        const snackBarFalse = SnackBar(
                                            content: Text('User not Found'));
                                        userAuth(_emailController.text, _passController.text)
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
                                                                Dashboard()),
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
                                const Padding(
                                  padding: EdgeInsets.symmetric(vertical: 10),
                                  child: GoogleSignInButton(
                                      clientId:
                                          "125881301157-qrh3qr5r9r1h6jk1m3hfevts43s8n620.apps.googleusercontent.com"),
                                ),
                              ],
                            )),
                      ],
                    ),
                  ),
                )),
          ),
          Wrap(children: [
            Padding(
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
                                  Navigator.pushReplacement(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => Register()),
                                  );
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
            )
          ])
        ],
      ),
    );
  }
}

Future<bool> userAuth(String email, String password) async {
  var response = await ApiURL.post("/user/auth",
      body: {'email': email, 'password': password});
  var prefs = StreamingSharedPreferences.instance;
  var status = response.statusCode;
  if (status == 200) {
    var json = jsonDecode(response.body);
    String userId = json["userId"].toString();
    (await prefs).setString("token", json["token"]);
    FirebaseAuth.instance.signInWithCustomToken(json["firebaseToken"]);
    try {
      // Firebase Cloud Messaging
      FirebaseMessaging.instance.subscribeToTopic('U_' + userId);
    } catch (e) {
      print(
          "Não foi possível fazer a inscrição para receber mensagens no tópico");
    }

    var urlMe = ApiURL.baseUrl +
        "/user";
    final Uri uriMe = Uri.parse(urlMe);
    var response2 = await http.get(uriMe, headers: {'Authorization': json["token"]});
    var status2 = response2.statusCode;
    if (status2 == 200) {
      var jsonUser = jsonDecode(response2.body);
      await StreamingSharedPreferences.instance.then((sharedPref) async {
        await sharedPref.setString("username", jsonUser["name"]);
      });

      print(jsonUser["name"]);
    }

    return true;
  }
  return false;
}