import 'package:dindin/helpers/color_helper.dart';

import 'package:dindin/models/balance_item.dart';

import 'package:flutter/material.dart';

class ChartLegendList extends StatelessWidget {
  final List<BalanceItem> items;
  final bool showValue;

  const ChartLegendList(this.items, this.showValue, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: items.length * 62.5,
      child: items.isEmpty
          ? Column(
        children: const <Widget>[
          Text(
            'No Legend',
          ),
        ],
      )
          : Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          physics: const NeverScrollableScrollPhysics(),
          itemBuilder: (ctx, index) {
            return Container(
              margin: const EdgeInsets.only(bottom: 10.0),
              child: Row(
                children: [
                  Container(
                    width: 25.0,
                    height: 25.0,
                    child: Container(
                      decoration: BoxDecoration(
                        color: items[index].color
                      ),
                    ),
                  ),
                  Text(
                    '  ${items[index].description} ${showValue? ': \$${items[index].value}': ''}',
                    style: const TextStyle(
                        color: Colors.black),
                  ),
                ],
              ),
            );
          },
          itemCount: items.length,
        ),
      ),
    );
  }
}
