import 'package:flutter/material.dart';

import './goal/index.dart';
import './category/list_categories.dart';
import './wallet/index.dart';
import './profile/index.dart';
import './transaction.dart';

import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text('Dashboard'),
            backgroundColor: Theme.of(context).primaryColor),
        body: Column(
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
                  child: Column(children: const [
                    FaIcon(
                      FontAwesomeIcons.circleUser,
                      size: 30.0,
                      color: Colors.black,
                    ),
                    SizedBox(height: 20),
                    Text(
                      'Lucas Vinicius',
                      style:
                          TextStyle(fontSize: 27, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 20),
                    Text('Current Wallet: Wallet X')
                  ]),
                ),
              ),
            ),
            // Buttons Row
            Row(
              children: [
                // Transaction Button
                Expanded(
                    child: Column(children: [
                      CircleAvatar(
                        radius: 30,
                        backgroundColor: Colors.grey.shade100,
                        child: IconButton(
                          alignment: Alignment.topRight,
                          icon: const FaIcon(
                            FontAwesomeIcons.arrowRightArrowLeft,
                            size: 25.0,
                            color: Colors.black,
                          ),
                          color: Colors.black,
                          onPressed: () {
                            // Respond to icon toggle
                          },
                        ),
                      ),
                      const Text('Transaction')
                    ]),
                    flex: 2),
                // Account Button
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const FaIcon(
                              FontAwesomeIcons.circleUser,
                              size: 25.0,
                              color: Colors.black,
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
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const FaIcon(
                              FontAwesomeIcons.bullseye,
                              size: 25.0,
                              color: Colors.black,
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
                // Wallets
                Expanded(
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundColor: Colors.grey.shade100,
                          child: IconButton(
                            alignment: Alignment.topRight,
                            icon: const FaIcon(
                              FontAwesomeIcons.wallet,
                              size: 25.0,
                              color: Colors.black,
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
                      children: const [
                        Text('BALANCE',
                            style: TextStyle(
                                fontSize: 20, fontWeight: FontWeight.w300)),
                        Text('\$11,000,000.05',
                            style: TextStyle(
                                fontSize: 24, fontWeight: FontWeight.w600)),
                        Text('US Dollars'),
                      ]),
                ),
              ),
            ),
            // Out/IN
            Column(children: [
              Padding(
                padding: EdgeInsets.all(10),
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
                          child: Column(children: const [
                            Text('Outcoming',
                                style: TextStyle(
                                    fontSize: 22, color: Colors.white)),
                            Text('\$100,00',
                                style: TextStyle(
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
                          child: Column(children: const [
                            Text('Incoming',
                                style: TextStyle(
                                    fontSize: 22, color: Colors.white)),
                            Text('\$22,50',
                                style: TextStyle(
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
            Column(children: const [
              Text('Recent transactions',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
              Text('WIP Widget'),
            ]),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => Transaction()),
            );
          },
          child: const Icon(Icons.add),
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}
