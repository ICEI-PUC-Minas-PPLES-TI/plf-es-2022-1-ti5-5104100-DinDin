import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/wallet.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class DropWallet extends StatefulWidget {
  final Function changeWalletDrop;

  const DropWallet(this.changeWalletDrop, {Key? key}) : super(key: key);

  @override
  _DropWalletState createState() => _DropWalletState();
}

class _DropWalletState extends State<DropWallet> {
  List<Wallet> wallets = [];
  final dropValue = ValueNotifier('');

  @override
  void initState() {
    super.initState();
    getWallets();
  }

  void getWallets() async {
    List<Wallet> l1 = await fetchWallets();
    setState(() {
      wallets = l1;
    });
  }

  Future<List<Wallet>> fetchWallets() async {
    List<Wallet> walletList = <Wallet>[];

    var url = ApiURL.baseUrl + "/wallet";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    var status = response.statusCode;
    if (status == 200) {
      var json = jsonDecode(response.body);
      json['wallets'].forEach((row) => {
            walletList.add(Wallet(
                id: int.parse(row['id']),
                updatedAt: row['updated_at'],
                createdAt: row['created_at'],
                deletedAt: '',
                currentValue: null,
                shared: row['shared'] ? 1 : 0,
                description: row['description'])),
          });
    }

    return walletList;
  }

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('Wallet', style: TextStyle(fontWeight: FontWeight.bold)),
      ValueListenableBuilder(
          valueListenable: dropValue,
          builder: (BuildContext context, String value, _) {
            return DropdownButtonFormField(
                value: (value.isEmpty) ? null : int.parse(value),
                icon: const Visibility(
                    visible: false, child: Icon(Icons.arrow_downward)),
                decoration: const InputDecoration(
                    hintText: 'ex: Personal',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(FontAwesomeIcons.wallet, size: 20.0)),
                items: wallets
                    .map(
                      (op) => DropdownMenuItem(
                        value: int.parse(op.id.toString()),
                        child: Text(op.description!,
                            style: const TextStyle(fontSize: 16)),
                      ),
                    )
                    .toList(),
                onChanged: (option) => {
                      dropValue.value = option.toString(),
                      widget.changeWalletDrop(option.toString())
                    });
          }),
    ]);
  }
}
