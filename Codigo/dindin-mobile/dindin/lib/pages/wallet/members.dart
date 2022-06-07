import 'package:dindin/helpers/api_url.dart';
import 'package:dindin/models/wallet.dart';
import 'package:dindin/models/wallet_invite.dart';
import 'package:dindin/models/wallet_member.dart';
import 'package:intl/intl.dart';
import 'package:share_plus/share_plus.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class MembersList extends StatefulWidget {
  final Wallet? wallet;

  const MembersList(this.wallet, {Key? key}) : super(key: key);

  @override
  State<MembersList> createState() => _MembersListState();
}

class _MembersListState extends State<MembersList> {
  late Wallet wallet;

  late Future<List<WalletMember>> members;
  late Future<WalletInvite> futureWalletInvite;
  late Future<num> userId;

  String inviteCode = "AAAA12333";
  String inviteExpireDate = "17/05/2022";

  @override
  void initState() {
    setState(() {
      wallet = widget.wallet!;
    });
    userId = getUserId();
    members = fetchMembers();
    super.initState();
  }

  Future<List<WalletMember>> fetchMembers() async {
    List<WalletMember> membersList = <WalletMember>[];

    final url =
        ApiURL.baseUrl + "/wallet/" + wallet.id.toString() + "/users?page=1";
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.get(uri, headers: {'Authorization': token});
    if (response.statusCode == 200) {
      final walletsMembersJson = jsonDecode(response.body)['users'];

      for (var member in walletsMembersJson) {
        membersList.add(WalletMember.fromJson(member));
      }

      return membersList;
    } else {
      throw Exception('Failed to load wallet users');
    }
  }

  Future<WalletInvite> createInvite() async {
    final url = ApiURL.baseUrl + "/wallet/" + wallet.id.toString() + "/invite";
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.post(uri, headers: {'Authorization': token});
    if (response.statusCode == 201) {
      final json = jsonDecode(response.body)['invite'];
      final WalletInvite walletInvite = WalletInvite.fromJson(json);

      return walletInvite;
    } else {
      throw Exception('Failed to create wallet invite');
    }
  }

  Future<void> removeUser(num idToDelete) async {
    final url = ApiURL.baseUrl +
        "/wallet/" +
        wallet.id.toString() +
        "/users/" +
        idToDelete.toString();
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.delete(uri, headers: {'Authorization': token});
    if (response.statusCode == 204) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('User removed')),
      );
    } else {
      throw Exception('Failed to load remove user');
    }
  }

  Future<num> getUserId() async {
    final url = ApiURL.baseUrl + "/user";
    final Uri uri = Uri.parse(url);
    final token = await ApiURL.getToken();
    final response = await http.get(uri, headers: {'Authorization': token});
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final id = json['id'];
      return id;
    } else {
      throw Exception('Failed to load user');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet Members'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: FutureBuilder<num>(
          future: userId,
          builder: (context, userId) {
            return FutureBuilder<List<WalletMember>>(
              future: members,
              builder: (BuildContext context, AsyncSnapshot walletMembers) {
                if (walletMembers.hasData) {
                  return ListView.builder(
                      padding: const EdgeInsets.all(8),
                      itemCount: walletMembers.data.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Card(
                          child: InkWell(
                            onTap: () {},
                            child: Padding(
                              padding:
                                  const EdgeInsets.only(top: 8.0, bottom: 8.0),
                              child: ListTile(
                                leading: const Padding(
                                  padding: EdgeInsets.only(top: 5.0),
                                  child: FaIcon(FontAwesomeIcons.user,
                                      size: 20.0, color: Colors.black),
                                ),
                                trailing: GestureDetector(
                                  onTap: () => {
                                    (wallet.owenerUser!.id == userId.data) &&
                                            (walletMembers.data[index].id !=
                                                userId.data)
                                        ? showDeleteDialog(
                                            context,
                                            walletMembers.data[index].id,
                                            walletMembers,
                                            index)
                                        : null
                                  },
                                  child: Padding(
                                    padding: const EdgeInsets.only(top: 5.0),
                                    child: FaIcon(
                                        (wallet.owenerUser!.id ==
                                                    userId.data) &&
                                                (walletMembers.data[index].id !=
                                                    userId.data)
                                            ? FontAwesomeIcons.trash
                                            : null,
                                        size: 20.0,
                                        color: Colors.red),
                                  ),
                                ),
                                title: Text((walletMembers.data[index].name)),
                              ),
                            ),
                          ),
                        );
                      });
                } else {
                  return const Center(child: CircularProgressIndicator());
                }
              },
            );
          }),
      floatingActionButton: FloatingActionButton(
        onPressed: () =>
            {futureWalletInvite = createInvite(), showInviteDialog(context)},
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.share),
      ),
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

  showDeleteDialog(BuildContext context, num idToDelete,
      AsyncSnapshot walletMembers, num index) {
    // set up the buttons
    Widget cancelButton = TextButton(
      child: const Text("No"),
      onPressed: () {
        Navigator.of(context).pop();
      },
    );
    Widget continueButton = TextButton(
      child: const Text("Yes"),
      onPressed: () {
        removeUser(idToDelete);
        setState(() {
          walletMembers.data.removeAt(index);
        });
        Navigator.of(context).pop();
      },
    );

    // set up the AlertDialog
    AlertDialog alert = AlertDialog(
      title: const Text("Delete User"),
      content: const Text("Would you like to delete user from wallet?"),
      actions: [
        cancelButton,
        continueButton,
      ],
    );

    // show the dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return alert;
      },
    );
  }
}
