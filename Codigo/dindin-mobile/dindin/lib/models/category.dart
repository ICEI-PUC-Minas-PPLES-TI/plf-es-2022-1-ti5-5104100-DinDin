class Category {
  final int id;
  final int userId;
  final int walletId;
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
}
