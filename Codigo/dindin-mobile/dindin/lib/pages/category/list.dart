import 'dart:convert';

import 'package:dindin/models/category.dart';
import 'package:dindin/pages/category/form.dart';
import 'package:dindin/widgets/category_list.dart';
import 'package:dindin/helpers/api_url.dart';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ListCategories extends StatefulWidget {
  int walletId;
  ListCategories(this.walletId,{Key? key}) : super(key: key);

  @override
  _ListCategoriesState createState() => _ListCategoriesState();
}

class _ListCategoriesState extends State<ListCategories> {
  List<Category> _walletCategoriesOut = [];

  List<Category> _walletCategoriesIn = [];

  @override
  void initState() {
    super.initState();
    getCategories();
  }

  void getCategories() async{
    List<Category> l1 = await fetchCategories('IN');
    List<Category> l2 = await fetchCategories('OUT');
    setState(() {
      _walletCategoriesIn = l1;
      _walletCategoriesOut = l2;
    });
  }

  Future<List<Category>> fetchCategories(String type) async {
    List<Category> categoryList = <Category>[];
    var url = ApiURL.baseUrl + "/category?wallet_id="+widget.walletId.toString() + '&type=' + type;
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();

    try {
      var response = await http.get(uri, headers: {'Authorization': token});
      var status = response.statusCode;
      if(status == 200) {
        var json = jsonDecode(response.body);
        json['categories'].forEach((row) => {
          categoryList.add(Category(id: num.parse(row['id'].toString()), userId: num.parse(row['user_id'].toString()), walletId: num.parse(row['wallet_id'].toString()), description: row['description'], type: type, color: row['color'] )),
          print(row)
        });

      }
    } catch (e) {
      print("deu nao");
      print(e);
    }
    return categoryList;
  }


  TabBar get _tabBar => const TabBar(
        indicatorColor: Colors.grey,
        tabs: [
          Tab(text: 'Income'),
          Tab(text: 'Outcome'),
        ],
      );

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text(
              'Categories',
            ),
            backgroundColor: Theme.of(context).primaryColor,
            bottom: PreferredSize(
                preferredSize: _tabBar.preferredSize,
                child: ColoredBox(
                  color: const Color.fromARGB(255, 255, 255, 255),
                  child: _tabBar,
                )),
          ),
          body: TabBarView(children: [
            CategoryList(_walletCategoriesIn, getCategories),
            CategoryList(_walletCategoriesOut, getCategories)
          ]),
          floatingActionButton: FloatingActionButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => CategoryForm(widget.walletId,null)),
              ).then((value) => getCategories());
            },
            child: const Icon(Icons.add),
            backgroundColor: Theme.of(context).primaryColor,
          ),
        ));
  }
}
