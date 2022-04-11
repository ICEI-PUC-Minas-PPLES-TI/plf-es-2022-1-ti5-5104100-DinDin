import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GoalCreate extends StatefulWidget {
  const GoalCreate({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _GoalCreateState();
  }
}

class _GoalCreateState extends State<GoalCreate> {
  DateTime selectedDate = DateTime.now();
  final List _wallets = ["Wallet X", "Wallet Y", "Wallet Z"];
  late List<DropdownMenuItem<String>> _dropDownMenuItems;
  late String _currentWallet;
  final TextEditingController _dateController = TextEditingController();
  int _goalType = 1;

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

  // Fill wallet dropdown function
  List<DropdownMenuItem<String>> getDropDownMenuItems() {
    List<DropdownMenuItem<String>> items = [];
    for (String wallet in _wallets) {
      // here we are creating the drop down menu items, you can customize the item right here
      // but I'll just use a simple text for this
      items.add(DropdownMenuItem(value: wallet, child: Text(wallet)));
    }
    return items;
  }

  // Change wallet dropdown function
  void changedDropDownItem(String? selectedWallet) {
    setState(() {
      _currentWallet = selectedWallet!;
    });
  }

  @override
  void initState() {
    _dropDownMenuItems = getDropDownMenuItems();
    _currentWallet = _dropDownMenuItems[0].value!;
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
                    const TextField(
                      decoration: InputDecoration(
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
                              child: Row(
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
                                child: Row(children: [
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
                    const TextField(
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
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
                      readOnly: true,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'Select Date',
                          suffixIcon:
                              Icon(FontAwesomeIcons.calendar, size: 20.0)),
                      onTap: () => _selectDate(context),
                    ),
                    const SizedBox(height: 20),
                    // End date limit
                    // Wallet dropdown list field
                    const Text('Wallet',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    DropdownButtonFormField(
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'Select Wallet',
                          suffixIcon:
                              Icon(FontAwesomeIcons.wallet, size: 20.0)),
                      value: _currentWallet,
                      items: _dropDownMenuItems,
                      onChanged: changedDropDownItem,
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
                        onPressed: () {},
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
