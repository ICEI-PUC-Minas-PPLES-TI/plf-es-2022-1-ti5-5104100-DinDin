class User {
  final num id;
  final String name;
  final String email;
  final String? firebaseId;
  final String? createdAt;
  final String? updatedAt;
  final String? deletedAt;

  const User({
    required this.id,
    required this.name,
    required this.email,
    required this.firebaseId,
    required this.createdAt,
    required this.updatedAt,
    required this.deletedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      firebaseId: json['firebaseId'],
      createdAt: json['created_at'],
      updatedAt: json['updated_at'],
      deletedAt: json['deleted_at'],
    );
  }
}
