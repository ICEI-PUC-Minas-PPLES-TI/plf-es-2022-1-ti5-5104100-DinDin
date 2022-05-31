import 'dart:convert';
import 'package:dindin/models/balance_item.dart';
import 'package:dindin/widgets/chart_legend_list.dart';
import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;

import 'package:dindin/helpers/api_url.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'dart:math' as math;

class ReportBalance extends StatefulWidget {
  const ReportBalance({Key? key}) : super(key: key);

  @override
  _ReportBalanceState createState() => _ReportBalanceState();
}

class _ReportBalanceState extends State<ReportBalance> {

  List<charts.Series<BalanceItem, String>> chartBalance = [
    charts.Series<BalanceItem, String>(
      id: 'Balance',
      colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
      domainFn: (BalanceItem balance, _) => balance.description,
      measureFn: (BalanceItem balance, _) => balance.value,
      data: [],
      labelAccessorFn: (BalanceItem balance, _) => balance.description,
    )
  ];

  List<charts.Series<BalanceItem, String>> chartWeekBalance = [
    charts.Series<BalanceItem, String>(
      id: 'Week Balance',
      colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
      domainFn: (BalanceItem balance, _) => balance.description,
      measureFn: (BalanceItem balance, _) => balance.value,
      data: [],
      labelAccessorFn: (BalanceItem balance, _) => balance.description,
    )
  ];

  List<charts.Series<BalanceItem, String>> chartCategoryBalance = [
    charts.Series<BalanceItem, String>(
      id: 'Category Balance',
      colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
      domainFn: (BalanceItem balance, _) => balance.description,
      measureFn: (BalanceItem balance, _) => balance.value,
      data: [],
      labelAccessorFn: (BalanceItem balance, _) => balance.description,
    )
  ];

  @override
  void initState() {
    super.initState();
    getBalanceData();
    getWeekBalanceData();
    getCategoryBalanceData();
  }

  void getBalanceData() async{
    var url = ApiURL.baseUrl + "/report/balance";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    if(response.statusCode == 200) {
      var json = jsonDecode(response.body);
      final data = [
        BalanceItem('Incoming', double.parse(json['incoming'].toString()), Colors.green.shade600),
        BalanceItem('Outcome', double.parse(json['outcoming'].toString()), Colors.red.shade600)
      ];
      setState(() {
        chartBalance = _createBalanceData(data);
      });
    }
  }

  void getWeekBalanceData() async{
    var url = ApiURL.baseUrl + "/report/dailybalance";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    if(response.statusCode == 200) {
      var json = jsonDecode(response.body);
      List<BalanceItem> dataIn = [];
      List<BalanceItem> dataOut = [];
      final DateFormat formatter = DateFormat('MM/dd');
      json.forEach((row) => {
        dataIn.add(BalanceItem(formatter.format(DateTime.parse(row['dt'])), double.parse(row['incoming'].toString()), Colors.green.shade600)),
        dataOut.add(BalanceItem(formatter.format(DateTime.parse(row['dt'])), double.parse(row['outcoming'].toString()), Colors.red.shade600))
      });
      setState(() {
        chartWeekBalance = _createWeeklyBalanceData(dataIn, dataOut);
      });
    }
  }

  void getCategoryBalanceData() async {
    var url = ApiURL.baseUrl + "/report/category";
    final Uri uri = Uri.parse(url);
    var token = await ApiURL.getToken();
    var response = await http.get(uri, headers: {'Authorization': token});
    if(response.statusCode == 200) {
      var json = jsonDecode(response.body);
      List<BalanceItem> data = [];
      json.forEach((row) => {
        data.add(BalanceItem(row['description'], double.parse(row['total'].toString()), Color((math.Random().nextDouble() * 0xFFFFFF).toInt()).withOpacity(1.0)))
      });
      setState(() {
        chartCategoryBalance = _createBalanceData(data);
      });
    }
  }


  List<charts.Series<BalanceItem, String>> _createBalanceData(List<BalanceItem> data) {
    return [
      charts.Series<BalanceItem, String>(
        id: 'Balance',
        colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
        domainFn: (BalanceItem balance, _) => balance.description,
        measureFn: (BalanceItem balance, _) => balance.value,
        data: data,
        labelAccessorFn: (BalanceItem balance, _) => balance.description,
      )
    ];
  }

  List<charts.Series<BalanceItem, String>> _createWeeklyBalanceData(List<BalanceItem> incomingArray, List<BalanceItem> outcomingArray) {

    return [
      charts.Series<BalanceItem, String>(
        id: 'Outcome',
        colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
        domainFn: (BalanceItem balance, _) => balance.description,
        measureFn: (BalanceItem balance, _) => balance.value,
        data: outcomingArray,
        labelAccessorFn: (BalanceItem balance, _) => balance.description,
      ),
      charts.Series<BalanceItem, String>(
        id: 'Incoming',
        colorFn: (BalanceItem balance, _) => charts.ColorUtil.fromDartColor(balance.color),
        domainFn: (BalanceItem balance, _) => balance.description,
        measureFn: (BalanceItem balance, _) => balance.value,
        data: incomingArray,
        labelAccessorFn: (BalanceItem balance, _) => balance.description,
      )
    ];
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Balance Report'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32.0),
        child: ListView(
          children: [
            Column(
              children: [
                const SizedBox(
                  height: 20,
                ),
                const Text("Balance Overview"),
                Container(
                  width: 200.0,
                  height: 200.0,
                  child: charts.PieChart(
                      chartBalance,
                      animate: true,
                  ),
                ),
                ChartLegendList(chartBalance[0].data, true),
                const Text("Last Week Balance Overview"),
                Container(
                  width: double.infinity,
                  height: 200.0,
                  child: charts.BarChart(
                    chartWeekBalance,
                    animate: true,
                    barGroupingType: charts.BarGroupingType.stacked,
                  ),
                ),
                ChartLegendList(chartBalance[0].data, false),
                const Text("Category Overview"),
                Container(
                  width: 200.0,
                  height: 200.0,
                  child: charts.PieChart(
                    chartCategoryBalance,
                    animate: true,
                  ),
                ),
                ChartLegendList(chartCategoryBalance[0].data, true),
              ],
            )
          ],
        ),
      ),
    );;
  }
}



