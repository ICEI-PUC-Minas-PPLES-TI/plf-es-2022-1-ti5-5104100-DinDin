import 'dart:convert';
import 'dart:io';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:dindin/models/goal.dart';
import 'package:dindin/pages/goal/list.dart';
import 'package:dindin/pages/goal/view.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import '../../database/DBProvider.dart';
import '../../helpers/api_url.dart';

class GoalEdit extends StatefulWidget {
  final Goal? goal;
  const GoalEdit(this.goal, {Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _GoalEditState();
  }
}

class _GoalEditState extends State<GoalEdit> {
  final formKey = GlobalKey<FormState>();
  DateTime selectedDate = DateTime.now();
  // final List _wallets = [];
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _valuecontroller = TextEditingController();
  // late String _currentWallet;
  final TextEditingController _dateController = TextEditingController();
  int _goalType = 0;
  bool showEditDeleteBtn = false;
  bool errorMessage = false;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        _dateController.text =
            "${picked.day.toString().padLeft(2, '0')}/${picked.month.toString().padLeft(2, '0')}/${picked.year.toString()}";
      });
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

  void updateGoal() async {
    var url = ApiURL.baseUrl + "/goal/" + widget.goal!.id.toString();
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    try {
      var response = await http.put(
        uri,
        headers: {'Authorization': token},
        body: {
          'description': _descriptionController.text,
          'value': currencyFormat(_valuecontroller.text).toString(),
          'type': _goalType == 2 ? 'A' : 'B',
          'expire_at': selectedDate.toString(),
          'wallet_id': (widget.goal?.walletId).toString()
        },
      );
      var status = response.statusCode;
      if (status == 200) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const GoalList()),
        );
      } else {
        print(response.body);
        errorMessage = true;
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  void initState() {
    if (widget.goal != null) {
      // Edit
      selectedDate = DateTime.parse((widget.goal?.expireAt).toString());
      _dateController.text =
          "${selectedDate.day.toString().padLeft(2, '0')}/${selectedDate.month.toString().padLeft(2, '0')}/${selectedDate.year.toString()}";
      _descriptionController.text = widget.goal!.description;
      // checkInternet();
      _goalType = widget.goal?.type == 'B' ? 1 : 2;
      _valuecontroller.text = (widget.goal?.value).toString();
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
      final goal =
          await dbProvider.queryId('wallet', widget.goal!.id.toString());
      if (goal[0]['offline'] == 1) {
        setState(() {
          showEditDeleteBtn = true;
        });
      }
    }
  }

  bool checkdate(String date1) {
    var today = DateTime.now();
    String date2 =
        "${today.day.toString().padLeft(2, '0')}/${today.month.toString().padLeft(2, '0')}/${today.year.toString()}";
    var array1 = date1.split('/');
    var array2 = date2.split('/');
    if (int.parse(array1[2]) > int.parse(array2[2])) {
      return true;
    } else if (int.parse(array1[1]) > int.parse(array2[1])) {
      return true;
    } else if (int.parse(array1[0]) > int.parse(array2[0])) {
      return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text(
              'Edit Goal',
            ),
            backgroundColor: Theme.of(context).primaryColor),
        body: Form(
          autovalidateMode: AutovalidateMode.onUserInteraction,
          key: formKey,
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
                    TextFormField(
                        controller: _descriptionController,
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Save money for eurotrip',
                            suffixIcon:
                                Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                        validator: (value) => value == null || value.isEmpty
                            ? "Description can't be empty"
                            : null),
                    const SizedBox(height: 20),
                    // End description dield
                    // Goal type option chooser
                    const Text('Goals Type',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(children: [
                        GestureDetector(
                          onTap: () => {setState(() => _goalType = 1)},
                          child: Container(
                            color: _goalType == 1
                                ? const Color.fromARGB(255, 219, 219, 219)
                                : Colors.transparent,
                            child: Padding(
                              padding: const EdgeInsets.all(5.0),
                              child: Wrap(
                                children: [
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: const [
                                      Text('Saving',
                                          style: TextStyle(
                                              fontSize: 20.0,
                                              fontWeight: FontWeight.bold)),
                                      Text(
                                          'The Goal is accomplished when the limit date is reached and you \nhave more than the saving amount',
                                          overflow: TextOverflow.ellipsis,
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold))
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 15),
                        GestureDetector(
                          onTap: () => {setState(() => _goalType = 2)},
                          child: Container(
                              color: _goalType == 2
                                  ? const Color.fromARGB(255, 219, 219, 219)
                                  : Colors.transparent,
                              child: Padding(
                                padding: const EdgeInsets.all(5.0),
                                child: Wrap(children: [
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: const [
                                      Text('Achievement',
                                          style: TextStyle(
                                              fontSize: 20.0,
                                              fontWeight: FontWeight.bold)),
                                      Text(
                                          'The Goal is accomplished when you achieve the amount \nbefore the limit date is reached',
                                          style: TextStyle(
                                              fontWeight: FontWeight.bold))
                                    ],
                                  )
                                ]),
                              )),
                        )
                      ]),
                    ),
                    const SizedBox(height: 20),
                    // End goal type
                    // Numeric input saving amount
                    const Text('Saving/Achievement Amount',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    TextFormField(
                      controller: _valuecontroller,
                      inputFormatters: <TextInputFormatter>[
                        CurrencyTextInputFormatter(
                          locale: 'pt_BR',
                          decimalDigits: 2,
                        ),
                      ],
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: '9999,99',
                          suffixIcon:
                              Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      validator: (value2) => value2 == null || value2.isEmpty
                          ? "Amount can't be empty"
                          : null,
                    ),
                    const SizedBox(height: 20),
                    //End saving amount
                    // Date Limit field
                    const Text('Date Limit',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    TextFormField(
                      controller: _dateController,
                      readOnly: true,
                      decoration: InputDecoration(
                          border: const OutlineInputBorder(),
                          hintText: _dateController.text,
                          suffixIcon: const Icon(FontAwesomeIcons.calendar,
                              size: 20.0)),
                      onTap: () => _selectDate(context),
                      validator: (value3) =>
                          !checkdate(value3!) ? "Date alredy over" : null,
                    ),
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
                          final isValidForm = formKey.currentState!.validate();
                          print(isValidForm);
                          if (isValidForm) {
                            updateGoal();
                          }
                        },
                      ),
                    ), // End wallet list
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}
