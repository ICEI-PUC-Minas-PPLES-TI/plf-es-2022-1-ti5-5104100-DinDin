import 'package:dindin/models/wallet.dart';

class Goal {
  final num id;
  final String description;
  final num? value;
  final String? status;
  final String? type;
  final String? expireAt;
  final num? walletId;
  final Wallet? wallet;
  final String? createdAt;
  final String? updatedAt;
  final String? deletedAt;

  const Goal({
    required this.id,
    required this.description,
    required this.value,
    required this.status,
    required this.type,
    required this.expireAt,
    required this.walletId,
    required this.wallet,
    required this.createdAt,
    required this.updatedAt,
    required this.deletedAt,
  });

  factory Goal.fromJson(Map<String, dynamic> json) {
    dynamic wallet = json['wallet'];
    return Goal(
      id: int.parse(json['id']),
      description: json['description'].toString(),
      value: json['value'],
      status: json['status'].toString(),
      type: json['type'].toString(),
      expireAt: json['expire_at'].toString(),
      walletId: int.parse(json['wallet_id']),
      wallet: wallet.toString().isEmpty ? Wallet.fromJson(json['wallet']) : null,
      createdAt: json['created_at'].toString(),
      updatedAt: json['updated_at'].toString(),
      deletedAt: json['deleted_at'].toString(),
    );
  }
}
