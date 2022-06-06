class WalletInvite {
  final num id;
  final num walletId;
  final num userId;
  final String code;
  final DateTime expireAt;
  final DateTime createdAt;

  WalletInvite({
    required this.id,
    required this.walletId,
    required this.userId,
    required this.code,
    required this.expireAt,
    required this.createdAt,
  });

  factory WalletInvite.fromJson(Map<String, dynamic> json) {
    return WalletInvite(
      id: json['id'],
      walletId: int.parse(json['wallet_id']),
      userId: json['user_id'],
      code: json['code'].toString(),
      expireAt: DateTime.parse(json['expire_at']),
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}
