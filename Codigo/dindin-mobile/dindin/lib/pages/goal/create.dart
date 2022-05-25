import 'package:dindin/pages/goal/list.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/widgets/wallet_drop_border.dart';
import 'package:flutter/services.dart';
import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';

class GoalCreate extends StatefulWidget {
  const GoalCreate({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _GoalCreateState();
  }
}

class _GoalCreateState extends State<GoalCreate> {
  DateTime date = DateTime.now();
  final TextEditingController _dateController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _valueController = TextEditingController();
  String wallet = "";
  int _goalType = 1;

  void changeWalletId(String id) {
    setState(() {
      wallet = id;
    });
    //_key.currentState!.setWallet(_isIncome ? "IN" : "OUT", id);
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text(
              'Create Goal',
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
                          hintText: 'ex: Save money for eurotrip',
                          suffixIcon:
                              Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                    ),
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
                    TextField(
                      controller: _valueController,
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
                    ),
                    const SizedBox(height: 20),
                    //End saving amount
                    // Date Limit field
                    const Text('Date Limit',
                        style: TextStyle(fontWeight: FontWeight.bold)),
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
                        if (newDate.compareTo(DateTime.now()) <= 0) {
                          ScaffoldMessenger.of(context)
                              .showSnackBar(const SnackBar(
                            content: Text("Date need to greater than today"),
                          ));
                          return;
                        }
                        setState(() => {
                              date = newDate,
                              _dateController.text =
                                  '${date.day}/${date.month}/${date.year}'
                            });
                      },
                      decoration: const InputDecoration(
                          labelStyle: TextStyle(fontSize: 16),
                          border: OutlineInputBorder(),
                          hintText: 'Select Date',
                          suffixIcon:
                              Icon(FontAwesomeIcons.calendar, size: 20.0)),
                    ),
                    const SizedBox(height: 20),
                    // End date limit
                    // Wallet dropdown list field
                    DropWallet(changeWalletId),
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
                          if (_descriptionController.text.isEmpty) {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text("Missing Description"),
                            ));
                            return;
                          } else if (_valueController.text.isEmpty) {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text("Missing Amount"),
                            ));
                            return;
                          } else if (_dateController.text.isEmpty) {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text("Missing Date"),
                            ));
                            return;
                          } else if (wallet.isEmpty) {
                            ScaffoldMessenger.of(context)
                                .showSnackBar(const SnackBar(
                              content: Text("Missing Wallet"),
                            ));
                            return;
                          }

                          var url = ApiURL.baseUrl + "/goal";
                          final Uri uri = Uri.parse(url);
                          var token = await ApiURL.getToken();
                          try {
                            var response = await http.post(uri, headers: {
                              'Authorization': token
                            }, body: {
                              'description': _descriptionController.text,
                              'value': _valueController.text
                                  .replaceAll(RegExp(r"\D"), ""),
                              'type': _goalType == 1 ? "A" : "B",
                              'expire_at':
                                  '${date.year}-${date.month}-${date.day}',
                              'wallet_id': wallet
                            });
                            var status = response.statusCode;
                            if (status == 201) {
                              //var json = jsonDecode(response.body);
                              Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const GoalList()),
                              );
                            } else {
                              print(response.body);
                            }
                          } catch (e) {
                            print(e);
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
