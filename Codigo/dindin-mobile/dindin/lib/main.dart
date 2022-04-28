import 'package:dindin/pages/authorization/login.dart';
import 'package:dindin/pages/authorization/register.dart';

import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

late FirebaseMessaging messaging;

Future<void> _messageHandler(RemoteMessage message) async {
  print('background message ${message.notification!.body}');
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);

  await Firebase.initializeApp();

  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
  const AndroidInitializationSettings initializationSettingsAndroid = AndroidInitializationSettings('app_icon');
  final InitializationSettings initializationSettings = InitializationSettings(android: initializationSettingsAndroid,);
  await flutterLocalNotificationsPlugin.initialize(initializationSettings);

  FirebaseMessaging.onBackgroundMessage(_messageHandler);

  // Firebase Cloud Messaging
  messaging = FirebaseMessaging.instance;
  messaging.getToken().then((value){
    print(value);
  });
  runApp(const MyApp());
}

const primaryColor = Color.fromARGB(255, 91, 208, 152);

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      
        theme: ThemeData(
            primaryColor: primaryColor,
            tabBarTheme: const TabBarTheme(
              labelColor: Colors.black87, // color for text
            ),
            primarySwatch: Colors.green),
        initialRoute: "/login",
        routes: {
          "/login": (context) => const Login(),
          "/register": (context) => Register(),
        });
  }
}
