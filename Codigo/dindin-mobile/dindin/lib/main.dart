import 'package:dindin/pages/transactions/extract.dart';
import 'package:flutter/material.dart';
import 'pages/login2.dart';
import 'pages/login.dart';
import 'package:flutter/services.dart';
import 'pages/register.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(initialRoute: "/extract", routes: {
      "/login": (context) => Login2(),
      "/register": (context) => Register(),
      "/extract": (context) => const Extract()
    });
  }
}
