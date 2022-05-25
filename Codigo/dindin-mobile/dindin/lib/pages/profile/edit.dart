import 'dart:convert';
// import 'package:intl_phone_field/intl_phone_field.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/user.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  late bool _passwordVisible = false;

  @override
  void initState() {
    super.initState();
    _passwordVisible = false;
  }

  Future<User> getUser() async {
    Response response = await ApiURL.get("/user");
    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception(jsonDecode(response.body).message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: getUser(),
        builder: (context, snap) {
          if (snap.hasData) {
            User user = snap.data! as User;
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
                        initialValue: user.name,
                        maxLength: 100,
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
                        keyboardType: TextInputType.text,
                        obscureText:
                            !_passwordVisible, //This will obscure text dynamically
                        decoration: InputDecoration(
                          labelText: 'Old Password',
                          hintText: 'Enter your old password',
                          border: const OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                          suffixIcon: IconButton(
                            icon: Icon(
                              // Based on passwordVisible state choose the icon
                              _passwordVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Theme.of(context).primaryColorDark,
                            ),
                            onPressed: () {
                              // Update the state i.e. toogle the state of passwordVisible variable
                              setState(() {
                                _passwordVisible = !_passwordVisible;
                              });
                            },
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      TextFormField(
                        keyboardType: TextInputType.text,
                        obscureText:
                            !_passwordVisible, //This will obscure text dynamically
                        decoration: InputDecoration(
                          labelText: 'New Password',
                          hintText: 'Enter your new password',
                          border: const OutlineInputBorder(
                            borderSide: BorderSide(),
                          ),
                          suffixIcon: IconButton(
                            icon: Icon(
                              // Based on passwordVisible state choose the icon
                              _passwordVisible
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Theme.of(context).primaryColorDark,
                            ),
                            onPressed: () {
                              // Update the state i.e. toogle the state of passwordVisible variable
                              setState(() {
                                _passwordVisible = !_passwordVisible;
                              });
                            },
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
                              _formKey.currentState?.validate();
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
                  title: const Text('Goal'),
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
