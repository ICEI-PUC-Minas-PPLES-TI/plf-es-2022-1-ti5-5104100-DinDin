class Category {
  final num id;
  final num userId;
  final num walletId;
  final String? description;
  final String? type;
  final String? color;

  Category({
    required this.id,
    required this.userId,
    required this.walletId,
    required this.description,
    required this.type,
    required this.color,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
        color: json['color'],
        description: json['description'],
        id: int.parse(json['id']),
        type: json['type'],
        userId: json['user_id'],
        walletId: int.parse(json['wallet_id']));
  }
}
