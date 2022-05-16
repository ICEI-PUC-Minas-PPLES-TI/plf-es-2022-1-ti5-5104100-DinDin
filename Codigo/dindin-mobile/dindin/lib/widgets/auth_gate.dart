import 'dart:async';
import 'dart:convert';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import '../pages/authorization/login.dart';
import '../pages/dashboard.dart';

import 'package:http/http.dart' as http;

class AuthClass {
  String? token;
  User? firebaseUser;
}

class AuthGate extends StatelessWidget {
  const AuthGate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Stream<AuthClass> authStream = AuthStream().stream;

    return StreamBuilder<AuthClass>(
        stream: authStream,
        builder: (context, snapshot) {
          if (snapshot.data?.token?.isNotEmpty == true) {
            return const Dashboard();
          } else if (snapshot.data?.firebaseUser != null) {
            return FutureBuilder(
                future: autheticateToServerViaFirebaseUser(
                    snapshot.data!.firebaseUser!),
                builder: ((context, snapshot) {
                  if (snapshot.hasError) {
                    return const Login();
                  } else {
                    return const Scaffold(
                      body: Center(
                        child: CircularProgressIndicator(
                            backgroundColor: Colors.white),
                      ),
                    );
                  }
                }));
          } else {
            return const Login();
          }
        });
  }
}

class AuthStream {
  final StreamController<AuthClass> _controller = StreamController<AuthClass>();
  final AuthClass _authObject = AuthClass();

  AuthStream() {
    Stream<User?> firebaseUserStream = FirebaseAuth.instance.userChanges();

    StreamingSharedPreferences.instance.then((value) => {
          value.getString("token", defaultValue: "").listen((value) {
            _authObject.token = value;
            _controller.sink.add(_authObject);
          })
        });

    firebaseUserStream.listen((event) {
      _authObject.firebaseUser = event;
      _controller.sink.add(_authObject);
    });
  }
  Stream<AuthClass> get stream => _controller.stream;
}

Future autheticateToServerViaFirebaseUser(User firebaseUser) {
  var url = dotenv.get('API_BASE_URL', fallback: 'http://localhost:3001/api') +
      "/user/auth";
  final Uri uri = Uri.parse(url);

  return firebaseUser
      .getIdToken()
      .then((token) => http.post(uri, body: {'firebaseToken': token}))
      .then((response) async {
    var json = jsonDecode(response.body);
    int userId = json["userId"];
    try {
      await FirebaseMessaging.instance
          .subscribeToTopic('U_' + userId.toString());
    } catch (e) {
      print(
          "Não foi possível fazer a inscrição para receber mensagens no tópico");
    }
    StreamingSharedPreferences.instance.then((sharedPref) {
      sharedPref.setString("token", json["token"]);
    });
  });
}
