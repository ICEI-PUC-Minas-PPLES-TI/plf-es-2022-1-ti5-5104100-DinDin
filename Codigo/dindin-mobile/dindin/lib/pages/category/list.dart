import 'package:dindin/models/category.dart';
import 'package:dindin/pages/category/form.dart';
import 'package:dindin/widgets/category_list.dart';

import 'package:flutter/material.dart';

class ListCategories extends StatefulWidget {
  const ListCategories({Key? key}) : super(key: key);

  @override
  _ListCategoriesState createState() => _ListCategoriesState();
}

class _ListCategoriesState extends State<ListCategories> {
  final List<Category> _walletCategoriesOut = [
    Category(
        id: 1,
        userId: 1,
        walletId: 1,
        description: 'Food',
        type: 'OUT',
        color: 'eb5a46'),
    Category(
        id: 2,
        userId: 1,
        walletId: 1,
        description: 'Transport',
        type: 'OUT',
        color: 'ff9f1a'),
    Category(
        id: 3,
        userId: 1,
        walletId: 1,
        description: 'Studies',
        type: 'OUT',
        color: '0079bf')
  ];

  final List<Category> _walletCategoriesIn = [
    Category(
        id: 4,
        userId: 1,
        walletId: 1,
        description: 'Salary',
        type: 'IN',
        color: '61bd4f'),
    Category(
        id: 5,
        userId: 1,
        walletId: 1,
        description: 'Stocks',
        type: 'IN',
        color: 'c377e0')
  ];

  void _deleteCategoryIn(int id) {
    _deleteCategory(_walletCategoriesIn, id);
  }

  void _deleteCategoryOut(int id) {
    _deleteCategory(_walletCategoriesOut, id);
  }

  void _deleteCategory(List<Category> _walletCategories, int id) {
    Widget cancelButton = MaterialButton(
      child: const Text("Cancel"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget continueButton = MaterialButton(
      child: const Text("Yes, delete"),
      onPressed: () {
        setState(() {
          _walletCategories.removeWhere((tx) => tx.id == id);
        });
        Navigator.of(context).pop();
      },
    );
    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: const Text("Alert"),
      content: const Text(
          "By removing a category, all transactions linked to it will be unlinked, are you sure ?"),
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
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
            CategoryList(_walletCategoriesIn, _deleteCategoryIn),
            CategoryList(_walletCategoriesOut, _deleteCategoryOut)
          ]),
          floatingActionButton: FloatingActionButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => const CategoryForm(null)),
              );
            },
            child: const Icon(Icons.add),
            backgroundColor: Theme.of(context).primaryColor,
          ),
        ));
  }
}
