import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/transaction.dart';
import 'package:dindin/pages/dashboard.dart';
import 'package:dindin/pages/transactions/list.dart';
import 'package:dindin/widgets/category_drop.dart';
import 'package:dindin/widgets/wallet_drop.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class TransactionForm extends StatefulWidget {
  final Transaction? transaction;
  const TransactionForm(this.transaction ,{Key? key}) : super(key: key);

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
  String? category = "";
  String wallet = "";
  double amount = 0;
  String recurrency = "D";
  double buttonHeight = 0.06;
  double buttonWidth = 0.45;

  @override
  void initState(){
    super.initState();

    if(widget.transaction != null) { // Edit
      _descriptionController.text = widget.transaction!.description;
      _amountController.text = (widget.transaction!.value).abs().toStringAsFixed(2).replaceAll('.', ',');
      _isIncome = widget.transaction!.value > 0;
      final DateFormat formatter = DateFormat('dd/MM/yyyy');
      date = DateTime.parse(widget.transaction!.date);
      var dt = formatter.format(DateTime.parse(widget.transaction!.date)).toString();
      _dateController.text = dt;
      wallet = widget.transaction!.walletId;
      if(widget.transaction!.category != null) {
        category = widget.transaction!.category!.id.toString();
      }
      
      if(widget.transaction!.transactionRecurrencies != null) {
        _isChecked = true;
        recurrency = widget.transaction!.transactionRecurrencies!.interval;
        if(widget.transaction!.transactionRecurrencies!.expiredAt != null) {
          _endDateController.text = formatter.format(DateTime.parse(widget.transaction!.transactionRecurrencies!.expiredAt!)).toString();
          endDate = DateTime.parse(widget.transaction!.transactionRecurrencies!.expiredAt!);
        }
      }
    }
  }

  void changeButtonState() {
    setState(() {
      category = null;
      _key.currentState!.setWallet(_isIncome ? "IN" : "OUT", null);
      _isIncome = !_isIncome;
    });
    changeWalletId(wallet);
  }

  void changeWalletId(String id) {
    setState(() {
      _key.currentState!.setWallet(_isIncome ? "IN" : "OUT", null);
      category = "";
      wallet = id;
    });
    _key.currentState!.setWallet(_isIncome ? "IN" : "OUT", id);
  }

  void changeCategoryId(String id) {
    setState(() {
      category = id;
    });
  }

  void deleteTransaction() async{
    var url = ApiURL.baseUrl +
        "/wallet/" +
        widget.transaction!.walletId.toString() +
        "/transaction/" +
        widget.transaction!.id.toString();
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    try {
      var response = await http.delete(uri, headers: {
        'Authorization': token
      });
      var status = response.statusCode;
      if (status == 204) {
        Navigator.of(context).pop();
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const Extract()),
        );
      } else {
        print(response.body);
      }
    } catch (e) {
      print(e);
    }
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

    var body = {
      'description': _descriptionController.text,
      'value': _isIncome ? currencyFormat(_amountController.text).toString() : (double.parse(currencyFormat(_amountController.text).toString()) * -1)
        .toString(),
      'date': '${date.year}-${date.month}-${date.day}',
      'category_id': category
    };

    if (category?.isEmpty ?? false) {
      body['category_id'] = category!;
    }

    var token = await ApiURL.getToken();

    if(widget.transaction == null) { // Create
      var url = ApiURL.baseUrl + "/wallet/" + wallet + "/transaction";
      final Uri uri = Uri.parse(url);
      var response =
          await http.post(uri, headers: {'Authorization': token}, body: body);
      var status = response.statusCode;
      if (status == 201) {
        print('created');
        print(response.body);
      } else {
        print(response.body);
      }
    } else { // Edit
      var url = ApiURL.baseUrl + "/wallet/" + wallet + "/transaction/" + widget.transaction!.id;
      final Uri uri = Uri.parse(url);

      var response =
          await http.put(uri, headers: {'Authorization': token}, body: body);
      var status = response.statusCode;
      if (status == 200) {
        print('updated');
        print(response.body);
      } else {
        print(response.body);
      }
    }

    if (_isChecked) {
      var bodyRec = {
          'description': _descriptionController.text,
          'value': _isIncome ? currencyFormat(_amountController.text).toString() : (double.parse(currencyFormat(_amountController.text).toString()) * -1)
          .toString(),
          'day': '${date.day}',
          'category_id': category ?? "0",
          'interval': recurrency,
          'expired_at': '${endDate!.year}-${endDate!.month}-${endDate!.day}'
        };
      print(bodyRec);
      // Recurrency ON
      if(widget.transaction == null || widget.transaction?.transactionRecurrencies == null ) { // Create
        var url2 = ApiURL.baseUrl + "/wallet/" + wallet + "/transactionrecurrencies";
        final Uri uri2 = Uri.parse(url2);
        var response2 = await http.post(uri2, headers: {
          'Authorization': token
        }, body: bodyRec);
        var status2 = response2.statusCode;
        if (status2 == 201) {
          print('created rec');
          print(response2.body);
        } else {
          print(response2.body);
        }
      } else if(widget.transaction?.transactionRecurrencies != null) { // Edit
        var url2 = ApiURL.baseUrl + "/wallet/" + wallet + "/transactionrecurrencies/" + widget.transaction!.transactionRecurrencies!.id.toString();
        final Uri uri2 = Uri.parse(url2);
        var response2 = await http.put(uri2, headers: {
          'Authorization': token
        }, body: bodyRec);
        var status2 = response2.statusCode;
        if (status2 == 200) {
          print('update rec');
          print(response2.body);
        } else {
          print(response2.body);
        }
      }
    }
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const Dashboard()),
    );
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
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          title: Text(widget.transaction == null ? "Add transaction": "Edit Transaction"),
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
                    DropWallet(changeWalletId, widget.transaction != null? widget.transaction!.walletId: null),
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
                          contentPadding:
                              const EdgeInsets.fromLTRB(16, 0, 0, 0),
                          labelText: "Amount",
                          labelStyle: const TextStyle(fontSize: 20),
                          suffixIcon: Icon(FontAwesomeIcons.moneyBill,
                              size: 30.0,
                              color: Theme.of(context).primaryColor),
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
                          contentPadding:
                              const EdgeInsets.fromLTRB(16, 0, 0, 0),
                          border: InputBorder.none,
                          labelText: "Description",
                          suffixIcon: Icon(FontAwesomeIcons.info,
                              size: 30.0,
                              color: Theme.of(context).primaryColor),
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
                          contentPadding:
                              const EdgeInsets.fromLTRB(16, 0, 0, 0),
                          labelText: "Date",
                          suffixIcon: Icon(FontAwesomeIcons.calendar,
                              size: 30.0,
                              color: Theme.of(context).primaryColor),
                          labelStyle: const TextStyle(fontSize: 20),
                          border: InputBorder.none,
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(
                              color: Theme.of(context).primaryColor,
                            ),
                          )),
                    ),
                    const Divider(height: 10),
                    DropCategory(changeCategoryId,  widget.transaction , key: _key),
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
                    if (_isChecked) const Divider(height: 10),
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
                            contentPadding:
                                const EdgeInsets.fromLTRB(16, 10, 0, 0),
                            labelStyle: const TextStyle(fontSize: 20),
                            suffixIcon: Icon(FontAwesomeIcons.calendar,
                                size: 30.0,
                                color: Theme.of(context).primaryColor),
                            border: InputBorder.none,
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: Theme.of(context).primaryColor,
                              ),
                            )),
                      ),
                    if (_isChecked) const Divider(height: 10),
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
                    ),
                    if (widget.transaction != null)
                    const Divider(height: 10),
                    if (widget.transaction != null)
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
                                  deleteTransaction();
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
                          'Delete Transaction',
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
