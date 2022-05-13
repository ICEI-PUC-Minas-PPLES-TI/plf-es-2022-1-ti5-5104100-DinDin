import 'package:dindin/pages/wallet/update.dart';
import 'package:share_plus/share_plus.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:dindin/pages/wallet/members.dart';

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
  String inviteCode = "AAAA12333";
  String inviteExpireDate = "17/05/2022";
  bool walletIsShared = true;
  final GlobalKey<FormState> _formKey = GlobalKey();
  showInviteDialog(BuildContext context) {
    return showDialog(
        context: context,
        builder: (context) {
          return SimpleDialog(
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  const FaIcon(
                    FontAwesomeIcons.envelope,
                    size: 50.0,
                    color: Colors.green,
                  ),
                  const Text(
                    'New Invite',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                  Text('Code: $inviteCode'),
                  Text('Expires at: $inviteExpireDate'),
                ],
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: GestureDetector(
                  onTap: () async => {
                    await Share.share('This is my Wallet Code: $inviteCode')
                  },
                  child: const Card(
                    child: ListTile(
                        leading: Padding(
                          padding: EdgeInsets.all(8.0),
                          child: FaIcon(
                            FontAwesomeIcons.paperPlane,
                            size: 30.0,
                            color: Colors.black,
                          ),
                        ),
                        title: Text('Share Wallet')),
                  ),
                ),
              ),
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet X'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ListView(
        children: [
          Padding(
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
                        Padding(
                          padding: const EdgeInsets.only(right: 20, top: 20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              IconButton(
                                alignment: Alignment.topRight,
                                icon: const FaIcon(
                                  FontAwesomeIcons.ellipsis,
                                  size: 30.0,
                                  color: Colors.black,
                                ),
                                color: Colors.black,
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            const WalletUpdate()),
                                  );
                                },
                              ),
                            ],
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 25.0),
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
                          "Receipient type: Private",
                          style: TextStyle(fontWeight: FontWeight.w700),
                        ),
                        const SizedBox(height: 60.0),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 35,
                  ),
                  const Card(
                    child: ListTile(
                        leading: Padding(
                          padding: EdgeInsets.only(top: 4.0, left: 4.0),
                          child: FaIcon(
                            FontAwesomeIcons.user,
                            size: 30.0,
                            color: Colors.black,
                          ),
                        ),
                        title: Text('Wallet Holder'),
                        subtitle: Text('Zé João')),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  const Card(
                    child: ListTile(
                        leading: Padding(
                          padding: EdgeInsets.only(top: 4.0, left: 4.0),
                          child: FaIcon(
                            FontAwesomeIcons.buildingColumns,
                            size: 30.0,
                            color: Colors.black,
                          ),
                        ),
                        title: Text('Bank Name'),
                        subtitle: Text('Inter')),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  GestureDetector(
                    onTap: () => {showInviteDialog(context)},
                    child: const Card(
                      child: ListTile(
                          leading: Padding(
                            padding: EdgeInsets.only(top: 4.0, left: 4.0),
                            child: FaIcon(
                              FontAwesomeIcons.envelope,
                              size: 30.0,
                              color: Colors.black,
                            ),
                          ),
                          title: Text('Share Wallet'),
                          subtitle: Text('zejoao@protonmail.com')),
                    ),
                  ),
                  if(!walletIsShared) const SizedBox(
                    height: 10,
                  ),
                  if(walletIsShared) const SizedBox(
                    height: 10,
                  ),
                  if(walletIsShared) GestureDetector(
                    onTap: () => {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const MembersList()),
                      )
                    },
                    child: const Card(
                      child: ListTile(
                          leading: Padding(
                            padding: EdgeInsets.only(top: 4.0, left: 4.0),
                            child: FaIcon(
                              FontAwesomeIcons.users,
                              size: 30.0,
                              color: Colors.black,
                            ),
                          ),
                          title: Text('Wallet Users'),
                          subtitle: Text('Ana, pedro, neymar...')),
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
