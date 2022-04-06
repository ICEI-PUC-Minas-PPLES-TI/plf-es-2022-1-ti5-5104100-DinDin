import 'package:flutter/material.dart';

class DropCategory extends StatelessWidget {
  final dropValue = ValueNotifier('');
  final dropOptionsCategories = ['Food', 'Work', 'Bar'];
  DropCategory({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ValueListenableBuilder(
          valueListenable: dropValue,
          builder: (BuildContext context, String value, _) {
            return Row(
              children: [
                const Icon(
                  Icons.category,
                  color: Colors.green,
                  size: 25.0,
                ),
                DropdownButton<String>(
                  hint: const Text("Category", style: TextStyle(fontSize: 22)),
                  value: (value.isEmpty) ? null : value,
                  onChanged: (option) => dropValue.value = option.toString(),
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
