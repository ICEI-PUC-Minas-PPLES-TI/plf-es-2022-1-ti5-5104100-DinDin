import 'package:dindin/pages/transactions/model.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

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
        'http://localhost:3001/api/goal?page=1&limit=5&attribute=id&order=ASC'));
  } catch (e) {
    final String response =
        await rootBundle.loadString('assets/transactions.json');
    final exatractJson = jsonDecode(response)['transactions'];
    for (var goal in exatractJson) {
      extract.add(Transaction.fromJson(goal));
    }
    return extract;
  }

  if (response.statusCode == 200) {
    final exatractJson = jsonDecode(response.body)['transactions'];
    for (var goal in exatractJson) {
      extract.add(Transaction.fromJson(goal));
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
        title: const Text('Goals'),
        backgroundColor: primaryColor,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchTransaction(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: InkWell(
                      onTap: () {
                        print("Open Goal Visualization at id: " +
                            snapshot.data[index].id.toString());
                      },
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: ListTile(
                          leading: const Padding(
                            padding: EdgeInsets.only(top: 5.0),
                            child: FaIcon(
                              FontAwesomeIcons.bullseye,
                              size: 30.0,
                              color: Colors.redAccent,
                            ),
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
          print("Create a new Goal");
        },
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
