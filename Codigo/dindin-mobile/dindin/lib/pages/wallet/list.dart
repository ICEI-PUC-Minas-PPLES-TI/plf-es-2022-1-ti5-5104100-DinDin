import 'package:dindin/pages/wallet/form.dart';
import 'package:dindin/pages/wallet/join.dart';
import 'package:dindin/pages/wallet/view.dart';
import 'package:dindin/models/wallet.dart';
import 'package:dindin/database/DBProvider.dart';
import 'package:dindin/helpers/api_url.dart';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class WalletList extends StatefulWidget {
  const WalletList({Key? key}) : super(key: key);

  @override
  State<WalletList> createState() => _WalletListState();
}

Future<List<Wallet>> fetchWallets() async {
  List<Wallet> walletList = <Wallet>[];

  var url = ApiURL.baseUrl + "/wallet";
  final Uri uri = Uri.parse(url);
  var token = await ApiURL.getToken();
  final dbProvider = DBProvider.instance;

  try {
    var response = await http.get(uri, headers: {'Authorization': token});
    var status = response.statusCode;
    if (status == 200) {
      // Check if has any wallet created while offline
      final prefs = await StreamingSharedPreferences.instance;
      final Preference<bool> sincroniza =
          prefs.getBool("update_wallet", defaultValue: false);
      if (sincroniza.getValue()) {
        final lines = await dbProvider.queryRaw('wallet', 'offline = 1');
        lines.forEach((line) async {
          http.post(uri, headers: {
            'Authorization': token
          }, body: {
            'description': line['description'],
            'initial_value': line['initial_value'].toString()
          });
        });
        (await prefs).setBool("update_wallet", false);
        return fetchWallets();
      }
      // Ends Verification

      var json = jsonDecode(response.body);
      dbProvider.deleteAll('wallet');
      Map<String, dynamic> row2;
      json['wallets'].forEach((row) => {
            walletList.add(Wallet(
                id: int.parse(row['id']),
                updatedAt: row['updated_at'],
                createdAt: row['created_at'],
                deletedAt: '',
                currentValue: null,
                shared: row['shared'] ? 1 : 0,
                description: row['description'])),
            if (!row['shared'])
              {
                dbProvider.insert('wallet', {
                  'description': row['description'],
                  'initial_value': row['initial_value'],
                  'id': int.parse(row['id'])
                })
              }
          });
    } else {
      walletList = await fetchWalletsOffline();
    }
  } catch (e) {
    print(e);
    walletList = await fetchWalletsOffline();
  }

  return walletList;
}

Future<List<Wallet>> fetchWalletsOffline() async {
  List<Wallet> walletList = <Wallet>[];

  final dbProvider = DBProvider.instance;

  final lines = await dbProvider.queryAllRows('wallet');
  lines.forEach((row) => {
        walletList.add(Wallet(
            id: row['id'],
            updatedAt: '',
            createdAt: '',
            deletedAt: '',
            currentValue: null,
            shared: 0,
            description: row['description'])),
      });
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
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallets'),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: const FaIcon(FontAwesomeIcons.doorOpen),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const WalletJoin()),
              ).then((value) => {
                    setState(() {
                      wallets = fetchWallets();
                    })
                  });
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
                        final Wallet w = Wallet(
                            id: snapshot.data[index].id,
                            createdAt: '',
                            deletedAt: '',
                            updatedAt: '',
                            currentValue: null,
                            shared: snapshot.data[index].shared,
                            description: snapshot.data[index].description);
                        print("Open Wallet Visualization at id: " +
                            snapshot.data[index].id.toString());
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => WalletView(w)),
                        ).then((value) => {
                              setState(() {
                                wallets = fetchWallets();
                              })
                            });
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
            MaterialPageRoute(builder: (context) => const WalletForm(null)),
          ).then((value) => {
                setState(() {
                  wallets = fetchWallets();
                })
              });
        },
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
