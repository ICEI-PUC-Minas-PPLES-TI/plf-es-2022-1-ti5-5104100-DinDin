import 'package:dindin/pages/goal/index.dart';
import 'package:flutter/material.dart';
import 'package:dindin/pages/wallet/index.dart';
import 'pages/login.dart';
import 'package:flutter/services.dart';
import 'pages/register.dart';

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
            tabBarTheme: const TabBarTheme(
              labelColor: Colors.black87, // color for text
            ),
            primarySwatch: Colors.green),
        initialRoute: "/login",
        routes: {
          "/login": (context) => Login(),
          "/register": (context) => Register(),
          "/wallet/index": (context) => const WalletList(),
          "/goal/index": (context) => const GoalList()
        });
  }
}
