import 'package:flutter/material.dart';
import 'pages/login2.dart';
import 'package:dindin/pages/wallet/index.dart';
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
        "/login": (context) => Login2(),
        "/wallet/index": (context) => const WalletList()
      },
      theme: ThemeData(
        primarySwatch: Colors.green
      ),
    );
  }
}
