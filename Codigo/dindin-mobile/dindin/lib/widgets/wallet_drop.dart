import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/wallet.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class DropWallet extends StatefulWidget {
  final Function changeWalletDrop;
  final String? walletID;

  const DropWallet(this.changeWalletDrop, this.walletID, {Key? key}) : super(key: key);

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

    if(widget.walletID != null){
      dropValue.value = widget.walletID!;
    }
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
    return Center(
      child: ValueListenableBuilder(
          valueListenable: dropValue,
          builder: (BuildContext context, String value, _) {
            return Row(
              children: [
                Expanded(
                  flex: 1,
                  child: DropdownButtonHideUnderline(
                    child: ButtonTheme(
                      alignedDropdown: true,
                      child: DropdownButton<int>(
                        icon: const Visibility (visible:false, child: Icon(Icons.arrow_downward)),
                        hint: const Text("Wallet",
                            style: TextStyle(fontSize: 20)),
                        value: (value.isEmpty) ? null : int.parse(value),
                        onChanged: (option) => {
                          dropValue.value = option.toString(),
                          widget.changeWalletDrop(option.toString())
                        },
                        items: wallets
                            .map(
                              (op) => DropdownMenuItem(
                                value: int.parse(op.id.toString()),
                                child: Text(op.description!,
                                    style: const TextStyle(fontSize: 20)),
                              ),
                            )
                            .toList(),
                      ),
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.fromLTRB(0,0,4,0),
                  child: FaIcon(FontAwesomeIcons.wallet,
                                  size: 30.0, color: Color.fromRGBO(96, 212, 156, 1)),
                ),
              ],
            );
          }),
    );
  }
}
