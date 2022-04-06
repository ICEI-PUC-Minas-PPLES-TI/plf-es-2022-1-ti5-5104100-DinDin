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
                const Icon(
                  Icons.account_balance_wallet,
                  color: Colors.green,
                  size: 25.0,
                ),
                DropdownButton<String>(
                  hint: const Text("Wallet", style: TextStyle(fontSize: 22)),
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
