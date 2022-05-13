import 'package:dindin/helpers/color_helper.dart';

import 'package:dindin/models/category.dart';

import 'package:dindin/pages/category/form.dart';
import 'package:flutter/material.dart';

class CategoryList extends StatelessWidget {
  final List<Category> categories;
  final Function reloadTx;
  final ColorHelper ch = ColorHelper();

  CategoryList(this.categories, this.reloadTx, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 450,
      child: categories.isEmpty
          ? Column(
              children: const <Widget>[
                Text(
                  'No categories defined!',
                ),
              ],
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: ListView.builder(
                itemBuilder: (ctx, index) {
                  return GestureDetector(
                    onTap: () => {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                CategoryForm(int.parse(categories[index].walletId.toString()), categories[index])),
                      ).then((value) => {
                        reloadTx()
                      })
                    },
                    child: Card(
                      elevation: 5,
                      margin: const EdgeInsets.symmetric(
                        vertical: 5,
                        horizontal: 0,
                      ),
                      child: ListTile(
                        tileColor: ch.fromHex(categories[index].color!),
                        title: Text(
                          categories[index].description!,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                      ),
                    ),
                  );
                },
                itemCount: categories.length,
              ),
            ),
    );
  }
}
