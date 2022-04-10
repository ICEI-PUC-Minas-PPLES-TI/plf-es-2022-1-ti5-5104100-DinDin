import 'package:dindin/pages/goal/index.dart';
import 'package:dindin/pages/wallet/create.dart';
import 'package:flutter/material.dart';
import 'package:dindin/pages/wallet/index.dart';
import 'pages/login.dart';
import 'package:flutter/services.dart';

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
    return MaterialApp(
      initialRoute: "/login",
      routes: {
        "/login": (context) => Login(),
        "/wallet/index": (context) => const WalletList(),
        "/goal/index": (context) => const GoalList()
      },
      theme: ThemeData(primarySwatch: Colors.green),
    );
  }
}
