import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';

class WalletCreate extends StatefulWidget {
  const WalletCreate({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() {
    return _WalletCreateState();
  }
}

class _WalletCreateState extends State<WalletCreate> {
  bool _isShared = false;
  final description = TextEditingController();
  final startingAmount = TextEditingController();
  final inviteCode = TextEditingController();

  void changeButtonState() {
    setState(() {
      _isShared = !_isShared;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text(
              'Create Wallet',
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
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.1,
                          width: MediaQuery.of(context).size.width * 0.4,
                          child: ElevatedButton(
                            onPressed: () {
                              changeButtonState();
                            },
                            style: _isShared
                                ? ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                    Colors.grey,
                                  ))
                                : ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                            Theme.of(context).primaryColor),
                                  ),
                            child: const Text(
                              "Create new",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.1,
                          width: MediaQuery.of(context).size.width * 0.4,
                          child: ElevatedButton(
                              onPressed: () {
                                changeButtonState();
                              },
                              style: _isShared
                                  ? ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Theme.of(context).primaryColor),
                                    )
                                  : ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.grey),
                                    ),
                              child: const Text("Join",
                                  style: TextStyle(fontSize: 20))),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    //only visible if shared
                    if (_isShared)
                      const Text('Wallet invite code',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                    if (_isShared)
                      TextField(
                        controller: inviteCode,
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'ex: AAA323#',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      ),
                    if (_isShared) const SizedBox(height: 20),
                    // Description field
                    if (!_isShared)
                      const Text('Description',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                    if (!_isShared)
                      TextField(
                        controller: description,
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'ex: Money under the mattress',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      ),
                    // End description dield
                    if (!_isShared) const SizedBox(height: 20),
                    // Numeric input Starting Amount
                    if (!_isShared)
                      const Text('Starting Amount',
                          style: TextStyle(fontWeight: FontWeight.bold)),
                    if (!_isShared)
                      TextField(
                        controller: startingAmount,
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
                    if (!_isShared) const SizedBox(height: 20),
                    SizedBox(
                      height: 40,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Save"),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: () {
                          if(_isShared){
                            print("Joining wallet");
                            print(inviteCode.text);
                          }else{
                            print("Creating new wallet");
                            print(description.text);
                            print(startingAmount.text);
                          }
                        },
                      ),
                    )
                    // End wallet list
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}
