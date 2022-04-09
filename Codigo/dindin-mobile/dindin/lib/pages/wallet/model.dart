class Wallet {
  final int id;
  final String description;
  final double? current_value;
  final int shared;
  final String? createdAt;
  final String? updatedAt;
  final String? deletedAt;

  const Wallet({
    required this.id,
    required this.description,
    required this.current_value,
    required this.shared,
    required this.createdAt,
    required this.updatedAt,
    required this.deletedAt,
  });

  factory Wallet.fromJson(Map<String, dynamic> json) {
    return Wallet(
      id: json['id'],
      description: json['description'],
      current_value: json['current_value'],
      shared: json['shared'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deletedAt: json['deleted_at'],
    );
  }
}