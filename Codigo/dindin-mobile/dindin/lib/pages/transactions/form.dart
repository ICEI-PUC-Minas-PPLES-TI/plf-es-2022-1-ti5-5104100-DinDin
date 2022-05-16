import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/widgets/category_drop.dart';
import 'package:dindin/widgets/wallet_drop.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class TransactionForm extends StatefulWidget {
  const TransactionForm({Key? key}) : super(key: key);

  @override
  _TransactionFormState createState() => _TransactionFormState();
}

class _TransactionFormState extends State<TransactionForm> {
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  bool _isChecked = false;
  DateTime date = DateTime.now();
  bool _isIncome = true;
  String category = "";
  String wallet = "";
  double amount = 0;

  void changeButtonState() {
    setState(() {
      _isIncome = !_isIncome;
    });
  }

  void changeWalletId(String id) {
    setState(() {
      wallet = id;
    });
  }

  void insertTransaction() async {
    var url = ApiURL.baseUrl + "/wallet/" + wallet + "/transaction";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();

    var response = await http.post(uri, headers: {
      'Authorization': token
    }, body: {
      'description': _descriptionController.text,
      'value': _amountController.text.replaceAll(new RegExp(r"\D"), ""),
      'date': '${date.year}-${date.month}-${date.day}'
    });
    var status = response.statusCode;
    if (status == 201) {
      print('created');
      print(response.body);
    } else {
      print(response.body);
    }

    print(wallet);
    print(_isIncome);
    print(_isChecked);
    print(date);
    print(_amountController.text);
    print(_descriptionController.text);
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
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.1,
                          width: MediaQuery.of(context).size.width * 0.4,
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
                          height: MediaQuery.of(context).size.height * 0.1,
                          width: MediaQuery.of(context).size.width * 0.4,
                          child: ElevatedButton(
                              onPressed: () {
                                !_isIncome ? null : changeButtonState();
                              },
                              style: !_isIncome
                                  ? ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.red),
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
                    const SizedBox(height: 10),
                    DropCategory(wallet),
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
                          labelText: "Amount",
                          labelStyle: const TextStyle(fontSize: 16),
                          border: const UnderlineInputBorder(),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const SizedBox(height: 10),
                    // Description text field
                    TextField(
                      keyboardType: TextInputType.text,
                      controller: _descriptionController,
                      decoration: InputDecoration(
                          labelText: "Description",
                          labelStyle: const TextStyle(fontSize: 16),
                          border: const UnderlineInputBorder(),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const SizedBox(height: 10),
                    // Date picker
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Center(
                          child: Column(children: [
                            Text(
                              '${date.day}/${date.month}/${date.year}',
                              style: const TextStyle(fontSize: 20),
                            ),
                            ElevatedButton(
                                style: ButtonStyle(
                                  backgroundColor:
                                      MaterialStateProperty.all<Color>(
                                    Theme.of(context).primaryColor,
                                  ),
                                ),
                                child: const Text(
                                  'Select Date',
                                  style: TextStyle(
                                    fontSize: 20,
                                  ),
                                ),
                                onPressed: () async {
                                  DateTime? newDate = await showDatePicker(
                                    context: context,
                                    initialDate: date,
                                    firstDate: DateTime(2022),
                                    lastDate: DateTime(2062),
                                    builder: (context, child) {
                                      return Theme(
                                        data: ThemeData.light().copyWith(
                                          primaryColor:
                                              Theme.of(context).primaryColor,
                                          colorScheme: ColorScheme.light(
                                            primary:
                                                Theme.of(context).primaryColor,
                                          ),
                                          buttonTheme: const ButtonThemeData(
                                              textTheme:
                                                  ButtonTextTheme.primary),
                                        ),
                                        child: child!,
                                      );
                                    },
                                  );
                                  if (newDate == null) return;
                                  setState(() => date = newDate);
                                })
                          ]),
                        ),
                      ),
                    ),
                    // Reccurrent
                    CheckboxListTile(
                      title: const Text(
                        "Recurrent?",
                        style: TextStyle(fontSize: 12),
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
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.1,
                              width: MediaQuery.of(context).size.width * 0.4,
                              child: ElevatedButton(
                                  onPressed: insertTransaction,
                                  style: ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                      Theme.of(context).primaryColor,
                                    ),
                                  ),
                                  child: const Text("Insert",
                                      style: TextStyle(fontSize: 20))),
                            ),
                            SizedBox(
                              height: MediaQuery.of(context).size.height * 0.1,
                              width: MediaQuery.of(context).size.width * 0.4,
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
