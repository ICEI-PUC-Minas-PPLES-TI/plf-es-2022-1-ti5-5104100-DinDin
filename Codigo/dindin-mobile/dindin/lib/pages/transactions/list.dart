import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/pages/transactions/form.dart';
import 'package:dindin/models/transaction.dart';
import 'package:dindin/widgets/lazy_list_builder.dart';
import 'package:dindin/widgets/transactions_list.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';

final formatMoney = NumberFormat("#,##0.00", "en_US");

class Extract extends StatefulWidget {
  const Extract({Key? key}) : super(key: key);

  @override
  State<Extract> createState() => _ExtractState();
}

Future<List<Transaction>> fetchTransaction(int page) async {
  List<Transaction> extract = <Transaction>[];
  http.Response response;

  try {
    response = await ApiURL.get('/transaction?page=$page');
  } catch (e) {
    final String response =
        await rootBundle.loadString('assets/data/transactions.json');
    final extractJson = jsonDecode(response)['transactions'];
    for (var transaction in extractJson) {
      extract.add(Transaction.fromJson(transaction));
    }
    return extract;
  }

  if (response.statusCode == 200) {
    final extractJson = jsonDecode(response.body)['transactions'];
    for (var transaction in extractJson) {
      extract.add(Transaction.fromJson(transaction));
    }
    return extract;
  } else {
    throw Exception('Failed to load goals');
  }
}

class _ExtractState extends State<Extract> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Transactions'),
          backgroundColor: Theme.of(context).primaryColor,
        ),
        body: ListView(
          children: [
            Card(
              key: const Key("keyBoxCurrentBalance"),
              elevation: 5,
              color: fromHex("F5F6FA"),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  const SizedBox(
                    height: 40,
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(10.0),
                    child: const Center(
                        child: Text('Your Balance',
                            style: TextStyle(
                              fontSize: 24,
                            ))),
                  ),
                  FutureBuilder(
                      future: getUserExtract(),
                      builder: ((context, snapshot) {
                        if (snapshot.connectionState != ConnectionState.waiting) {
                          return Padding(
                            padding:
                                const EdgeInsets.fromLTRB(0, 10.0, 0, 25.0),
                            child: Text(
                              '\$' +
                                  formatMoney.format(snapshot.data ?? 0).toString(),
                              style: const TextStyle(
                                  fontWeight: FontWeight.w700, fontSize: 42),
                            ),
                          );
                        } else {
                          return const CircularProgressIndicator();
                        }
                      }))
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(left: 12.0, top: 10),
              child: Text(
                'Recent transactions',
                maxLines: 20,
                style: TextStyle(
                    fontSize: 30.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.black),
              ),
            ),
            const TransactionsList(
              nestedList: true,
            )
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const TransactionForm(null)),
            );
          },
          child: const Icon(Icons.add),
          backgroundColor: Theme.of(context).primaryColor,
        ));
  }
}

Future getUserExtract() async {
  final response = await ApiURL.get("/report/usertotal");
  int total = jsonDecode(response.body)["total"];

  return total;
}

Color fromHex(String hexString) {
  final buffer = StringBuffer();
  if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
  buffer.write(hexString.replaceFirst('#', ''));
  return Color(int.parse(buffer.toString(), radix: 16));
}
