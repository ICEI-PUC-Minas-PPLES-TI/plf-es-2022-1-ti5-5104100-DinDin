import 'package:flutter/material.dart';

import './goal/index.dart';
import './category/list_categories.dart';
import './profile/index.dart';

class Dashboard extends StatelessWidget{
  const Dashboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text('Dashboard'),
            backgroundColor: Theme.of(context).primaryColor
          ),
          body: Column(
            children: [
              const SizedBox(height: 20),
              SizedBox(
                height: 40,
                width: double.infinity,
                child: ElevatedButton(
                  child: const Text("Goals"),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              const GoalList()),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                height: 40,
                width: double.infinity,
                child: ElevatedButton(
                  child: const Text("Categories"),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              const ListCategories()),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                height: 40,
                width: double.infinity,
                child: ElevatedButton(
                  child: const Text("Profile"),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              const ProfilePage()),
                    );
                  },
                ),
              ),
            ],
          ));
            
  }
  
}