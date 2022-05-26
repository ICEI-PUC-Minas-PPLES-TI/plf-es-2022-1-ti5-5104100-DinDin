import 'dart:convert';

import 'package:dindin/helpers/color_helper.dart';
import 'package:dindin/models/category.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:dindin/helpers/api_url.dart';

class CategoryForm extends StatefulWidget {
  final Category? category;
  final int walletId;

  const CategoryForm(this.walletId, this.category, {Key? key})
      : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return _CategoryFormState();
  }
}

class _CategoryFormState extends State<CategoryForm> {
  String _catType = 'IN';
  String _catColor = 'eb5a46';
  ColorHelper ch = ColorHelper();

  final TextEditingController _descriptionController = TextEditingController();

  void createCategory() async {
    var url = "/wallet/" + widget.walletId.toString() + "/category";
    try {
      var response = await ApiURL.post(url, body: {
        'description': _descriptionController.text,
        'type': _catType,
        'color': _catColor,
        'wallet_id': widget.walletId.toString()
      });
      var status = response.statusCode;
      if (status == 201) {
        var json = jsonDecode(response.body);
        Navigator.of(context).pop();
      } else {
        print(response.body);
      }
    } catch (e) {
      print(e);
    }
  }

  void editCategory() async {
    var url = "/wallet/" +
        widget.walletId.toString() +
        "/category/" +
        widget.category!.id.toString();
    try {
      var response = await ApiURL.put(url, body: {
        'description': _descriptionController.text,
        'type': _catType,
        'color': _catColor
      });
      var status = response.statusCode;
      if (status == 200) {
        var json = jsonDecode(response.body);
        Navigator.of(context).pop();
      } else {
        print(response.body);
      }
    } catch (e) {
      print(e);
    }
  }

  void deleteCategory() async {
    var url = "/wallet/" +
        widget.walletId.toString() +
        "/category/" +
        widget.category!.id.toString();
    try {
      var response = await ApiURL.delete(url);
      var status = response.statusCode;
      if (status == 204) {
        Navigator.of(context).pop();
        Navigator.of(context).pop();
      } else {
        print(response.body);
      }
    } catch (e) {
      print(e);
    }
  }

  @override
  void initState() {
    if (widget.category != null) {
      // Edit
      _descriptionController.text = widget.category!.description!;
      _catColor = widget.category!.color!;
      _catType = widget.category!.type!;
    } else {
      //Create
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text(
              widget.category != null ? 'Edit Category' : 'Create Category',
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
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'ex: Food, Education, etc...',
                          suffixIcon:
                              Icon(FontAwesomeIcons.penToSquare, size: 20.0)),
                      controller: _descriptionController,
                    ),
                    const SizedBox(height: 20),
                    // End category type
                    // Type Input
                    const Text('Type',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    Column(
                      children: <Widget>[
                        ListTile(
                          title: const Text('Income'),
                          leading: Radio<String>(
                            value: 'IN',
                            groupValue: _catType,
                            onChanged: (String? value) {
                              setState(() {
                                _catType = value!;
                              });
                            },
                          ),
                        ),
                        ListTile(
                          title: const Text('Outcome'),
                          leading: Radio<String>(
                            value: 'OUT',
                            groupValue: _catType,
                            onChanged: (String? value) {
                              setState(() {
                                _catType = value!;
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // End category type
                    // Category color grid
                    const Text('Color',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    Row(mainAxisSize: MainAxisSize.min, children: <Widget>[
                      // Red Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = 'eb5a46';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == 'eb5a46'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('eb5a46'),
                                ),
                              )),
                        ),
                      ),
                      // Orange Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = 'ff9f1a';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == 'ff9f1a'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('ff9f1a'),
                                ),
                              )),
                        ),
                      ),
                      // Blue Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = '0079bf';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == '0079bf'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('0079bf'),
                                ),
                              )),
                        ),
                      ),
                      // Green Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = '61bd4f';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == '61bd4f'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('61bd4f'),
                                ),
                              )),
                        ),
                      )
                    ]),
                    Row(mainAxisSize: MainAxisSize.min, children: <Widget>[
                      // Purple Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = 'c377e0';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == 'c377e0'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('c377e0'),
                                ),
                              )),
                        ),
                      ),
                      // Yellow Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = 'f2d600';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == 'f2d600'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('f2d600'),
                                ),
                              )),
                        ),
                      ),
                      // Dark Blue Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = '344563';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == '344563'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('344563'),
                                ),
                              )),
                        ),
                      ),
                      // Pink Color
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: GestureDetector(
                              onTap: () => {
                                    setState(() {
                                      _catColor = 'ff78cb';
                                    })
                                  },
                              child: Container(
                                height: 80,
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                      color: _catColor == 'ff78cb'
                                          ? Colors.blueAccent
                                          : Colors.transparent,
                                      width: 5),
                                  color: ch.fromHex('ff78cb'),
                                ),
                              )),
                        ),
                      )
                    ]),
                    const SizedBox(height: 20),
                    SizedBox(
                      height: 40,
                      width: double.infinity,
                      child: ElevatedButton(
                        child: const Text("Save"),
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).primaryColor,
                        ),
                        onPressed: () {
                          if (widget.category == null) {
                            createCategory();
                          } else {
                            editCategory();
                          }
                        },
                      ),
                    ),
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
                              "All transactions linked to this category will be set as 'No Category'. Delete ?",
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
                                  deleteCategory();
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
                          'Delete Category',
                          style: TextStyle(color: Colors.red),
                        ),
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
