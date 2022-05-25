import 'package:flutter/material.dart';

class LazyListBuilder<T> extends StatefulWidget {
  final Future<List<T>> Function(int page) fetch;
  final int? maxItems;
  final Widget Function(BuildContext context, T data, int index) itemBuilder;
  const LazyListBuilder(
      {Key? key, required this.fetch, required this.itemBuilder, this.maxItems})
      : super(key: key);

  @override
  _ListScreenState createState() => _ListScreenState<T>();
}

class _ListScreenState<T> extends State<LazyListBuilder<T>> {
  final List<dynamic> _dataList = List.empty(growable: true);

  bool _isLoading = true;
  bool _hasMore = true;
  int _items = 0;
  int? _maxItems;
  late _ItemFetcher<T> _fetcher;

  @override
  void initState() {
    super.initState();
    _fetcher = _ItemFetcher(widget.fetch);
    _isLoading = true;
    _hasMore = true;
    _maxItems = widget.maxItems;
    _loadMore();
  }

  // Triggers fetch() and then add new items or change _hasMore flag
  void _loadMore() {
    _isLoading = true;
    _fetcher.fetch().then((fetchedList) {
      if (fetchedList.isEmpty) {
        setState(() {
          _isLoading = false;
          _hasMore = false;
        });
      } else {
        setState(() {
          _isLoading = false;
          _items += fetchedList.length;
          if (_maxItems != null && _items >= _maxItems!) _hasMore = false;
          _dataList.addAll(fetchedList);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // Need to display a loading tile if more items are coming
      itemCount: _hasMore ? _dataList.length + 1 : _dataList.length,
      // maybe change the shrinkWrap for performance issues
      shrinkWrap: true,
      itemBuilder: (BuildContext context, int index) {
        if (index >= _dataList.length) {
          // Don't trigger if one async loading is already under way
          if (!_isLoading && (_maxItems == null || _maxItems! > _items)) {
            _loadMore();
          }
          return const Center(
            child: SizedBox(
              child: CircularProgressIndicator(),
              height: 24,
              width: 24,
            ),
          );
        }
        // In last case, render using the builder passed as parameter
        return widget.itemBuilder(context, _dataList[index], index);
      },
    );
  }
}

class _ItemFetcher<T> {
  int _currentPage = 1;

  final Future<List<T>> Function(int page) _fetch;

  _ItemFetcher(this._fetch);

  Future<List<T>> fetch() async {
    final List<T> list = await _fetch(_currentPage++);
    return list;
  }
}
