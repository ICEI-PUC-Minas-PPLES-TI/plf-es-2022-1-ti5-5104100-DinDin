import 'package:dindin/models/category.dart';

class Transaction {
  final String id;
  final num value;
  final Category? category;
  final String description;
  final String createdAt;

  const Transaction(
      {required this.value,
      required this.description,
      required this.createdAt,
      required this.id,
      required this.category});

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      value: json['value'],
      category:
          json['category'] != null ? Category.fromJson(json['category']) : null,
      description: json['description'],
      createdAt: json['created_at'],
    );
  }
}
