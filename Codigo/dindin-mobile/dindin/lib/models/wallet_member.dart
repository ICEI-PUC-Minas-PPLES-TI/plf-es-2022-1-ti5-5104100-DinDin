class WalletMember {
  final num id;
  final String name;
  final String email;

  const WalletMember({
    required this.id,
    required this.name,
    required this.email,
  });

  factory WalletMember.fromJson(Map<String, dynamic> json) {
    return WalletMember(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}
