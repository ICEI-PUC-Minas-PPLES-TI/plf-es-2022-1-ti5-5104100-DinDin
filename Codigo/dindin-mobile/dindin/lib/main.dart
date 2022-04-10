import 'package:dindin/pages/loginNoAuth.dart';
import 'package:dindin/pages/transactions/extract.dart';
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

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: "/login",
      routes: {
        "/login": (context) => LoginNoAuth(),
        "/register": (context) => Register(),
        "/wallet/index": (context) => const WalletList(),
        "/goal/index": (context) => const GoalList(),
        "/transaction/index": (context) => const Extract()
      },
      theme: ThemeData(primarySwatch: Colors.green),
    );
  }
}
