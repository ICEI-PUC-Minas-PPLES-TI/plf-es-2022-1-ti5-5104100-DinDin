import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';

class WalletView extends StatefulWidget {
  const WalletView({Key? key}) : super(key: key);

  @override
  _WalletViewState createState() => _WalletViewState();
}

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

class _WalletViewState extends State<WalletView> {
  final GlobalKey<FormState> _formKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet X'),
        backgroundColor: primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const SizedBox(height: 20),
              Card(
                elevation: 5,
                color: HexColor("F5F6FA"),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  children: [
                    IconButton(
                      icon: Icon(Icons.three_p_sharp),
                      color: Colors.black,
                      onPressed: () {
                        // Respond to icon toggle
                      },
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 60.0),
                      child: Container(
                        width: double.infinity,
                        padding: const EdgeInsets.all(10.0),
                        child: const Center(
                            child: Text('Wallet X',
                                style: TextStyle(
                                    fontSize: 50,
                                    fontWeight: FontWeight.bold))),
                      ),
                    ),
                    const SizedBox(height: 5.0),
                    const Text(
                      "Description",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 25.0),
                    const Text(
                      "Description",
                      style: TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 60.0),
                  ],
                ),
              ),
              const SizedBox(
                height: 35,
              ),
              TextFormField(
                initialValue: "demo-user-01@email.com",
                maxLength: 150,
                decoration: const InputDecoration(
                  labelText: 'E-mail',
                  border: OutlineInputBorder(
                    borderSide: BorderSide(),
                  ),
                  suffixIcon: Icon(Icons.edit_outlined),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              IntlPhoneField(
                initialValue: "31988887777",
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  border: OutlineInputBorder(
                    borderSide: BorderSide(),
                  ),
                  suffixIcon: Icon(Icons.edit_outlined),
                ),
                initialCountryCode: 'BR',
                onChanged: (phone) {
                  print(phone.completeNumber);
                },
                onCountryChanged: (country) {
                  print('Country changed to: ' + country.name);
                },
              ),
              const SizedBox(
                height: 10,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  MaterialButton(
                    minWidth: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 20),
                    child: const Text('Save Changes'),
                    color: primaryColor,
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
  }
}
