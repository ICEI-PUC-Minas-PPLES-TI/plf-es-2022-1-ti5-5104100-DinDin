import 'dart:convert';
import 'dart:io';

import 'package:dindin/pages/goal/list.dart';
import 'package:dindin/pages/profile/edit.dart';
import 'package:dindin/pages/transactions/form.dart';
import 'package:dindin/pages/transactions/list.dart';
import 'package:dindin/pages/wallet/list.dart';
import 'package:dindin/widgets/transactions_list.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:dindin/helpers/api_url.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';
import 'package:http/http.dart' as http;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {

  var userName = " ";
  var hasInternet = true;
  int walletID = 0;
  var walletName = 'Not Defined';
  var incoming;
  var outcoming;

  @override
  void initState() {
    super.initState();
    getMe();
    checkInternet();
    getCurrentWallet();
    getBalance();
  }

  void getMe() async {
    final prefs = await StreamingSharedPreferences.instance;
    final Preference<String> name = prefs.getString("username", defaultValue: 'Name');
    setState(() {
      userName = name.getValue();
    });

    StreamingSharedPreferences.instance.then((value) => {
      value.getString("username", defaultValue: "Name").listen((value) {
        setState(() {
          userName = name.getValue();
        });
      })
    });
  }

  void checkInternet() async {
    try {
      final result = await InternetAddress.lookup('example.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
        print("con");
        setState(() {
          hasInternet = true;
        });
      }
    } on SocketException catch (_) {
      // Not Connected to Internet
      print("not con");
      setState(() {
        hasInternet = false;
      });
    }
  }

  void getCurrentWallet() async {
    final prefs = await StreamingSharedPreferences.instance;
    final Preference<int> walletPrefID = prefs.getInt("dashwalletID", defaultValue: 0);
    final Preference<String> walletPrefName = prefs.getString("dashwalletName", defaultValue: '');
    if(walletPrefID.getValue() > 0) {
      setState(() {
        walletID = walletPrefID.getValue();
        walletName = walletPrefName.getValue();
      });
    }

    StreamingSharedPreferences.instance.then((value) => {
      value.getInt("dashwalletID", defaultValue: 0).listen((value) {
        if(value > 0) {
          setState(() {
            walletID = walletPrefID.getValue();
            walletName = walletPrefName.getValue();
          });
        }
      })
    });
  }

  void getBalance() async {
    var url = ApiURL.baseUrl + "/report/balance";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    if(response.statusCode == 200) {
      var json = jsonDecode(response.body);
      print(json);
      setState(() {
        incoming = json['incoming'];
        outcoming = json['outcoming'];
      });
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text('Dashboard'),
                CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.transparent,
                  child: IconButton(
                    alignment: Alignment.topRight,
                    icon: const Center(
                      child: FaIcon(
                        FontAwesomeIcons.rightFromBracket,
                        size: 25.0,
                        color: Colors.white,
                      ),
                    ),
                    color: Colors.white,
                    onPressed: () async {
                      FirebaseAuth.instance.signOut();
                      (await StreamingSharedPreferences.instance)
                          .remove("token");
                    },
                  ),
                ),
              ],
            ),
            backgroundColor: Theme.of(context).primaryColor,
            automaticallyImplyLeading: false),
        body: ListView(
          children: [
            // User name Row
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
              child: Container(
                width: double.infinity,
                height: 150,
                decoration: BoxDecoration(color: Colors.grey.shade100),
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(children: [
                    const Center(
                      child: FaIcon(
                        FontAwesomeIcons.circleUser,
                        size: 30.0,
                        color: Colors.black,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      userName,
                      style:
                      const TextStyle(fontSize: 27, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 20),
                    Text('Current Wallet: $walletName')
                  ]),
                ),
              ),
            ),
            // Buttons Row
            Row(
              children: [
                // Wallets
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const Center(
                              child: FaIcon(
                                FontAwesomeIcons.wallet,
                                size: 25.0,
                                color: Colors.black,
                              ),
                            ),
                            color: Colors.black,
                            onPressed: () {
                              // Respond to icon toggle
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const WalletList()),
                              );
                            },
                          ),
                        ),
                        const Text('Wallets')
                      ],
                    ),
                    flex: 2),
                // Transaction Button
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Expanded(
                      child: Column(children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const Center(
                              child: FaIcon(
                                FontAwesomeIcons.arrowRightArrowLeft,
                                size: 25.0,
                                color: Colors.black,
                              ),
                            ),
                            color: Colors.black,
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const Extract()),
                              );
                            },
                          ),
                        ),
                        const Text('Transaction')
                      ]),
                      flex: 2),
                ),
                // Account Button
                if(hasInternet)
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const Center(
                              child: FaIcon(
                                FontAwesomeIcons.circleUser,
                                size: 25.0,
                                color: Colors.black,
                              ),
                            ),
                            color: Colors.black,
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const ProfilePage()),
                              );
                            },
                          ),
                        ),
                        const Text('Account')
                      ],
                    ),
                    flex: 2),
                // Goal
                if(hasInternet)
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const Center(
                              child: FaIcon(
                                FontAwesomeIcons.bullseye,
                                size: 25.0,
                                color: Colors.black,
                              ),
                            ),
                            color: Colors.black,
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const GoalList()),
                              );
                            },
                          ),
                        ),
                        const Text('Goals')
                      ],
                    ),
                    flex: 2),

              ],
            ),
            // Balance
            Padding(
              padding: const EdgeInsets.all(10),
              child: Container(
                width: double.infinity,
                height: 120,
                decoration: BoxDecoration(color: Colors.grey.shade100),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('BALANCE',
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.w300)),
                        Text('\$${(incoming != null && outcoming  != null)? (incoming - outcoming) : 0}',
                            style: const TextStyle(
                                fontSize: 24, fontWeight: FontWeight.w600)),
                        const Text('US Dollars'),
                      ]),
                ),
              ),
            ),
            // Out/IN
            Column(children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Row(children: [
                  Expanded(
                      flex: 4,
                      child: Container(
                        width: double.infinity,
                        height: 80,
                        decoration: const BoxDecoration(
                          color: Color.fromARGB(255, 255, 137, 126),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(children: [
                            const Text('Outcoming',
                                style: TextStyle(
                                    fontSize: 22, color: Colors.white)),
                            Text('\$${outcoming ?? 0}',
                                style: const TextStyle(
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white)),
                          ]),
                        ),
                      )),
                  const SizedBox(width: 20),
                  Expanded(
                      flex: 4,
                      child: Container(
                        width: double.infinity,
                        height: 80,
                        decoration: const BoxDecoration(
                          color: Color.fromARGB(255, 91, 208, 152),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(10),
                          child: Column(children: [
                            const Text('Incoming',
                                style: TextStyle(
                                    fontSize: 22, color: Colors.white)),
                            Text('\$${incoming ?? 0}',
                                style: const TextStyle(
                                    fontSize: 22,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.white)),
                          ]),
                        ),
                      ))
                ]),
              )
            ]),
            // Recent Transaction List Row
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Align(
                alignment: Alignment.topLeft,
                child: Column(children: const [
                  Text('Recent transactions',
                      style:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
                ]),
              ),
            ),
            const TransactionsList(
              maxItems: 5,
              nestedList: true,
            )
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const TransactionForm()),
            );
          },
          child: const Icon(Icons.add),
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}
