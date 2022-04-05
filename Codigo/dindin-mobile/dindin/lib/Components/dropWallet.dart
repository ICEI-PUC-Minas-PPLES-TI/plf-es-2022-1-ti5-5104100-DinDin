import 'package:flutter/material.dart';

class DropWallet extends StatelessWidget {
  final dropValue = ValueNotifier('');
    final dropOptionsWallets = ['Family', 'Home', 'Store'];
  DropWallet({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ValueListenableBuilder(
          valueListenable: dropValue,
          builder: (BuildContext context, String value, _) {
            return Row(
              children: [
                DropdownButton<String>(
                  hint: const Text("Select Wallet",
                        style: TextStyle(fontSize: 20)),
                  value: (value.isEmpty) ? null : value,
                  onChanged: (option) => dropValue.value = option.toString(),
                  items: dropOptionsWallets
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
