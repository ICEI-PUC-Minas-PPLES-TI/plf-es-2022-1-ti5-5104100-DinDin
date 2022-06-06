import 'package:dindin/models/user.dart';

class Wallet {
  final num id;
  final String? description;
  final num? currentValue;
  final num shared;
  final String? createdAt;
  final String? updatedAt;
  final String? deletedAt;
  final User? owenerUser;

  Wallet(
      {required this.id,
      required this.description,
      required this.currentValue,
      required this.shared,
      required this.createdAt,
      required this.updatedAt,
      required this.deletedAt,
      this.owenerUser});

  factory Wallet.fromJson(Map<String, dynamic> json) {
    return Wallet(
        id: int.parse(json['id']),
        description: (json['description']).toString(),
        currentValue: json['initial_value'],
        shared: json['shared'] ? 1 : 0,
        createdAt: json['created_at'].toString(),
        updatedAt: json['updated_at'].toString(),
        deletedAt: json['deleted_at'],
        owenerUser: User.fromJson(json['owner_user']));
  }
}
