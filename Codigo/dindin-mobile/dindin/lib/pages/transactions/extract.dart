import 'package:dindin/pages/transactions/model.dart';
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

Future<List<Transaction>> fetchTransaction() async {
  List<Transaction> extract = <Transaction>[];
  http.Response response;

  try {
    response = await http.get(Uri.parse(
        'http://localhost:3001/api/extract?page=1&limit=5&attribute=id&order=ASC'));
  } catch (e) {
    final String response = await rootBundle.loadString('/transactions.json');
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
  late Future<List<Transaction>> extract;

  @override
  void initState() {
    super.initState();
    extract = fetchTransaction();
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transactions'),
        backgroundColor: primaryColor,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchTransaction(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView(
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
                      Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            IconButton(
                              alignment: Alignment.topRight,
                              icon: const FaIcon(
                                FontAwesomeIcons.arrowLeft,
                                size: 30.0,
                                color: Colors.black,
                              ),
                              color: Colors.black,
                              onPressed: () {
                                print("go back to menu screen");
                              },
                            ),
                          ],
                        ),
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
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10.0, 0, 25.0),
                        child: Text(
                          '\$' + formatMoney.format(1372.50).toString(),
                          style: const TextStyle(
                              fontWeight: FontWeight.w700, fontSize: 42),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.fromLTRB(0, 0, 0, 60.0),
                        child: Text(
                          "See bank details",
                          style: TextStyle(
                              fontWeight: FontWeight.w700, color: Colors.green),
                        ),
                      ),
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
                ListView.builder(
                    key: const Key("keyListBuilderTransactions"),
                    shrinkWrap: true,
                    padding: const EdgeInsets.all(8),
                    itemCount: snapshot.data?.length,
                    itemBuilder: (BuildContext context, int index) {
                      return Card(
                        child: InkWell(
                          onTap: () {
                            print("Open Transaction Visualization at id: " +
                                snapshot.data[index].id.toString());
                          },
                          child: Padding(
                            padding:
                                const EdgeInsets.only(top: 8.0, bottom: 8.0),
                            child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: fromHex(
                                      snapshot.data[index].categoryColor),
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
                                        Text((snapshot.data[index].description),
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold)),
                                        Text(
                                          DateFormat.yMMMMd().add_jms().format(
                                              DateTime.parse(snapshot
                                                  .data[index].createdAt)),
                                          style: const TextStyle(fontSize: 12),
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
                                            fontSize: 14,
                                            color:
                                                snapshot.data[index].value < 0
                                                    ? Colors.red
                                                    : Colors.black)),
                                  ],
                                )),
                          ),
                        ),
                      );
                    }),
              ],
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      // floatingActionButton: FloatingActionButton(
      //   onPressed: () {
      //     print("Create a new Goal");
      //   },
      //   backgroundColor: primaryColor,
      //   child: const Icon(Icons.add),
      // ),
    );
  }
}

Color fromHex(String hexString) {
  final buffer = StringBuffer();
  if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
  buffer.write(hexString.replaceFirst('#', ''));
  return Color(int.parse(buffer.toString(), radix: 16));
}
