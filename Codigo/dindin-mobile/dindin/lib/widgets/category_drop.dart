import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/category.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DropCategory extends StatefulWidget {
  final dropValue = ValueNotifier('');
  final String walletId;
  DropCategory(this.walletId, {Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _DropCategoryState();
}

class _DropCategoryState extends State<DropCategory> {
  final dropOptionsCategories = ['Food', 'Work', 'Bar'];

  Future<List<Category>> fetchCategories() async {
    List<Category> categoryList = <Category>[];

    /*var url = ApiURL.baseUrl + "/wallet";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    var status = response.statusCode;
    if (status == 200) {
      var json = jsonDecode(response.body);
      /*json['wallets'].forEach((row) => {
        categoryList.add(Category(id: id, userId: userId, walletId: walletId, description: description, type: type, color: color)),
      });*/
    }*/

    return categoryList;
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ValueListenableBuilder(
          valueListenable: widget.dropValue,
          builder: (BuildContext context, String value, _) {
            return Row(
              children: [
                const Icon(
                  Icons.category,
                  color: Colors.green,
                  size: 25.0,
                ),
                DropdownButton<String>(
                  hint: const Text("Category", style: TextStyle(fontSize: 20)),
                  value: (value.isEmpty) ? null : value,
                  onChanged: widget.walletId == "" ? null :(option) =>
                      widget.dropValue.value = option.toString(),
                  items: dropOptionsCategories
                      .map(
                        (op) => DropdownMenuItem(
                          value: op,
                          child: Text(op),
                        ),
                      )
                      .toList(),
                ),
              ],
            );
          }),
    );
  }
}
