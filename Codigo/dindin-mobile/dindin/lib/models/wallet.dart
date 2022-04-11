class Wallet {
  final int id;
  final String description;
  final double? currentValue;
  final int shared;
  final String? createdAt;
  final String? updatedAt;
  final String? deletedAt;

  const Wallet({
    required this.id,
    required this.description,
    required this.currentValue,
    required this.shared,
    required this.createdAt,
    required this.updatedAt,
    required this.deletedAt,
  });

  factory Wallet.fromJson(Map<String, dynamic> json) {
    return Wallet(
      id: json['id'],
      description: json['description'],
      currentValue: json['current_value'],
      shared: json['shared'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deletedAt: json['deleted_at'],
    );
  }
}
