// import 'package:flutter/material.dart';

// class Goals extends StatefulWidget {
//   const Goals({Key? key}) : super(key: key);

//   @override
//   State<Goals> createState() => _GoalsState();
// }

// class _GoalsState extends State<Goals> {
//   @override
//   Widget build(BuildContext context) {
//     const primaryColor = Colors.green;

//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Goals'),
//         backgroundColor: primaryColor,
//       ),
//       body: ListView(
//         children: const <Widget>[
//           Card(
//             child: Padding(
//               padding: EdgeInsets.only(top: 8.0, bottom: 8.0),
//               child: ListTile(
//                 leading: FlutterLogo(size: 56.0),
//                 title: Text('Three-line ListTile'),
//                 trailing: Icon(Icons.more_vert),
//               ),
//             ),
//           ),
//         ],
//       ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {
//           // Add your onPressed code here!
//         },
//         backgroundColor: primaryColor,
//         child: const Icon(Icons.add),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class GoalList extends StatefulWidget {
  const GoalList({Key? key}) : super(key: key);

  @override
  State<GoalList> createState() => _GoalListState();
}

class _GoalListState extends State<GoalList> {
  final String apiUrl = "https://randomuser.me/api/?results=10";

  Future<List<dynamic>> fetchUsers() async {
    var result = await http.get(Uri.parse(apiUrl));
    return json.decode(result.body)['results'];
  }

  String _name(dynamic user) {
    return user['name']['title'] +
        " " +
        user['name']['first'] +
        " " +
        user['name']['last'];
  }

  String _location(dynamic user) {
    return user['location']['country'];
  }

  String _age(Map<dynamic, dynamic> user) {
    return "Age: " + user['dob']['age'].toString();
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Colors.green;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Goals'),
        backgroundColor: primaryColor,
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchUsers(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.hasData) {
            print(_age(snapshot.data[0]));
            return ListView.builder(
                padding: const EdgeInsets.all(8),
                itemCount: snapshot.data.length,
                itemBuilder: (BuildContext context, int index) {
                  return Card(
                    child: Column(
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
                          child: ListTile(
                            leading: const Padding(
                              padding: EdgeInsets.only(top: 5.0),
                              child: FaIcon(
                                FontAwesomeIcons.bullseye,
                                size: 30.0,
                                color: Colors.redAccent,
                              ),
                            ),
                            title: Text(_name(snapshot.data[index])),
                            trailing: Text(_age(snapshot.data[index])),
                          ),
                        )
                      ],
                    ),
                  );
                });
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your onPressed code here!
        },
        backgroundColor: primaryColor,
        child: const Icon(Icons.add),
      ),
    );
  }
}
