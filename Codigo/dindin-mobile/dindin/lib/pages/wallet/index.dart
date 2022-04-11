import 'package:dindin/pages/category/list_categories.dart';
import 'package:dindin/pages/wallet/update.dart';
import 'package:dindin/pages/wallet/create.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:dindin/pages/wallet/model.dart';

class WalletList extends StatefulWidget {
  const WalletList({Key? key}) : super(key: key);

  @override
  State<WalletList> createState() => _WalletListState();
}

Future<List<Wallet>> fetchWallets() async {
  List<Wallet> walletList = <Wallet>[];

  final String response = await rootBundle.loadString('assets/wallets.json');
  final walletsJson = jsonDecode(response)['wallets'];
  for (var wallet in walletsJson) {
    walletList.add(Wallet.fromJson(wallet));
  }
  return walletList;
}

class _WalletListState extends State<WalletList> {
  late Future<List<Wallet>> wallets;

  @override
  void initState() {
    super.initState();
    wallets = fetchWallets();
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet'),
        backgroundColor: primaryColor,
        actions: [
          IconButton(
            icon: const FaIcon(FontAwesomeIcons.tag),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ListCategories()),
              );
            },
          ),
          // add more IconButton
        ],
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchWallets(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: InkWell(
                      onTap: () {
                        print("Open Wallet Visualization at id: " +
                            snapshot.data[index].id.toString());
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const WalletUpdate()),
                        );
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: ListTile(
                          leading: const Padding(
                            padding: EdgeInsets.only(top: 5.0),
                            child: FaIcon(FontAwesomeIcons.wallet,
                                size: 20.0, color: Colors.black),
                          ),
                          title: Text((snapshot.data[index].description)),
                        ),
                      ),
                    ),
                  );
                });
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print("Create a new Wallet");
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const WalletCreate()),
          );
        },
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
