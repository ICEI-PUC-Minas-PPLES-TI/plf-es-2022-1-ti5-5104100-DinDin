import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/category.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DropCategory extends StatefulWidget {
  final dropValue = ValueNotifier('');
  final Function changeCategoryDrop;

  DropCategory(this.changeCategoryDrop, {Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => DropCategoryState();
}

class DropCategoryState extends State<DropCategory> {
  final dropOptionsCategories = ['Food', 'Work', 'Bar'];
  List<Category> categories = [];
  var walletId = "";

  void setWallet(String type, wallet) async {
    walletId = wallet;
    List<Category> l1 = await fetchCategories(type);
    setState(() {
      categories = l1;
    });
  }

  Future<List<Category>> fetchCategories(String type) async {
    List<Category> categoryList = <Category>[];

    var url = ApiURL.baseUrl + "/wallet/" + walletId + "/category?type=" + type;
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    var status = response.statusCode;
    if (status == 200) {
      var json = jsonDecode(response.body);
      print(json);
      json['categories'].forEach((row) => {
            categoryList.add(Category(
                id: int.parse(row['id'].toString()),
                userId: int.parse(row['user_id'].toString()),
                walletId: int.parse(row['wallet_id'].toString()),
                description: row['description'],
                type: row['type'],
                color: row['color'])),
          });
    } else {
      print(response.body);
    }

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
                Expanded(
                  flex: 1,
                  child: DropdownButtonHideUnderline(
                    child: ButtonTheme(
                      alignedDropdown: true,
                      child: DropdownButton<int>(
                        icon: const Visibility (visible:false, child: Icon(Icons.arrow_downward)),
                        isExpanded: true,
                        hint: const Text("Category",
                            style: TextStyle(fontSize: 20)),
                        value: (value.isEmpty) ? null : int.parse(value),
                        onChanged: walletId == ""
                            ? null
                            : (option) => {
                                  widget.dropValue.value = option.toString(),
                                  widget.changeCategoryDrop(option.toString())
                                },
                        items: categories
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
                const Icon(
                  Icons.category,
                  color: Color.fromRGBO(96, 212, 156, 1),
                  size: 40.0,
                )
              ],
            );
          }),
    );
  }
}
