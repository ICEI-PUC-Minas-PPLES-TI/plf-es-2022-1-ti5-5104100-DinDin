import 'package:flutter/material.dart';

class DropCategory extends StatefulWidget {
  final dropValue = ValueNotifier('');
  DropCategory({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _DropCategoryState();
}

class _DropCategoryState extends State<DropCategory> {
  final dropOptionsCategories = ['Food', 'Work', 'Bar'];
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
                  onChanged: (option) =>
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
