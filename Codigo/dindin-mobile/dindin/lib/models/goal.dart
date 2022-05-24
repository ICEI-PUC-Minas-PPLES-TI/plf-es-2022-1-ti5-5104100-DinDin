class Goal {
  final num id;
  final String description;
  final num? value;
  final String? status;
  final String? type;
  final String? expireAt;
  final num? walletId;
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
    required this.createdAt,
    required this.updatedAt,
    required this.deletedAt,
  });

  factory Goal.fromJson(Map<String, dynamic> json) {
    return Goal(
      id: int.parse(json['id']),
      description: json['description'],
      value: json['value'],
      status: json['status'],
      type: json['type'],
      expireAt: json['expire_at'],
      walletId: int.parse(json['wallet_id']),
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deletedAt: json['deleted_at'],
    );
  }
}
