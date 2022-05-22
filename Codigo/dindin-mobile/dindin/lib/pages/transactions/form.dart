import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/widgets/category_drop.dart';
import 'package:dindin/widgets/wallet_drop.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class TransactionForm extends StatefulWidget {
  const TransactionForm({Key? key}) : super(key: key);

  @override
  _TransactionFormState createState() => _TransactionFormState();
}

class _TransactionFormState extends State<TransactionForm> {
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();
  final TextEditingController _endDateController = TextEditingController();
  final GlobalKey<DropCategoryState> _key = GlobalKey();

  bool _isChecked = false;
  DateTime date = DateTime.now();
  DateTime? endDate;
  bool _isIncome = true;
  String? category;
  String wallet = "";
  double amount = 0;
  String recurrency = "D";
  double buttonHeight = 0.06;
  double buttonWidth = 0.45;

  void changeButtonState() {
    setState(() {
      _isIncome = !_isIncome;
    });
    category = null;
    changeWalletId(wallet);
  }

  void changeWalletId(String id) {
    setState(() {
      wallet = id;
    });
    _key.currentState!.setWallet(_isIncome ? "IN" : "OUT", id);
  }

  void changeCategoryId(String id) {
    category = id;
    print(id);
  }

  void insertTransaction() async {
    if (_descriptionController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Missing Description"),
      ));
      return;
    } else if (_amountController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Missing Amount"),
      ));
      return;
    } else if (_dateController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Missing Date"),
      ));
      return;
    } else if (wallet.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text("Missing Wallet"),
      ));
      return;
    }

    var url = ApiURL.baseUrl + "/wallet/" + wallet + "/transaction";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();

    var body = {
      'description': _descriptionController.text,
      'value': _amountController.text.replaceAll(new RegExp(r"\D"), ""),
      'date': '${date.year}-${date.month}-${date.day}',
    };

    if (category?.isEmpty ?? false) {
      body['category_id'] = category!;
    }

    var response =
        await http.post(uri, headers: {'Authorization': token}, body: body);
    var status = response.statusCode;
    if (status == 201) {
      print('created');
      print(response.body);
    } else {
      print(response.body);
    }

    if (_isChecked) {
      // Recurrency ON
      var url2 =
          ApiURL.baseUrl + "/wallet/" + wallet + "/transactionrecurrencies";
      final Uri uri2 = Uri.parse(url2);

      var response2 = await http.post(uri2, headers: {
        'Authorization': token
      }, body: {
        'description': _descriptionController.text,
        'value': _amountController.text.replaceAll(new RegExp(r"\D"), ""),
        'day': '${date.day}',
        'category_id': category ?? "0",
        'interval': recurrency,
        'expired_at': '${endDate!.year}-${endDate!.month}-${endDate!.day}'
      });
      var status2 = response2.statusCode;
      if (status2 == 201) {
        print('created rec');
        print(response2.body);
      } else {
        print(response2.body);
      }
    }
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: const Text("Add transaction"),
          backgroundColor: Theme.of(context).primaryColor,
        ),
        body: Form(
          child: Scrollbar(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Income / Outcoming Button
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SizedBox(
                          height:
                              MediaQuery.of(context).size.height * buttonHeight,
                          width:
                              MediaQuery.of(context).size.width * buttonWidth,
                          child: ElevatedButton(
                            onPressed: () {
                              _isIncome ? null : changeButtonState();
                            },
                            style: _isIncome
                                ? ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                    Theme.of(context).primaryColor,
                                  ))
                                : ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                            Colors.grey),
                                  ),
                            child: const Text(
                              "Income",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ),
                        SizedBox(
                          height:
                              MediaQuery.of(context).size.height * buttonHeight,
                          width:
                              MediaQuery.of(context).size.width * buttonWidth,
                          child: ElevatedButton(
                              onPressed: () {
                                !_isIncome ? null : changeButtonState();
                              },
                              style: !_isIncome
                                  ? ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Color.fromARGB(255, 233, 86, 75)),
                                    )
                                  : ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.grey),
                                    ),
                              child: const Text("Outcome",
                                  style: TextStyle(fontSize: 20))),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    DropWallet(changeWalletId),
                    const Divider(height: 10),
                    // Amount text field
                    TextField(
                      inputFormatters: <TextInputFormatter>[
                        CurrencyTextInputFormatter(
                          locale: 'pt_BR',
                          decimalDigits: 2,
                        ),
                      ],
                      keyboardType: TextInputType.number,
                      controller: _amountController,
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.fromLTRB(16,0,0,0),
                          labelText: "Amount",
                          labelStyle: const TextStyle(fontSize: 20),
                          suffixIcon:
                              Icon(FontAwesomeIcons.moneyBill, size: 30.0,color:Theme.of(context).primaryColor),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const Divider(height: 10),
                    // Description text field
                    TextField(
                      keyboardType: TextInputType.text,
                      controller: _descriptionController,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.fromLTRB(16,0,0,0),
                          border: InputBorder.none,
                          labelText: "Description",
                          suffixIcon:
                              Icon(FontAwesomeIcons.info, size: 30.0,color:Theme.of(context).primaryColor),
                          labelStyle: const TextStyle(fontSize: 20),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const Divider(height: 10),
                    // Date picker
                    TextField(
                      controller: _dateController,
                      enableInteractiveSelection: false,
                      onTap: () async {
                        FocusScope.of(context).requestFocus(new FocusNode());
                        DateTime? newDate = await showDatePicker(
                          context: context,
                          initialDate: date,
                          firstDate: DateTime(2022),
                          lastDate: DateTime(2062),
                          builder: (context, child) {
                            return Theme(
                              data: ThemeData.light().copyWith(
                                primaryColor: Theme.of(context).primaryColor,
                                colorScheme: ColorScheme.light(
                                  primary: Theme.of(context).primaryColor,
                                ),
                                buttonTheme: const ButtonThemeData(
                                    textTheme: ButtonTextTheme.primary),
                              ),
                              child: child!,
                            );
                          },
                        );
                        if (newDate == null) return;
                        setState(() => {
                              date = newDate,
                              _dateController.text =
                                  '${date.day}/${date.month}/${date.year}'
                            });
                      },
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.fromLTRB(16,0,0,0),
                          labelText: "Date",
                          suffixIcon:
                              Icon(FontAwesomeIcons.calendar, size: 30.0,color:Theme.of(context).primaryColor),
                          labelStyle: const TextStyle(fontSize: 20),
                          border: InputBorder.none,
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const Divider(height: 10),
                    DropCategory(changeCategoryId, key: _key),
                    const Divider(height: 10),
                    // Reccurrent
                    CheckboxListTile(
                      activeColor: Theme.of(context).primaryColor,
                      title: const Text(
                        "Recurrent?",
                        style: TextStyle(fontSize: 15),
                      ),
                      value: _isChecked,
                      onChanged: (bool? opt) {
                        setState(() {
                          _isChecked = opt!;
                        });
                      },
                      controlAffinity: ListTileControlAffinity
                          .leading, //  <-- leading Checkbox
                    ),
                    if (_isChecked) const Divider(height: 10),
                    if (_isChecked)
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            height: MediaQuery.of(context).size.height *
                                buttonHeight,
                            width:
                                MediaQuery.of(context).size.width * buttonWidth,
                            child: ElevatedButton(
                              onPressed: () {
                                setState(() {
                                  recurrency = "D";
                                });
                              },
                              style: recurrency == "D"
                                  ? ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.grey))
                                  : ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.white38),
                                    ),
                              child: const Text(
                                "Daily",
                                style: TextStyle(fontSize: 20),
                              ),
                            ),
                          ),
                          SizedBox(
                            height: MediaQuery.of(context).size.height *
                                buttonHeight,
                            width:
                                MediaQuery.of(context).size.width * buttonWidth,
                            child: ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                    recurrency = "M";
                                  });
                                },
                                style: recurrency == "M"
                                    ? ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all<Color>(
                                                Colors.grey),
                                      )
                                    : ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all<Color>(
                                                Colors.white38),
                                      ),
                                child: const Text("Montly",
                                    style: TextStyle(fontSize: 20))),
                          ),
                        ],
                      ),
                    if (_isChecked)
                      TextField(
                        controller: _endDateController,
                        enableInteractiveSelection: false,
                        onTap: () async {
                          FocusScope.of(context).requestFocus(FocusNode());
                          DateTime? newDate = await showDatePicker(
                            context: context,
                            initialDate: date,
                            firstDate: DateTime.now(),
                            lastDate: DateTime(2062),
                            builder: (context, child) {
                              return Theme(
                                data: ThemeData.light().copyWith(
                                  primaryColor: Theme.of(context).primaryColor,
                                  colorScheme: ColorScheme.light(
                                    primary: Theme.of(context).primaryColor,
                                  ),
                                  buttonTheme: const ButtonThemeData(
                                      textTheme: ButtonTextTheme.primary),
                                ),
                                child: child!,
                              );
                            },
                          );
                          if (newDate == null) return;
                          setState(() => {
                                endDate = newDate,
                                _endDateController.text =
                                    '${endDate!.day}/${endDate!.month}/${endDate!.year}'
                              });
                        },
                        decoration: InputDecoration(
                            labelText: "End Date",
                            contentPadding: const EdgeInsets.fromLTRB(16,10,0,0),
                            labelStyle: const TextStyle(fontSize: 20),
                            suffixIcon:
                              Icon(FontAwesomeIcons.calendar, size: 30.0,color:Theme.of(context).primaryColor),
                            border: InputBorder.none,
                            focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                      ),
                    const SizedBox(height: 10),
                    Center(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          SizedBox(
                            height: MediaQuery.of(context).size.height *
                                buttonHeight,
                            width:
                                MediaQuery.of(context).size.width * buttonWidth,
                            child: ElevatedButton(
                                onPressed: insertTransaction,
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.all<Color>(
                                          Theme.of(context).primaryColor),
                                ),
                                child: const Text("Insert",
                                    style: TextStyle(fontSize: 20))),
                          ),
                          SizedBox(
                            height: MediaQuery.of(context).size.height *
                                buttonHeight,
                            width:
                                MediaQuery.of(context).size.width * buttonWidth,
                            child: ElevatedButton(
                                onPressed: () {
                                  Navigator.pop(context);
                                },
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.all<Color>(
                                          Colors.grey),
                                ),
                                child: const Text("Cancel",
                                    style: TextStyle(fontSize: 20))),
                          ),
                        ],
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
