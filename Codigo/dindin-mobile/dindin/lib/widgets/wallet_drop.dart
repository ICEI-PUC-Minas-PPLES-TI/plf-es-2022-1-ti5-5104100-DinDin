import 'package:flutter/material.dart';

class DropWallet extends StatefulWidget {
  final dropValue = ValueNotifier('');
  @override
  _DropWalletState createState() => _DropWalletState();
}

class _DropWalletState extends State<DropWallet> {
  @override
  Widget build(BuildContext context) {
    final dropOptionsWallets = ['Family', 'Home', 'Store'];
    return Center(
      child: ValueListenableBuilder(
          valueListenable: widget.dropValue,
          builder: (BuildContext context, String value, _) {
            return Row(
              children: [
                const Icon(
                  Icons.account_balance_wallet,
                  color: Colors.green,
                  size: 25.0,
                ),
                DropdownButton<String>(
                  hint: const Text("Wallet", style: TextStyle(fontSize: 20)),
                  value: (value.isEmpty) ? null : value,
                  onChanged: (option) =>
                      widget.dropValue.value = option.toString(),
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
