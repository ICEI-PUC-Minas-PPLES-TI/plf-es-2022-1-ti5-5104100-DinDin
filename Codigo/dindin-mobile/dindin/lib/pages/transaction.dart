// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors
import '../Components/dropCategory.dart';
import 'package:flutter/material.dart';
import '../Components/dropWallet.dart';

class Transaction extends StatefulWidget {
  const Transaction({Key? key}) : super(key: key);

  @override
  _TransactionState createState() => _TransactionState();
}

class _TransactionState extends State<Transaction> {
  bool _isChecked = false;
  DateTime date = DateTime(2022, 2, 2);
  bool _isIncome = true;
  String category = "";
  String wallet = "";
  double amount = 0;

  void changeButtonState() {
    setState(() {
      _isIncome = !_isIncome;
    });
  }

  void insertTransaction() {
    print(_isIncome);
    print(_isChecked);
    print(date);
  }

  void cancelTransaction() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Add transaction"),
          backgroundColor: Colors.green,
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: <Widget>[
              Center(
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Center(
                      child: Row(
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
                                              Colors.green))
                                  : ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.grey),
                                    ),
                              child: Text(
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
                                child: Text("Outcome",
                                    style: TextStyle(fontSize: 20))),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              Card(
                child: Center(
                    child: Padding(
                  padding: const EdgeInsets.all(2.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [DropCategory(), DropWallet()],
                  ),
                )),
              ),
              Expanded(
                child: Card(
                  child: Center(
                      child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              SizedBox(
                                child: TextField(
                                  keyboardType: TextInputType.number,
                                  decoration: InputDecoration(
                                      labelText: "Amount",
                                      labelStyle: TextStyle(fontSize: 40),
                                      border: UnderlineInputBorder(),
                                      focusedBorder: OutlineInputBorder(
                                        borderSide:
                                            BorderSide(color: Colors.green),
                                      )),
                                ),
                              ),
                              CheckboxListTile(
                                title: Text(
                                  "Recurrent?",
                                  style: TextStyle(fontSize: 20),
                                ),
                                value: _isChecked,
                                onChanged: (bool? opt) {
                                  setState(() {
                                    _isChecked = opt!;
                                  });
                                },
                                controlAffinity: ListTileControlAffinity
                                    .leading, //  <-- leading Checkbox
                              )
                            ],
                          ))),
                ),
              ),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Column(children: [
                      Text(
                        '${date.day}/${date.month}/${date.year}',
                        style: TextStyle(fontSize: 20),
                      ),
                      ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.green),
                          ),
                          child: Text(
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
                                    primaryColor: Colors.green,
                                    colorScheme: ColorScheme.light(
                                        primary: Colors.green),
                                    buttonTheme: ButtonThemeData(
                                        textTheme: ButtonTextTheme.primary),
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
              Card(
                child: Padding(
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
                                        Colors.green),
                              ),
                              child: Text("Insert",
                                  style: TextStyle(fontSize: 20))),
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.1,
                          width: MediaQuery.of(context).size.width * 0.4,
                          child: ElevatedButton(
                              onPressed: cancelTransaction,
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                        Colors.grey),
                              ),
                              child: Text("Cancel",
                                  style: TextStyle(fontSize: 20))),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ));
  }
}
