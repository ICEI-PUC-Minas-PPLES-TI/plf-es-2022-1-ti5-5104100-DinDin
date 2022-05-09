import 'package:dindin/pages/wallet/form.dart';
import 'package:dindin/pages/wallet/join.dart';
import 'package:dindin/pages/wallet/view.dart';
import 'package:dindin/models/wallet.dart';
import 'package:dindin/database/DBProvider.dart';
import 'package:dindin/helpers/api_url.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class WalletList extends StatefulWidget {
  const WalletList({Key? key}) : super(key: key);

  @override
  State<WalletList> createState() => _WalletListState();
}

Future<List<Wallet>> fetchWallets() async {
  List<Wallet> walletList = <Wallet>[];
  final dbProvider = DBProvider.instance;

  final todasLinhas = await dbProvider.queryAllRows('wallet');
  print('Consulta todas as linhas:');
  todasLinhas.forEach((row) => {
    walletList.add(Wallet(id: row['id'], updatedAt: '', createdAt: '', deletedAt: '', currentValue: null, shared: 0, description: row['description'])),
    print(row)
  });


  var url = ApiURL.baseUrl + "/wallet";
  ApiURL.getToken().then((value) => {
    print('token' + value),
  });
  /*

  var response =
      await http.get(uri, body: {'email': email, 'password': password});
  var status = response.statusCode;
  if (status == 200) {
    var json = jsonDecode(response.body);
    return true;
  }
  return false;*/

  /*final String response =
      await rootBundle.loadString('assets/data/wallets.json');
  final walletsJson = jsonDecode(response)['wallets'];
  for (var wallet in walletsJson) {
    walletList.add(Wallet.fromJson(wallet));
  }*/
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
        title: const Text('Wallet'),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: const FaIcon(FontAwesomeIcons.doorOpen),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const WalletJoin()),
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
                        final Wallet w = Wallet(id: snapshot.data[index].id, createdAt: '', deletedAt: '', updatedAt: '', currentValue: null, shared: snapshot.data[index].shared, description: snapshot.data[index].description);
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
