import 'package:flutter/material.dart';

class BalanceItem {
  final String description;
  final double value;
  final Color color;

  BalanceItem(this.description, this.value, this.color);

  @override
  String toString() {
    // TODO: implement toString
    return "description:$description;value:$value";
  }
}