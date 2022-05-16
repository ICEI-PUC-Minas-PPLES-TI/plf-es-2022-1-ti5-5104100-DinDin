import 'package:dindin/pages/goal/list.dart';
import 'package:dindin/pages/profile/edit.dart';
import 'package:dindin/pages/transactions/form.dart';
import 'package:dindin/pages/transactions/list.dart';
import 'package:dindin/pages/wallet/list.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({Key? key}) : super(key: key);

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
                  child: Column(children: const [
                    Center(
                      child: FaIcon(
                        FontAwesomeIcons.circleUser,
                        size: 30.0,
                        color: Colors.black,
                      ),
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
            FutureBuilder<List<dynamic>>(
              future: fetchTransaction(),
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                if (snapshot.hasData) {
                  return Expanded(
                    child: Column(
                      children: [
                        ListView.builder(
                            key: const Key("keyListBuilderTransactions"),
                            shrinkWrap: true,
                            padding: const EdgeInsets.all(8),
                            itemCount: snapshot.data?.length,
                            itemBuilder: (BuildContext context, int index) {
                              return Card(
                                child: InkWell(
                                  onTap: () {
                                    print(
                                        "Open Transaction Visualization at id: " +
                                            snapshot.data[index].id.toString());
                                  },
                                  child: Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, bottom: 8.0),
                                    child: ListTile(
                                        leading: CircleAvatar(
                                          backgroundColor: fromHex(snapshot
                                              .data[index].categoryColor),
                                          child: const FaIcon(
                                            FontAwesomeIcons.cartShopping,
                                            size: 20.0,
                                            color: Colors.white,
                                          ),
                                        ),
                                        title: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                Text(
                                                    (snapshot.data[index]
                                                        .description),
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold)),
                                                Text(
                                                  DateFormat.yMEd()
                                                      .add_jms()
                                                      .format(DateTime.parse(
                                                          snapshot.data[index]
                                                              .createdAt)),
                                                  style: const TextStyle(
                                                      fontSize: 12),
                                                )
                                              ],
                                            ),
                                            Text(
                                                '\$' +
                                                    formatMoney.format(snapshot
                                                        .data[index].value
                                                        .abs()),
                                                style: TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 10,
                                                    color: snapshot.data[index]
                                                                .value <
                                                            0
                                                        ? Colors.red
                                                        : Colors.black)),
                                          ],
                                        )),
                                  ),
                                ),
                              );
                            }),
                      ],
                    ),
                  );
                } else {
                  return const Center(child: CircularProgressIndicator());
                }
              },
            ),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => const TransactionForm()),
            );
          },
          child: const Icon(Icons.add),
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}
