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
    print(json);
    return Transaction(
      categoryIcon: json['categoryIcon'],
      description: json['description'],
      value: json['value'],
      categoryColor: json['categoryColor'],
      id: json['id'],
      createdAt: json['created_at'],
    );
  }
}
