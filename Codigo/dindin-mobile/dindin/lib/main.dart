import 'package:flutter/material.dart';
import 'pages/login2.dart';
import 'pages/login.dart';
import 'pages/goal_create.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
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
      ),
      home: GoalCreate(),
    );
  }
}