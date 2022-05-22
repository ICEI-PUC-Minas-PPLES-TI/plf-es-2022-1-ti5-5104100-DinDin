import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/category.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class DropCategory extends StatefulWidget {
  final Function changeCategoryDrop;

  const DropCategory(this.changeCategoryDrop, {Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => DropCategoryState();
}

class DropCategoryState extends State<DropCategory> {
  List<Category> categories = [];
  final dropValue = ValueNotifier('');
  var walletId = "";

  void setWallet(String type, wallet) async {
    if (wallet == null) {
      setState(() {
        dropValue.value = "";
        categories = [];
        walletId = "";
      });
      return;
    }

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
                        icon: const Visibility(
                            visible: false, child: Icon(Icons.arrow_downward)),
                        isExpanded: true,
                        hint: const Text("Category",
                            style: TextStyle(fontSize: 20)),
                        value: (value.isEmpty) ? null : int.parse(value),
                        items: categories
                            .map(
                              (op) => DropdownMenuItem(
                                value: int.parse(op.id.toString()),
                                child: Text(op.description!,
                                    style: const TextStyle(fontSize: 20)),
                              ),
                            )
                            .toList(),
                        onChanged: (option) {
                          setState(() {
                            dropValue.value = "";
                            widget.changeCategoryDrop("");
                          });
                          setState(() {
                            dropValue.value = option.toString();
                            widget.changeCategoryDrop(option.toString());
                          });
                        },
                      ),
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 6, 0),
                  child: FaIcon(FontAwesomeIcons.list,
                      size: 30.0, color: Color.fromRGBO(96, 212, 156, 1)),
                ),
              ],
            );
          }),
    );
  }
}
