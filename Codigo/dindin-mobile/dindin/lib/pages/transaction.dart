// ignore_for_file: prefer_const_literals_to_create_immutables, prefer_const_constructors
import '../Components/dropCategory.dart';
import 'package:flutter/material.dart';

import '../Components/dropWallet.dart';

class Transaction extends StatefulWidget {
  @override
  _TransactionState createState() => _TransactionState();
}

class _TransactionState extends State<Transaction> {
  bool isChecked = false;
  DateTime date = DateTime(2022, 2, 2);
  bool _isIncome = false;

  void changeButtonState() {
    setState(() {
      _isIncome = !_isIncome;
    });
  }

  void insertTransaction() {}

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
              Flexible(
                flex: 1,
                child: Card(
                  child: Center(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        SizedBox(
                          height: 50,
                          width: 120,
                          child: ElevatedButton(
                            onPressed: _isIncome ? null : changeButtonState,
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.green),
                            ),
                            child: Text(
                              "Income",
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ),
                        SizedBox(
                          height: 50,
                          width: 120,
                          child: ElevatedButton(
                              onPressed: _isIncome ? changeButtonState : null,
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                        Colors.red),
                              ),
                              child: Text("Outcome",
                                  style: TextStyle(fontSize: 20))),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Flexible(
                flex: 1,
                child: Card(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(2.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [DropCategory(), DropWallet()],
                      ),
                    ),
                  ),
                ),
              ),
              Card(
                child: SizedBox(
                    child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            SizedBox(
                              child: TextField(
                                keyboardType: TextInputType.number,
                                onChanged: null,
                                decoration: InputDecoration(
                                    labelText: "Amount",
                                    labelStyle: TextStyle(fontSize: 30),
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
                              value: isChecked,
                              onChanged: (bool? opt) {
                                setState(() {
                                  isChecked = opt!;
                                });
                              },
                              controlAffinity: ListTileControlAffinity
                                  .leading, //  <-- leading Checkbox
                            )
                          ],
                        ))),
              ),
              Container(
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Center(
                      child: Column(children: [
                        Text(
                          '${date.day}/${date.month}/${date.year}',
                          style: TextStyle(fontSize: 25),
                        ),
                        ElevatedButton(
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.green),
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
              ),
              Expanded(
                flex: 1,
                child: Card(
                  child: Center(
                    heightFactor: 2,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        SizedBox(
                          height: 50,
                          width: 120,
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
                          height: 50,
                          width: 120,
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
