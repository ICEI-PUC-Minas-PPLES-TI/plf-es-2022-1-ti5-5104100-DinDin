import 'dart:convert';
// import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/user.dart';
import 'package:http/http.dart' as http;

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _formKey = GlobalKey<FormState>();

  final nameController = TextEditingController();
  final currentPasswordController = TextEditingController();
  final newPasswordController = TextEditingController();

  bool _showcurrentPassword = true;
  bool _showNewPassword = true;

  void _togglecurrentPassword() {
    setState(() {
      _showcurrentPassword = !_showcurrentPassword;
    });
  }

  void _toggleNewPassword() {
    setState(() {
      _showNewPassword = !_showNewPassword;
    });
  }

  @override
  void initState() {
    super.initState();
  }

  Future<User> getUser() async {
    Response response = await ApiURL.get("/user");
    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(jsonDecode(response.body).message);
    }
  }

  void updateUser() async {
    final body = {'name': nameController.text};
    if (currentPasswordController.text.length >= 8 &&
        newPasswordController.text.length >= 8) {
      body['oldPassword'] = currentPasswordController.text;
      body['password'] = newPasswordController.text;
    }
    var response = await ApiURL.put("/user", body: body);
    print(body);

    var status = response.statusCode;
    if (status == 200) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Changes saved')),
      );
    } else if (status == 409) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('The current password is wrong')),
      );
    } else {
      print(status);
      print(response.body);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getUser(),
        builder: (context, snap) {
          if (snap.hasData) {
            User user = snap.data! as User;
            nameController.text = user.name;
            return Scaffold(
              appBar: AppBar(
                title: const Text('Edit Profile'),
                backgroundColor: Theme.of(context).primaryColor,
              ),
              body: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32.0),
                child: Form(
                  key: _formKey,
                  child: ListView(
                    children: <Widget>[
                      const SizedBox(height: 60),
                      TextFormField(
                        keyboardType: TextInputType.text,
                        maxLength: 100,
                        controller: nameController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter some text';
                          }
                          return null;
                        },
                        decoration: const InputDecoration(
                          labelText: 'Name',
                          border: OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                          suffixIcon: Icon(Icons.edit_outlined),
                        ),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        readOnly: true,
                        showCursor: false,
                        initialValue: user.email,
                        maxLength: 150,
                        decoration: const InputDecoration(
                          labelText: 'E-mail',
                          border: OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      TextFormField(
                        keyboardType: TextInputType.visiblePassword,
                        controller: currentPasswordController,
                        obscureText: _showcurrentPassword,
                        validator: (value) {
                          if ((currentPasswordController.text.isEmpty &&
                                  newPasswordController.text.isNotEmpty) ||
                              (currentPasswordController.text.isNotEmpty &&
                                  newPasswordController.text.isEmpty)) {
                            return 'Please fill in both password fields.';
                          } else if (currentPasswordController.text.length <
                              8) {
                            return 'Password must be at least 8 characters.';
                          }
                          return null;
                        },
                        decoration: InputDecoration(
                          labelText: 'Current Password',
                          hintText: 'Enter your current password',
                          border: const OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                          suffixIcon: InkWell(
                            onTap: _togglecurrentPassword,
                            child: Icon(
                              _showcurrentPassword
                                  ? FontAwesomeIcons.eye
                                  : FontAwesomeIcons.eyeSlash,
                              size: 15.0,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      TextFormField(
                        keyboardType: TextInputType.text,
                        controller: newPasswordController,
                        obscureText: _showNewPassword,
                        validator: (value) {
                          if ((currentPasswordController.text.isEmpty &&
                                  newPasswordController.text.isNotEmpty) ||
                              (currentPasswordController.text.isNotEmpty &&
                                  newPasswordController.text.isEmpty)) {
                            return 'Please fill in both password fields.';
                          } else if (newPasswordController.text.length < 8) {
                            return 'Password must be at least 8 characters.';
                          }
                          return null;
                        },
                        decoration: InputDecoration(
                          labelText: 'New Password',
                          hintText: 'Enter your new password',
                          border: const OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                          suffixIcon: InkWell(
                            onTap: _toggleNewPassword,
                            child: Icon(
                              _showNewPassword
                                  ? FontAwesomeIcons.eye
                                  : FontAwesomeIcons.eyeSlash,
                              size: 15.0,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ),
                      // const SizedBox(
                      //   height: 5,
                      // ),
                      // IntlPhoneField(
                      //   initialValue: "31988887777",
                      //   decoration: const InputDecoration(
                      //     labelText: 'Phone Number',
                      //     border: OutlineInputBorder(
                      //       borderSide: BorderSide(),
                      //     ),
                      //     suffixIcon: Icon(Icons.edit_outlined),
                      //   ),
                      //   initialCountryCode: 'BR',
                      //   onChanged: (phone) {
                      //     print(phone.completeNumber);
                      //   },
                      //   onCountryChanged: (country) {
                      //     print('Country changed to: ' + country.name);
                      //   },
                      // ),
                      const SizedBox(
                        height: 20,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          MaterialButton(
                            minWidth: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            child: const Text('Save Changes'),
                            color: Theme.of(context).primaryColor,
                            textColor: Colors.white,
                            onPressed: () {
                              if (_formKey.currentState!.validate()) {
                                // If the form is valid, display a snackbar. In the real world,
                                // you'd often call a server or save the information in a database.
                                updateUser();
                              }
                            },
                          ),
                          Container(height: 20.0),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          } else if (snap.hasError) {
            return Scaffold(
                appBar: AppBar(
                  title: const Text('Profile'),
                  backgroundColor: Theme.of(context).primaryColor,
                ),
                body: Center(
                    child: Text(
                        "Erro ao carregar dados: " + snap.error.toString())));
          } else {
            return const Center(
              child: CircularProgressIndicator(backgroundColor: Colors.white),
            );
          }
        });
  }
}
