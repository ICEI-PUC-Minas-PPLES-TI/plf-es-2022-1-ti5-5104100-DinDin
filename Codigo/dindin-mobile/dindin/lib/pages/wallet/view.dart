import 'dart:convert';

import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/wallet_invite.dart';
import 'package:dindin/pages/wallet/form.dart';
import 'package:intl/intl.dart';
import 'package:share_plus/share_plus.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:dindin/pages/wallet/members.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../../models/wallet.dart';
import '../category/list.dart';

class WalletView extends StatefulWidget {
  final Wallet wallet;

  const WalletView(this.wallet, {Key? key}) : super(key: key);

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
  int id = 0;
  String description = ' ';

  late Future<Wallet> futureWallet;
  late Future<WalletInvite> futureWalletInvite;
  late Future<num> futureTotal;

  final GlobalKey<FormState> _formKey = GlobalKey();

  @override
  void initState() {
    setState(() {
      id = widget.wallet.id.toInt();
      description = widget.wallet.description!;
    });
    futureWallet = fetchWallet();
    futureTotal = fetchTotal();
    super.initState();
  }

  Future<Wallet> fetchWallet() async {
    final url = ApiURL.baseUrl + "/wallet/" + id.toString();
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.get(uri, headers: {'Authorization': token});
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final Wallet wallet = Wallet.fromJson(json);
      return wallet;
    } else {
      throw Exception('Failed to load wallet');
    }
  }

  Future<WalletInvite> createInvite() async {
    final url = ApiURL.baseUrl + "/wallet/" + id.toString() + "/invite";
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.post(uri, headers: {'Authorization': token});
    if (response.statusCode == 201) {
      final json = jsonDecode(response.body)['invite'];
      final WalletInvite walletInvite = WalletInvite.fromJson(json);
      return walletInvite;
    } else {
      throw Exception('Failed to load wallet invite');
    }
  }

  Future<num> fetchTotal() async {
    final url = ApiURL.baseUrl + "/report/usertotal?wallet_id=" + id.toString();
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.get(uri, headers: {'Authorization': token});
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final num value = num.parse(json['total'].toStringAsFixed(3));
      return value;
    } else {
      throw Exception('Failed to load total');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(description),
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: const FaIcon(FontAwesomeIcons.tag),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => ListCategories(id)),
              );
            },
          ),
        ],
      ),
      body: FutureBuilder<num>(
          future: futureTotal,
          builder: (context, totalValue) {
            return FutureBuilder<Wallet>(
                future: futureWallet,
                builder: (context, wallet) {
                  if (wallet.hasData) {
                    return ListView(
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
                                        padding: const EdgeInsets.only(
                                            right: 20, top: 20),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.end,
                                          children: [
                                            IconButton(
                                              alignment: Alignment.topRight,
                                              icon: const FaIcon(
                                                FontAwesomeIcons
                                                    .solidPenToSquare,
                                                size: 30.0,
                                                color: Colors.black,
                                              ),
                                              color: Colors.black,
                                              onPressed: () {
                                                Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                      builder: (context) =>
                                                          WalletForm(
                                                              widget.wallet)),
                                                ).then((value) => {
                                                      if (value is Wallet)
                                                        {
                                                          setState(() {
                                                            description = value
                                                                .description!;
                                                          }),
                                                        }
                                                      else if (value is String)
                                                        {
                                                          if (value == 'CLOSE')
                                                            Navigator.of(
                                                                    context)
                                                                .pop()
                                                        }
                                                    });
                                              },
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 25.0),
                                      const Text("Wallet Total"),
                                      Padding(
                                        padding:
                                            const EdgeInsets.only(top: 25.0),
                                        child: Container(
                                          width: double.infinity,
                                          padding: const EdgeInsets.all(10.0),
                                          child: Center(
                                              child: Text(
                                                      (((totalValue.data != null)&&totalValue.data!>=0)
                                                          ? "R\$" +totalValue.data!
                                                              .toStringAsFixed(
                                                                  2)
                                                              .replaceAll(
                                                                  '.', ',')
                                                          : "-R\$" +(totalValue.data!*-1)
                                                              .toStringAsFixed(
                                                                  2)
                                                              .replaceAll(
                                                                  '.', ',')),
                                                  style: const TextStyle(
                                                      fontSize: 50,
                                                      fontWeight:
                                                          FontWeight.bold))),
                                        ),
                                      ),
                                      const SizedBox(height: 25.0),
                                      Text(
                                        wallet.data!.shared == 1
                                            ? 'Shared'
                                            : 'Private',
                                        style: const TextStyle(
                                            fontWeight: FontWeight.w700),
                                      ),
                                      const SizedBox(height: 60.0),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  height: 35,
                                ),
                                GestureDetector(
                                  child: const Card(
                                    child: ListTile(
                                      leading: Padding(
                                        padding: EdgeInsets.only(
                                            top: 4.0, left: 4.0),
                                        child: FaIcon(
                                          FontAwesomeIcons.house,
                                          size: 30.0,
                                          color: Colors.black,
                                        ),
                                      ),
                                      title: Text('Set Dashboard Wallet'),
                                    ),
                                  ),
                                  onTap: () async {
                                    await StreamingSharedPreferences.instance
                                        .then((sharedPref) async {
                                      await sharedPref.setString(
                                          "dashwalletName",
                                          wallet.data!.description.toString());
                                      await sharedPref.setInt(
                                          "dashwalletID",
                                          int.parse(
                                              wallet.data!.id.toString()));
                                    });
                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(const SnackBar(
                                      content: Text("Wallet Changed"),
                                    ));
                                  },
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                Card(
                                  child: ListTile(
                                      leading: const Padding(
                                        padding: EdgeInsets.only(
                                            top: 4.0, left: 4.0),
                                        child: FaIcon(
                                          FontAwesomeIcons.buildingColumns,
                                          size: 30.0,
                                          color: Colors.black,
                                        ),
                                      ),
                                      title: const Text('Wallet Name'),
                                      subtitle: Text(
                                          wallet.data!.description.toString())),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                Card(
                                  child: ListTile(
                                      leading: const Padding(
                                        padding: EdgeInsets.only(
                                            top: 4.0, left: 4.0),
                                        child: FaIcon(
                                          FontAwesomeIcons.user,
                                          size: 30.0,
                                          color: Colors.black,
                                        ),
                                      ),
                                      title: const Text('Wallet Holder'),
                                      subtitle:
                                          Text(wallet.data!.owenerUser!.name)),
                                ),
                                const SizedBox(
                                  height: 10,
                                ),
                                GestureDetector(
                                  child: const Card(
                                    child: ListTile(
                                        leading: Padding(
                                          padding: EdgeInsets.only(
                                              top: 4.0, left: 4.0),
                                          child: FaIcon(
                                            FontAwesomeIcons.envelope,
                                            size: 30.0,
                                            color: Colors.black,
                                          ),
                                        ),
                                        title: Text('Share Wallet'),
                                        subtitle:
                                            Text('Generate your code here')),
                                  ),
                                  onTap: () => {
                                    futureWalletInvite = createInvite(),
                                    showInviteDialog(context)
                                  },
                                ),
                                if (!(wallet.data!.shared == 1 ? true : false))
                                  const SizedBox(
                                    height: 10,
                                  ),
                                if ((wallet.data!.shared == 1 ? true : false))
                                  const SizedBox(
                                    height: 10,
                                  ),
                                if ((wallet.data!.shared == 1 ? true : false))
                                  GestureDetector(
                                    child: const Card(
                                      child: ListTile(
                                          leading: Padding(
                                            padding: EdgeInsets.only(
                                                top: 4.0, left: 4.0),
                                            child: FaIcon(
                                              FontAwesomeIcons.users,
                                              size: 30.0,
                                              color: Colors.black,
                                            ),
                                          ),
                                          title: Text('Wallet Users'),
                                          subtitle: Text('Check users')),
                                    ),
                                    onTap: () => {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                MembersList(wallet.data)),
                                      )
                                    },
                                  ),
                                const SizedBox(
                                  height: 10,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    );
                  } else if (wallet.hasError) {
                    return Text('${wallet.error}');
                  }
                  return const Center(child: CircularProgressIndicator());
                });
          }),
    );
  }

  showInviteDialog(BuildContext context) {
    return showDialog(
        context: context,
        builder: (context) {
          return FutureBuilder<WalletInvite>(
              future: futureWalletInvite,
              builder: (context, walletInvite) {
                if (walletInvite.hasData) {
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
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          ),
                          Text('Code: ${walletInvite.data!.code}'),
                          Text(
                              'Expires at: ${DateFormat('yyyy-MM-dd HH:mm:ss').format(walletInvite.data!.expireAt)}'),
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: GestureDetector(
                          onTap: () async => {
                            await Share.share(
                                'This is my Wallet Code: ${walletInvite.data!.code}')
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
                } else if (walletInvite.hasError) {
                  return Text('${walletInvite.error}');
                }
                return const Center(child: CircularProgressIndicator());
              });
        });
  }
}
