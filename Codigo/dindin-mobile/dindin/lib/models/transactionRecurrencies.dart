class TransactionRecurrencies {
  final int id;
  final String interval;
  final String? expiredAt;

  TransactionRecurrencies({
    required this.id,
    required this.interval,
    required this.expiredAt,
  });

  factory TransactionRecurrencies.fromJson(Map<String, dynamic> json) {
    return TransactionRecurrencies(
        id: int.parse(json['id']),
        interval: json['interval'],
        expiredAt: json['expired_at']);
  }
  
}