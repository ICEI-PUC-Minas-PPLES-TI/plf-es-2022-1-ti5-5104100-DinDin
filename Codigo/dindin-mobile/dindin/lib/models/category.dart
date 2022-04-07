class Category {
  final int id;
  final int user_id;
  final int wallet_id;
  final String description;
  final String type;
  final String color;

  Category({
    required this.id,
    required this.user_id,
    required this.wallet_id,
    required this.description,
    required this.type,
    required this.color,
  });
}