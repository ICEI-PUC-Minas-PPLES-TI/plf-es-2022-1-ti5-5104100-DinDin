import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class ApiURL {
  static const baseUrl = 'http://3.133.200.9:3001/api/';

  static Future<String> getToken() async{
    final prefs = await StreamingSharedPreferences.instance;
    final Preference<String> token =  prefs.getString("token", defaultValue: ' ');
    return token.getValue();
  }
}