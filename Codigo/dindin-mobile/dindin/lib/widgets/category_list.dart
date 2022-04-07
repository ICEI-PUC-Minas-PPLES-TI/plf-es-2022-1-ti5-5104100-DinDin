import 'package:flutter/material.dart';

import '../../helpers/color_helper.dart';
import '../models/category.dart';

class CategoryList extends StatelessWidget {
  final List<Category> categories;
  final Function deleteTx;
  final ColorHelper ch = ColorHelper();

  CategoryList(this.categories, this.deleteTx, {Key? key}) : super(key: key);


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
                return Card(
                  elevation: 5,
                  margin: const EdgeInsets.symmetric(
                    vertical: 5,
                    horizontal: 0,
                  ),
                  child: ListTile(
                    tileColor: ch.fromHex(categories[index].color),
                    title: Text(
                      categories[index].description,
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    trailing: CircleAvatar(
                      radius: 20,
                      backgroundColor: const Color.fromARGB(158, 255, 255, 255),
                      child: IconButton(
                        icon: const Icon(Icons.delete),
                        color: Theme.of(context).errorColor,
                        onPressed: () => deleteTx(categories[index].id),
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