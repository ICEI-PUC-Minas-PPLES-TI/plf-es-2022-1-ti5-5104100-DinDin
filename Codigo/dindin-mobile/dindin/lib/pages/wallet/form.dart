import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'dart:io';
import 'dart:convert';
import 'package:dindin/pages/wallet/view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:dindin/models/wallet.dart';
import 'package:http/http.dart' as http;
import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/database/DBProvider.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

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
  bool showEditDeleteBtn = false;

  @override
  void initState() {
    if (widget.wallet != null) {
      // Edit
      _descriptionController.text = widget.wallet!.description!;
      checkInternet();
    }
    super.initState();
  }

  void checkInternet() async {
    try {
      final result = await InternetAddress.lookup('example.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
        setState(() {
          showEditDeleteBtn = true;
        });
      }
    } on SocketException catch (_) {
      // Not Connected to Internet
      final dbProvider = DBProvider.instance;
      final wallet =
          await dbProvider.queryId('wallet', widget.wallet!.id.toString());
      if (wallet[0]['offline'] == 1) {
        setState(() {
          showEditDeleteBtn = true;
        });
      }
    }
  }

  void createWallet() async {
    var url = ApiURL.baseUrl + "/wallet";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    final dbProvider = DBProvider.instance;

    try {
      var response = await http.post(uri, headers: {
        'Authorization': token
      }, body: {
        'description': _descriptionController.text,
        'initial_value': currencyFormat(_startingController.text).toString()
      });
      var status = response.statusCode;
      if (status == 201) {
        var json = jsonDecode(response.body);
        Navigator.of(context).pop();
      } else {
        print(response.body);
      }
    } catch (e) {
      Map<String, dynamic> row = {
        'description': _descriptionController.text,
        'initial_value': currencyFormat(_startingController.text).toString(),
        'offline': 1
      };
      final id = await dbProvider.insert('wallet', row);
      print('linha inserida id: $id');
      var prefs = StreamingSharedPreferences.instance;
      (await prefs).setBool("update_wallet", true);

      Navigator.of(context).pop();
    }
  }

  void updateWallet() async {
    var url = ApiURL.baseUrl + "/wallet/" + widget.wallet!.id.toString();
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    final dbProvider = DBProvider.instance;

    try {
      var response = await http.put(uri,
          headers: {'Authorization': token},
          body: {'description': _descriptionController.text});
      var status = response.statusCode;
      if (status == 200) {
        var json = jsonDecode(response.body);
        Wallet newWallet = Wallet(
            id: widget.wallet!.id,
            shared: widget.wallet!.shared,
            deletedAt: widget.wallet!.deletedAt,
            description: _descriptionController.text,
            createdAt: widget.wallet!.createdAt,
            updatedAt: widget.wallet!.updatedAt,
            currentValue: widget.wallet!.currentValue);
        Navigator.of(context).pop(newWallet);
      } else {
        print(response.body);
      }
    } catch (e) {
      if (showEditDeleteBtn) {
        Map<String, dynamic> row = {
          'id': widget.wallet?.id,
          'description': _descriptionController.text
        };
        await dbProvider.update('wallet', row);
        Wallet newWallet = Wallet(
            id: widget.wallet!.id,
            shared: widget.wallet!.shared,
            deletedAt: widget.wallet!.deletedAt,
            description: _descriptionController.text,
            createdAt: widget.wallet!.createdAt,
            updatedAt: widget.wallet!.updatedAt,
            currentValue: widget.wallet!.currentValue);
        Navigator.of(context).pop(newWallet);
      }
    }
  }

  void deleteWallet() async {
    var url = ApiURL.baseUrl + "/wallet/" + widget.wallet!.id.toString();
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    final dbProvider = DBProvider.instance;

    try {
      var response = await http.delete(uri, headers: {'Authorization': token});
      var status = response.statusCode;
      if (status == 204) {
        Navigator.of(context).pop();
        Navigator.of(context).pop('CLOSE');
      } else {
        print(response.body);
      }
    } catch (e) {
      if (showEditDeleteBtn) {
        dbProvider.delete('wallet', widget.wallet!.id.toInt());
        Navigator.of(context).pop();
        Navigator.of(context).pop('CLOSE');
      }
    }
  }

  num currencyFormat(var value) {
    var firstnum = 0;
    for (var a = 0; a < value.length; a++) {
      if (_isNumeric(value.substring(a, a + 1))) {
        firstnum = a;
        a = value.length;
      }
    }
    String removedot = value.replaceAll(".", "");
    String chageforcomma = removedot.replaceAll(",", ".");
    double resp = double.parse(chageforcomma.substring(firstnum));
    return resp;
  }

  bool _isNumeric(String str) {
    // ignore: unnecessary_null_comparison
    if (str == null) {
      return false;
    }
    return double.tryParse(str) != null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text(
              widget.wallet != null ? 'Update Wallet' : 'Create Wallet',
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
                          )
                        ],
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
                          if (widget.wallet == null) {
                            createWallet();
                          } else {
                            if (showEditDeleteBtn) {
                              updateWallet();
                            }
                          }
                        },
                      ),
                    ),
                    const SizedBox(height: 20),
                    if (widget.wallet != null && !showEditDeleteBtn)
                      const Text(
                        'You can\'t edit a cloud saved wallet while offline!',
                        style: TextStyle(color: Colors.red),
                      ),
                    if (widget.wallet != null && showEditDeleteBtn)
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
                                    deleteWallet();
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
