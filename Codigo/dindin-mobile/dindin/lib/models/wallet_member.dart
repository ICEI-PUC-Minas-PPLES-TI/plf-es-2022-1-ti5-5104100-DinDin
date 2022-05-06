class WalletMember {
  final num id;
  final String name;
  final String email;
  final num walletId;

  const WalletMember({
    required this.id,
    required this.name,
    required this.email,
    required this.walletId,
  });

  factory WalletMember.fromJson(Map<String, dynamic> json) {
    return WalletMember(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      walletId: json['wallet_id'],
    );
  }
}
