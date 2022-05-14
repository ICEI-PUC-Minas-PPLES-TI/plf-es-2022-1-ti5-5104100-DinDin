import 'package:dindin/pages/wallet/create.dart';
import 'package:dindin/models/wallet_member.dart';
import 'package:share_plus/share_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class MembersList extends StatefulWidget {
  const MembersList({Key? key}) : super(key: key);

  @override
  State<MembersList> createState() => _MembersListState();
}

Future<List<WalletMember>> fetchMembers() async {
  List<WalletMember> membersList = <WalletMember>[];

  final String response =
      await rootBundle.loadString('assets/data/walletMembers.json');
  final walletsMembersJson = jsonDecode(response)['walletMembers'];
  for (var member in walletsMembersJson) {
    membersList.add(WalletMember.fromJson(member));
  }
  return membersList;
}

class _MembersListState extends State<MembersList> {
  late Future<List<WalletMember>> members;
  String inviteCode = "AAAA12333";
  String inviteExpireDate = "17/05/2022";
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
  showDeleteDialog(BuildContext context) {

  // set up the buttons
  Widget cancelButton = TextButton(
    child: const Text("No"),
    onPressed:  () {Navigator.of(context).pop();},
  );
  Widget continueButton = TextButton(
    child: const Text("Yes"),
    onPressed:  () {Navigator.of(context).pop();},
  );

  // set up the AlertDialog
  AlertDialog alert = AlertDialog(
    title: Text("Delete User"),
    content: Text("Would you like to delete user from wallet?"),
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
  @override
  void initState() {
    super.initState();
    members = fetchMembers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wallet Members'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchMembers(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            return ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: InkWell(
                      onTap: () {},
                      child: Padding(
                        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                        child: ListTile(
                          leading: const Padding(
                            padding: EdgeInsets.only(top: 5.0),
                            child: FaIcon(FontAwesomeIcons.user,
                                size: 20.0, color: Colors.black),
                          ),
                          trailing: GestureDetector(
                            onTap: () => {showDeleteDialog(context)},
                            child: const Padding(
                              padding: EdgeInsets.only(top: 5.0),
                              child: FaIcon(FontAwesomeIcons.trash,
                                  size: 20.0, color: Colors.red),
                            ),
                          ),
                          title: Text((snapshot.data[index].name)),
                        ),
                      ),
                    ),
                  );
                });
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async=> {
          await Share.share('This is my Wallet Code: $inviteCode')
        },
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.share),
      ),
    );
  }
}
