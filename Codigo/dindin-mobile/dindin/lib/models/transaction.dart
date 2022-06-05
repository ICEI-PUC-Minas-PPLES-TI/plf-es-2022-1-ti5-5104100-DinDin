import 'package:dindin/models/category.dart';
import 'package:dindin/models/transactionRecurrencies.dart';
import 'package:dindin/models/wallet.dart';

class Transaction {
  final String id;
  final num value;
  final Category? category;
  final TransactionRecurrencies? transactionRecurrencies;
  final String walletId;
  final String date;
  final String description;
  final String createdAt;

  const Transaction(
      {required this.value,
      required this.description,
      required this.createdAt,
      required this.id,
      required this.category,
      required this.date,
      required this.walletId,
      required this.transactionRecurrencies,
      });

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      value: json['value'],
      category:
          json['category'] != null ? Category.fromJson(json['category']) : null,
      description: json['description'],
      createdAt: json['created_at'],
      walletId: json['wallet_id'],
      date: json['date'],
      transactionRecurrencies: json['transaction_recurrencies'] != null ? TransactionRecurrencies.fromJson(json['transaction_recurrencies']) : null,
    );
  }
}
