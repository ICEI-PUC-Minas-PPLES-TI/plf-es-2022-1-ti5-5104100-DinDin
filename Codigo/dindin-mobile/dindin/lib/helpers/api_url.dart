import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';
import 'package:http/http.dart' as http;

class ApiURL {
  static final String baseUrl =
      dotenv.get('API_BASE_URL', fallback: 'http://3.133.200.9:3001/api/');

  static Future<String> getToken() async {
    final prefs = await StreamingSharedPreferences.instance;
    final Preference<String> token =
        prefs.getString("token", defaultValue: ' ');
    return token.getValue();
  }

  static Future<http.Response> get(String route) async {
    var url = baseUrl + route;
    final Uri uri = Uri.parse(url);
    var token = await getToken();
    return http.get(uri, headers: {'Authorization': token});
  }

  static Future<http.Response> post(String route, {dynamic body}) async {
    var url = baseUrl + route;
    final Uri uri = Uri.parse(url);
    var token = await getToken();
    return http.post(uri, headers: {'Authorization': token}, body: body);
  }

  static Future<http.Response> put(String route, {dynamic body}) async {
    var url = baseUrl + route;
    final Uri uri = Uri.parse(url);
    var token = await getToken();
    return http.put(uri, headers: {'Authorization': token}, body: body);
  }

  static Future<http.Response> delete(String route) async {
    var url = baseUrl + route;
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    return http.delete(uri, headers: {'Authorization': token});
  }
}
