class Transaction {
  final int id;
  final double value;
  final String categoryIcon;
  final String categoryColor;
  final String description;
  final String createdAt;

  const Transaction(
      {required this.value,
      required this.categoryIcon,
      required this.categoryColor,
      required this.description,
      required this.createdAt,
      required this.id});

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'],
      value: json['value'],
      categoryIcon: json['categoryIcon'],
      description: json['description'],
      categoryColor: json['categoryColor'],
      createdAt: json['createdAt'],
    );
  }
}
