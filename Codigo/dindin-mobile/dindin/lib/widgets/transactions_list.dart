import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/helpers/color_helper.dart';
import 'package:dindin/models/transaction.dart';
import 'package:dindin/widgets/lazy_list_builder.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class TransactionsList extends StatelessWidget {
  final int? maxItems;
  const TransactionsList({Key? key, this.maxItems}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LazyListBuilder<Transaction>(
        fetch: fetchTransaction,
        maxItems: maxItems,
        itemBuilder: (BuildContext context, transaction, index) {
          return Card(
            child: InkWell(
              onTap: () {
                print("Open Transaction Visualization at id: " +
                    transaction.id.toString());
              },
              child: Padding(
                padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: ColorHelper()
                          .fromHex(transaction.category?.color ?? "040404"),
                      child: const FaIcon(
                        FontAwesomeIcons.cartShopping,
                        size: 20.0,
                        color: Colors.white,
                      ),
                    ),
                    title: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text((transaction.description),
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold)),
                            Text(
                              DateFormat.yMEd().add_jms().format(
                                  DateTime.parse(transaction.createdAt)),
                              style: const TextStyle(fontSize: 12),
                            )
                          ],
                        ),
                        Text('\$' + formatMoney.format(transaction.value.abs()),
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 10,
                                color: transaction.value < 0
                                    ? Colors.red
                                    : Colors.black)),
                      ],
                    )),
              ),
            ),
          );
        });
  }
}

final formatMoney = NumberFormat("#,##0.00", "en_US");

Future<List<Transaction>> fetchTransaction(int page) async {
  List<Transaction> extract = <Transaction>[];
  http.Response response;

  response = await ApiURL.get('/transaction?page=$page&limit=5');

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
