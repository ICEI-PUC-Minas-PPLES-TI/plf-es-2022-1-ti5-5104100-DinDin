
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:dindin/pages/wallet/list.dart';
import 'dart:convert';
import 'package:dindin/pages/wallet/view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:dindin/models/wallet.dart';

import 'package:dindin/database/DBProvider.dart';

class WalletForm extends StatefulWidget {
  final Wallet? wallet;

  const WalletForm(this.wallet, {Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _WalletFormState();
  }
}

class _WalletFormState extends State<WalletForm> {

  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _startingController = TextEditingController();

  @override
  void initState() {
    if (widget.wallet != null) {
      // Edit
      _descriptionController.text = widget.wallet!.description!;
    } else {
      //Create
    }
    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text(
              widget.wallet != null ? 'Update Wallet': 'Create Wallet',
            ),
            backgroundColor: Theme.of(context).primaryColor),
        body: Form(
          child: Scrollbar(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Description field
                    const Text('Description',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    TextField(
                      controller: _descriptionController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'Insert a Wallet description',
                          suffixIcon:
                              Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                    ),
                    const SizedBox(height: 20),
                    if (widget.wallet == null)
                    const Text('Starting Amount',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    if (widget.wallet == null)
                      TextField(
                        controller: _startingController,
                        keyboardType: TextInputType.number,
                        inputFormatters: <TextInputFormatter>[
                                  CurrencyTextInputFormatter(
                                    locale: 'pt_BR',
                                    decimalDigits: 2,
                                  )],
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'ex: 9999,99',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      ),
                    // End description field
                    const SizedBox(height: 20),
                    SizedBox(
                      height: 40,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Save"),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: () async {
                          final dbProvider = DBProvider.instance;
                          if(widget.wallet == null) {

                            Map<String, dynamic> row = {
                              'description' : _descriptionController.text
                            };
                            final id = await dbProvider.insert('wallet',row);
                            print('linha inserida id: $id');
                            Navigator.of(context).pop();

                          } else {
                            Map<String, dynamic> row = {
                              'id': widget.wallet?.id,
                              'description' : _descriptionController.text
                            };
                            await dbProvider.update('wallet',row);

                            Wallet newWallet = Wallet(id: widget.wallet!.id, shared: widget.wallet!.shared, deletedAt: widget.wallet!.deletedAt, description: _descriptionController.text, createdAt: widget.wallet!.createdAt, updatedAt: widget.wallet!.updatedAt, currentValue: widget.wallet!.currentValue);

                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => WalletView(newWallet)),
                            );
                          }


                        },
                      ),
                    ),
                    const SizedBox(height: 20),
                    if (widget.wallet != null)
                    Center(
                      child: TextButton(
                        onPressed: () => showDialog<String>(
                          context: context,
                          builder: (BuildContext context) => AlertDialog(
                            title: const Padding(
                              padding: EdgeInsets.only(left: 90.0),
                              child: FaIcon(FontAwesomeIcons.trash,
                                  size: 50.0, color: Colors.red),
                            ),
                            content: const Text(
                              "Delete ?",
                              textAlign: TextAlign.center,
                            ),
                            actions: <Widget>[
                              TextButton(
                                onPressed: () => Navigator.pop(context, 'OK'),
                                child: const Text('No',
                                    style: TextStyle(color: Colors.black)),
                                style: ElevatedButton.styleFrom(
                                  primary: Theme.of(context).canvasColor,
                                ),
                              ),
                              TextButton(
                              onPressed: () async {
                                  final dbProvider = DBProvider.instance;
                                  dbProvider.delete('wallet', widget.wallet!.id.toInt());
                                  Navigator.of(context).pop('CLOSE');
                                  Navigator.of(context).pop('CLOSE');
                                },
                                child: const Text('Yes',
                                    style: TextStyle(color: Colors.black)),
                                style: ElevatedButton.styleFrom(
                                  primary: Theme.of(context).canvasColor,
                                ),
                              ),
                            ],
                            actionsAlignment: MainAxisAlignment.spaceAround,
                            actionsPadding: const EdgeInsets.all(16.0),
                          ),
                        ),
                        child: const Text(
                          'Delete Wallet',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}
