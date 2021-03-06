(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (factory((global.Datafeeds = {})));
}(this, (function (exports) {
  'use strict';
  const PERIODLIST = ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the 'License'); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  let extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function (d, b) {
    d.__proto__ = b;
  }) || function (d, b) {
    for (let p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
  };

  function __extends(d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /**
   * If you want to enable logs from datafeed set it to `true`
   */
  let isLoggingEnabled = false;

  function logMessage(message) {
    if (isLoggingEnabled) {
      let now = new Date();
      console.log(now.toLocaleTimeString() + '.' + now.getMilliseconds() + '> ' + message);
    }
  }

  function getErrorMessage(error) {
    if (error === undefined) {
      return '';
    } else if (typeof error === 'string') {
      return error;
    }
    return error.message;
  }

  // 日期格式化
  Date.prototype.format = function (format) {
    var o = {
      'M+': this.getMonth() + 1, // month
      'd+': this.getDate(), // day
      'h+': this.getHours(), // hour
      'm+': this.getMinutes(), //  minute
      's+': this.getSeconds(), // second
      'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
      'S': this.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  };

  // 日期格式化 format|| 'yyyy-MM-dd';
  function formatDate(date, f = 'yyyy-MM-dd') {
    return date ? new Date(date).format(f) : '--';
  }

  let HistoryProvider = /** @class */ (function () {
    function HistoryProvider(datafeedUrl, requester) {
      this._datafeedUrl = datafeedUrl;
      this._requester = requester;
    }

    HistoryProvider.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate) {
      let period = '';
      let foramtList = {
        '1': '1min',
        '5': '5min',
        '15': '15min',
        '30': '30min',
        '60': '60min',
        '240': '4hour',
        '1D': '1day',
        '1W': '1week',
        '1M': '1mon'
      };
      period = foramtList[resolution];
      let requestParams = {
        symbol: 'FMVP',
        toSymbol: symbolInfo.toSymbol || 'BTC',
        period: period,
        resolution: resolution,
        startDatetime: formatDate(new Date(rangeStartDate * 1000), 'yyyy-MM-dd hh:mm'),
        endDatetime: formatDate(new Date(rangeEndDate * 1000), 'yyyy-MM-dd hh:mm')
      };

      // 保存下一次结束时间 这一次结尾时间是前一次的开始时间 时间是右往左
      if ($('#tv_chart_container').attr('firstLoad') === '1') {
        $('#tv_chart_container').attr('startDatetime', requestParams.startDatetime);
        requestParams.endDatetime = $('#tv_chart_container').attr('startDatetime');
      }
      let sendParam = {
        code: '650066',
        json: JSON.stringify(requestParams)
      };
      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'post',
          url: '/api',
          data: sendParam
        }).then(function (res) {
          let response = res.data;
          let bars = [];
          let meta = {
            noData: false
          };
          // 如果是第一次加载
          if ($('#tv_chart_container').attr('firstLoad') === '0') {
            $('#tv_chart_container').attr('firstLoad', '1');
            // 这一次结尾时间是前一次的开始时间 时间是右往左
            $('#tv_chart_container').attr('startDatetime', requestParams.startDatetime);
          }
          if (response.length <= 0) {
            meta.noData = true;
          } else {
            for (let i = 0; i < response.length; ++i) {
              let barValue = {
                time: Date.parse(new Date(response[i].startDatetime)),
                close: response[i].close,
                open: response[i].open,
                high: response[i].high,
                low: response[i].low,
                volume: response[i].volume,
                isBarClosed: true,
                isLastBar: false
              };
              if (i === response.length - 1) {
                barValue.isBarClosed = false;
                barValue.isLastBar = true;
              }
              bars.push(barValue);
            }
          }
          // 500数据线限制
          if (bars.length >= 500) {
            $('#tv_chart_container').attr('startDatetime', bars[499].time);
          }
          // console.log(bars, meta);
          resolve({
            bars: bars,
            meta: meta
          });
        }).fail(function (error) {
          error && logMessage(error);
        });
      });
    };

    return HistoryProvider;
  }());

  let DataPulseProvider = /** @class */ (function () {
    function DataPulseProvider(historyProvider, updateFrequency) {
      this._subscribers = {};
      this._requestsPending = 0;
      this._historyProvider = historyProvider;
      setInterval(this._updateData.bind(this), updateFrequency);
    }

    DataPulseProvider.prototype.subscribeBars = function (symbolInfo, resolution, newDataCallback, listenerGuid) {
      if (this._subscribers.hasOwnProperty(listenerGuid)) {
        logMessage('DataPulseProvider: already has subscriber with id=' + listenerGuid);
        return;
      }
      this._subscribers[listenerGuid] = {
        lastBarTime: null,
        listener: newDataCallback,
        resolution: resolution,
        symbolInfo: symbolInfo
      };
      logMessage('DataPulseProvider: subscribed for #' + listenerGuid + ' - {' + symbolInfo.name + ', ' + resolution + '}');
    };
    DataPulseProvider.prototype.unsubscribeBars = function (listenerGuid) {
      delete this._subscribers[listenerGuid];
      logMessage('DataPulseProvider: unsubscribed for #' + listenerGuid);
    };
    DataPulseProvider.prototype._updateData = function () {
      let this$1 = this;

      let _this = this;
      if (this._requestsPending > 0) {
        return;
      }
      this._requestsPending = 0;
      let _loop1 = function (listenerGuid) {
        _this1._requestsPending += 1;
        _this1._updateDataForSubscriber(listenerGuid)
          .then(function () {
            _this1._requestsPending -= 1;
            logMessage('DataPulseProvider: data for #' + listenerGuid + ' updated successfully, pending=' + _this._requestsPending);
          })
          .catch(function (reason) {
            _this1._requestsPending -= 1;
            logMessage('DataPulseProvider: data for #' + listenerGuid + ' updated with error=' + getErrorMessage(reason) + ', pending=' + _this._requestsPending);
          });
      };
      let _this1 = this;
      for (let listenerGuid in this$1._subscribers) {
        _loop1(listenerGuid);
      }
    };
    DataPulseProvider.prototype._updateDataForSubscriber = function (listenerGuid) {
      let _this = this;
      let subscriptionRecord = this._subscribers[listenerGuid];
      let rangeEndTime = parseInt((Date.now() / 1000).toString());
      // BEWARE: please note we really need 2 bars, not the only last one
      // see the explanation below. `10` is the `large enough` value to work around holidays
      let rangeStartTime = rangeEndTime - periodLengthSeconds(subscriptionRecord.resolution, 10);
      return this._historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime)
        .then(function (result) {
          _this._onSubscriberDataReceived(listenerGuid, result);
        });
    };
    DataPulseProvider.prototype._onSubscriberDataReceived = function (listenerGuid, result) {
      // means the subscription was cancelled while waiting for data
      if (!this._subscribers.hasOwnProperty(listenerGuid)) {
        logMessage('DataPulseProvider: Data comes for already unsubscribed subscription #' + listenerGuid);
        return;
      }
      let bars = result.bars;
      if (bars.length === 0) {
        return;
      }
      let lastBar = bars[bars.length - 1];
      let subscriptionRecord = this._subscribers[listenerGuid];
      if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) {
        return;
      }
      let isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime;
      // Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
      // old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
      if (isNewBar) {
        if (bars.length < 2) {
          throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
        }
        let previousBar = bars[bars.length - 2];
        subscriptionRecord.listener(previousBar);
      }
      subscriptionRecord.lastBarTime = lastBar.time;
      subscriptionRecord.listener(lastBar);
    };
    return DataPulseProvider;
  }());

  function periodLengthSeconds(resolution, requiredPeriodsCount) {
    let daysCount = 0;
    if (resolution === 'D' || resolution === '1D') {
      daysCount = requiredPeriodsCount;
    } else if (resolution === 'M' || resolution === '1M') {
      daysCount = 31 * requiredPeriodsCount;
    } else if (resolution === 'W' || resolution === '1W') {
      daysCount = 7 * requiredPeriodsCount;
    } else {
      daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60);
    }
    return daysCount * 24 * 60 * 60;
  }

  let QuotesPulseProvider = /** @class */ (function () {
    function QuotesPulseProvider(quotesProvider) {
      this._subscribers = {};
      this._requestsPending = 0;
      this._quotesProvider = quotesProvider;
      setInterval(this._updateQuotes.bind(this, 1), 10000);
      setInterval(this._updateQuotes.bind(this, 0), 60000);
    }

    QuotesPulseProvider.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
      this._subscribers[listenerGuid] = {
        symbols: symbols,
        fastSymbols: fastSymbols,
        listener: onRealtimeCallback
      };
      logMessage('QuotesPulseProvider: subscribed quotes with #' + listenerGuid);
    };
    QuotesPulseProvider.prototype.unsubscribeQuotes = function (listenerGuid) {
      delete this._subscribers[listenerGuid];
      logMessage('QuotesPulseProvider: unsubscribed quotes with #' + listenerGuid);
    };
    QuotesPulseProvider.prototype._updateQuotes = function (updateType) {
      let this$1 = this;

      let _this = this;
      if (this._requestsPending > 0) {
        return;
      }
      let _loop1 = function (listenerGuid) {
        _this1._requestsPending++;
        let subscriptionRecord = _this1._subscribers[listenerGuid];
        _this1._quotesProvider.getQuotes(updateType === 1 /* Fast */ ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols)
          .then(function (data) {
            _this._requestsPending--;
            if (!_this._subscribers.hasOwnProperty(listenerGuid)) {
              return;
            }
            subscriptionRecord.listener(data);
            logMessage('QuotesPulseProvider: data for #' + listenerGuid + ' (' + updateType + ') updated successfully, pending=' + _this._requestsPending);
          })
          .catch(function (reason) {
            _this._requestsPending--;
            logMessage('QuotesPulseProvider: data for #' + listenerGuid + ' (' + updateType + ') updated with error=' + getErrorMessage(reason) + ', pending=' + _this._requestsPending);
          });
      };
      let _this1 = this;
      for (let listenerGuid in this$1._subscribers) {
        _loop1(listenerGuid);
      }
    };
    return QuotesPulseProvider;
  }());

  function extractField$1(data, field, arrayIndex) {
    let value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
  }

  let SymbolsStorage = /** @class */ (function () {
    function SymbolsStorage(datafeedUrl, datafeedSupportedResolutions, requester) {
      this._exchangesList = ['NYSE', 'FOREX', 'AMEX'];
      this._symbolsInfo = {};
      this._symbolsList = [];
      this._datafeedUrl = datafeedUrl;
      this._datafeedSupportedResolutions = datafeedSupportedResolutions;
      this._requester = requester;
      this._readyPromise = this._init();
      this._readyPromise.catch(function (error) {
        // seems it is impossible
        console.error('SymbolsStorage: Cannot init, error=' + error.toString());
      });
    }

    // BEWARE: this function does not consider symbol's exchange
    SymbolsStorage.prototype.resolveSymbol = function (symbolName) {
      let _this = this;
      return this._readyPromise.then(function () {
        let symbolInfo = _this._symbolsInfo[symbolName];
        if (symbolInfo === undefined) {
          return Promise.reject('invalid symbol');
        }
        return Promise.resolve(symbolInfo);
      });
    };
    SymbolsStorage.prototype.searchSymbols = function (searchString, exchange, symbolType, maxSearchResults) {
      let _this = this;
      return this._readyPromise.then(function () {
        let weightedResult = [];
        let queryIsEmpty = searchString.length === 0;
        searchString = searchString.toUpperCase();
        let _loop1 = function (symbolName) {
          let symbolInfo = _this._symbolsInfo[symbolName];
          if (symbolInfo === undefined) {
            return 'continue';
          }
          if (symbolType.length > 0 && symbolInfo.type !== symbolType) {
            return 'continue';
          }
          if (exchange && exchange.length > 0 && symbolInfo.exchange !== exchange) {
            return 'continue';
          }
          let positionInName = symbolInfo.name.toUpperCase().indexOf(searchString);
          let positionInDescription = symbolInfo.description.toUpperCase().indexOf(searchString);
          if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
            let alreadyExists = weightedResult.some(function (item) {
              return item.symbolInfo === symbolInfo;
            });
            if (!alreadyExists) {
              let weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
              weightedResult.push({symbolInfo: symbolInfo, weight: weight});
            }
          }
        };
        for (let _i = 0, _a = _this._symbolsList; _i < _a.length; _i++) {
          let symbolName = _a[_i];
          _loop1(symbolName);
        }
        let result = weightedResult
          .sort(function (item1, item2) {
            return item1.weight - item2.weight;
          })
          .slice(0, maxSearchResults)
          .map(function (item) {
            let symbolInfo = item.symbolInfo;
            return {
              symbol: symbolInfo.name,
              full_name: symbolInfo.full_name,
              description: symbolInfo.description,
              exchange: symbolInfo.exchange,
              params: [],
              type: symbolInfo.type,
              ticker: symbolInfo.name
            };
          });
        return Promise.resolve(result);
      });
    };
    SymbolsStorage.prototype._init = function () {
      let this$1 = this;

      let _this = this;
      let promises = [];
      let alreadyRequestedExchanges = {};
      for (let _i = 0, _a = this._exchangesList; _i < _a.length; _i++) {
        let exchange = _a[_i];
        if (alreadyRequestedExchanges[exchange]) {
          continue;
        }
        alreadyRequestedExchanges[exchange] = true;
        promises.push(this$1._requestExchangeData(exchange));
      }
      return Promise.all(promises)
        .then(function () {
          _this._symbolsList.sort();
          logMessage('SymbolsStorage: All exchanges data loaded');
        });
    };
    SymbolsStorage.prototype._requestExchangeData = function (exchange) {
      let _this = this;
      return new Promise(function (resolve, reject) {
        _this._requester.sendRequest(_this._datafeedUrl, 'symbol_info', {group: exchange})
          .then(function (response) {
            try {
              _this._onExchangeDataReceived(exchange, response);
            } catch (error) {
              reject(error);
              return;
            }
            resolve();
          })
          .catch(function (reason) {
            logMessage('SymbolsStorage: Request data for exchange ' + exchange + ' failed, reason=' + getErrorMessage(reason));
            resolve();
          });
      });
    };
    SymbolsStorage.prototype._onExchangeDataReceived = function (exchange, data) {
      let this$1 = this;

      let symbolIndex = 0;
      try {
        let symbolsCount = data.symbol.length;
        let tickerPresent = data.ticker !== undefined;
        for (; symbolIndex < symbolsCount; ++symbolIndex) {
          let symbolName = data.symbol[symbolIndex];
          let listedExchange = extractField$1(data, 'exchange-listed', symbolIndex);
          let tradedExchange = extractField$1(data, 'exchange-traded', symbolIndex);
          let fullName = tradedExchange + ':' + symbolName;
          let ticker = tickerPresent ? extractField$1(data, 'ticker', symbolIndex) : symbolName;
          let symbolInfo = {
            ticker: ticker,
            name: symbolName,
            base_name: [listedExchange + ':' + symbolName],
            full_name: fullName,
            listed_exchange: listedExchange,
            exchange: tradedExchange,
            description: extractField$1(data, 'description', symbolIndex),
            has_intraday: definedValueOrDefault(extractField$1(data, 'has-intraday', symbolIndex), false),
            has_no_volume: definedValueOrDefault(extractField$1(data, 'has-no-volume', symbolIndex), false),
            minmov: extractField$1(data, 'minmovement', symbolIndex) || extractField$1(data, 'minmov', symbolIndex) || 0,
            minmove2: extractField$1(data, 'minmove2', symbolIndex) || extractField$1(data, 'minmov2', symbolIndex),
            fractional: extractField$1(data, 'fractional', symbolIndex),
            pricescale: extractField$1(data, 'pricescale', symbolIndex),
            type: extractField$1(data, 'type', symbolIndex),
            session: extractField$1(data, 'session-regular', symbolIndex),
            timezone: extractField$1(data, 'timezone', symbolIndex),
            supported_resolutions: definedValueOrDefault(extractField$1(data, 'supported-resolutions', symbolIndex), this$1._datafeedSupportedResolutions),
            force_session_rebuild: extractField$1(data, 'force-session-rebuild', symbolIndex),
            has_daily: definedValueOrDefault(extractField$1(data, 'has-daily', symbolIndex), true),
            intraday_multipliers: definedValueOrDefault(extractField$1(data, 'intraday-multipliers', symbolIndex), ['1', '5', '15', '30', '60']),
            has_weekly_and_monthly: extractField$1(data, 'has-weekly-and-monthly', symbolIndex),
            has_empty_bars: extractField$1(data, 'has-empty-bars', symbolIndex),
            volume_precision: definedValueOrDefault(extractField$1(data, 'volume-precision', symbolIndex), 0)
          };
          this$1._symbolsInfo[ticker] = symbolInfo;
          this$1._symbolsInfo[symbolName] = symbolInfo;
          this$1._symbolsInfo[fullName] = symbolInfo;
          this$1._symbolsList.push(symbolName);
        }
      } catch (error) {
        throw new Error('SymbolsStorage: API error when processing exchange ' + exchange + ' symbol #' + symbolIndex + ' (' + data.symbol[symbolIndex] + '): ' + error.message);
      }
    };
    return SymbolsStorage;
  }());

  function definedValueOrDefault(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
  }

  function extractField(data, field, arrayIndex) {
    let value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
  }

  /**
   * This class implements interaction with UDF-compatible datafeed.
   * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
   */
  let UDFCompatibleDatafeedBase = /** @class */ (function () {
    function UDFCompatibleDatafeedBase(datafeedURL, quotesProvider, requester, updateFrequency) {
      if (updateFrequency === void 0) {
        updateFrequency = 10 * 1000;
      }
      let _this = this;
      this._configuration = defaultConfiguration();
      this._symbolsStorage = null;
      this._datafeedURL = datafeedURL;
      this._requester = requester;
      this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
      this._quotesProvider = quotesProvider;
      this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
      this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);
      this._configurationReadyPromise = this._requestConfiguration()
        .then(function (configuration) {
          if (configuration === null) {
            configuration = defaultConfiguration();
          }
          _this._setupWithConfiguration(configuration);
        });
    }

    UDFCompatibleDatafeedBase.prototype.onReady = function (callback) {
      let _this = this;
      this._configurationReadyPromise.then(function () {
        callback(_this._configuration);
      });
    };
    UDFCompatibleDatafeedBase.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
      this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
    };
    UDFCompatibleDatafeedBase.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
      this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.unsubscribeQuotes = function (listenerGuid) {
      this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.calculateHistoryDepth = function (resolution, resolutionBack, intervalBack) {
      return undefined;
    };
    UDFCompatibleDatafeedBase.prototype.getMarks = function (symbolInfo, from, to, onDataCallback, resolution) {
      if (!this._configuration.supports_marks) {
        return;
      }
      let requestParams = {
        symbol: symbolInfo.ticker || '',
        from: from,
        to: to,
        resolution: resolution
      };
      this._send('marks', requestParams)
        .then(function (response) {
          if (!Array.isArray(response)) {
            let result = [];
            for (let i = 0; i < response.id.length; ++i) {
              result.push({
                id: extractField(response, 'id', i),
                time: extractField(response, 'time', i),
                color: extractField(response, 'color', i),
                text: extractField(response, 'text', i),
                label: extractField(response, 'label', i),
                labelFontColor: extractField(response, 'labelFontColor', i),
                minSize: extractField(response, 'minSize', i)
              });
            }
            response = result;
          }
          onDataCallback(response);
        })
        .catch(function (error) {
          logMessage('UdfCompatibleDatafeed: Request marks failed: ' + getErrorMessage(error));
          onDataCallback([]);
        });
    };
    UDFCompatibleDatafeedBase.prototype.getTimescaleMarks = function (symbolInfo, from, to, onDataCallback, resolution) {
      if (!this._configuration.supports_timescale_marks) {
        return;
      }
      let requestParams = {
        symbol: symbolInfo.ticker || '',
        from: from,
        to: to,
        resolution: resolution
      };
      this._send('timescale_marks', requestParams)
        .then(function (response) {
          if (!Array.isArray(response)) {
            let result = [];
            for (let i = 0; i < response.id.length; ++i) {
              result.push({
                id: extractField(response, 'id', i),
                time: extractField(response, 'time', i),
                color: extractField(response, 'color', i),
                label: extractField(response, 'label', i),
                tooltip: extractField(response, 'tooltip', i)
              });
            }
            response = result;
          }
          onDataCallback(response);
        })
        .catch(function (error) {
          logMessage('UdfCompatibleDatafeed: Request timescale marks failed: ' + getErrorMessage(error));
          onDataCallback([]);
        });
    };
    UDFCompatibleDatafeedBase.prototype.getServerTime = function (callback) {
      if (!this._configuration.supports_time) {
        return;
      }
      this._send('time')
        .then(function (response) {
          let time = parseInt(response);
          if (!isNaN(time)) {
            callback(time);
          }
        })
        .catch(function (error) {
          logMessage('UdfCompatibleDatafeed: Fail to load server time, error=' + getErrorMessage(error));
        });
    };
    UDFCompatibleDatafeedBase.prototype.searchSymbols = function (userInput, exchange, symbolType, onResult) {
      if (this._configuration.supports_search) {
        // limit  SearchItemsLimit
        let params = {
          limit: 30,
          query: userInput.toUpperCase(),
          type: symbolType,
          exchange: exchange
        };
        this._send('search', params)
          .then(function (response) {
            if (response.s !== undefined) {
              logMessage('UdfCompatibleDatafeed: search symbols error=' + response.errmsg);
              onResult([]);
              return;
            }
            onResult(response);
          })
          .catch(function (reason) {
            logMessage('UdfCompatibleDatafeed: Search symbols for ' + userInput + ' failed. Error=' + getErrorMessage(reason));
            onResult([]);
          });
      } else {
        if (this._symbolsStorage === null) {
          throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
        }
        // /* SearchItemsLimit */
        this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30)
          .then(onResult)
          .catch(onResult.bind(null, []));
      }
    };
    UDFCompatibleDatafeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
      logMessage('Resolve requested');
      let resolveRequestStartTime = Date.now();

      function onResultReady(symbolInfo) {
        logMessage('Symbol resolved: ' + (Date.now() - resolveRequestStartTime) + 'ms');
        onResolve(symbolInfo);
      }

      let setBazDeal = JSON.parse(sessionStorage.getItem('setBazDeal')) || {
        symbol: 'FMVP',
        toSymbol: 'BTC'
      };
      let symbolInfo = {
        'name': 'FMVP',
        'timezone': 'Asia/Shanghai',
        'minmov': 1,
        'pointvalue': 1,
        'session': '24x7',
        'has_intraday': !0,
        'has_daily': !0,
        'has_weekly_and_monthly': !0,
        'description': 'BTC',
        'type': 'coin',
        'ticker': setBazDeal.symbol,
        'toSymbol': setBazDeal.toSymbol,
        'pricescale': 100000000,
        'volumescale': 100000000,
        'intraday-multipliers': []
      };
      onResultReady(symbolInfo);
      //      if (!this._configuration.supports_group_request) {
      //          let params = {
      //              symbol: symbolName,
      //          };
      //          this._send('symbols', params)
      //              .then(function (response) {
      //              if (response.s !== undefined) {
      //                  onError('unknown_symbol');
      //              }
      //              else {
      //                  onResultReady(response);
      //              }
      //          })
      //              .catch(function (reason) {
      //              logMessage('UdfCompatibleDatafeed: Error resolving symbol: ' + getErrorMessage(reason));
      //              onError('unknown_symbol');
      //          });
      //      }
      //      else {
      //          if (this._symbolsStorage === null) {
      //              throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
      //          }
      //          this._symbolsStorage.resolveSymbol(symbolName).then(onResultReady).catch(onError);
      //      }
    };
    UDFCompatibleDatafeedBase.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
      this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
        .then(function (result) {
          onResult(result.bars, result.meta);
        })
        .catch(onError);
    };
    UDFCompatibleDatafeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
      this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype.unsubscribeBars = function (listenerGuid) {
      this._dataPulseProvider.unsubscribeBars(listenerGuid);
    };
    UDFCompatibleDatafeedBase.prototype._requestConfiguration = function () {
      //      return this._send('config')
      //          .catch(function (reason) {
      //          logMessage('UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=' + getErrorMessage(reason));
      //          return null;
      //      });

      return Promise.resolve(defaultConfiguration());
    };
    UDFCompatibleDatafeedBase.prototype._send = function (urlPath, params) {
      return this._requester.sendRequest(this._datafeedURL, urlPath, params);
    };
    UDFCompatibleDatafeedBase.prototype._setupWithConfiguration = function (configurationData) {
      this._configuration = configurationData;
      if (configurationData.exchanges === undefined) {
        configurationData.exchanges = [];
      }
      if (!configurationData.supports_search && !configurationData.supports_group_request) {
        throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
      }
      if (configurationData.supports_group_request || !configurationData.supports_search) {
        this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
      }
      logMessage('UdfCompatibleDatafeed: Initialized with ' + JSON.stringify(configurationData));
    };
    return UDFCompatibleDatafeedBase;
  }());

  function defaultConfiguration() {
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: PERIODLIST,
      supports_marks: false,
      supports_timescale_marks: false
    };
  }

  let QuotesProvider = /** @class */ (function () {
    function QuotesProvider(datafeedUrl, requester) {
      this._datafeedUrl = datafeedUrl;
      this._requester = requester;
    }

    QuotesProvider.prototype.getQuotes = function (symbols) {
      let _this = this;
      return new Promise(function (resolve, reject) {
        _this._requester.sendRequest(_this._datafeedUrl, 'quotes', {
          symbols: symbols
        }).then(function (response) {
          if (response.s === 'ok') {
            resolve(response.d);
          } else {
            reject(response.errmsg);
          }
        }).catch(function (error) {
          let errorMessage = getErrorMessage(error);
          logMessage('QuotesProvider: getQuotes failed, error=' + errorMessage);
          reject('network error: ' + errorMessage);
        });
      });
    };
    return QuotesProvider;
  }());

  let Requester = /** @class */ (function () {
    function Requester(headers) {
      if (headers) {
        this._headers = headers;
      }
    }

    Requester.prototype.sendRequest = function (datafeedUrl, urlPath, params) {
      if (params !== undefined) {
        let paramKeys = Object.keys(params);
        if (paramKeys.length !== 0) {
          urlPath += '?';
        }
        urlPath += paramKeys.map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString());
        }).join('&');
      }
      logMessage('New request: ' + urlPath);
      // Send user cookies if the URL is on the same origin as the calling script.
      let options = {credentials: 'same-origin'};
      if (this._headers !== undefined) {
        options.headers = this._headers;
      }
      return new Promise(function (resolve, reject) {
        return [];
      });
      // return fetch(datafeedUrl + '/' + urlPath, options)
      //     .then(function(response) { return response.text(); })
      //     .then(function(responseTest) { return JSON.parse(responseTest); });
    };
    return Requester;
  }());
  /** @class */
  let UDFCompatibleDatafeed = (function (_super) {
    __extends(UDFCompatibleDatafeed, _super);

    function UDFCompatibleDatafeed(datafeedURL, updateFrequency) {
      if (updateFrequency === void 0) {
        updateFrequency = 10 * 1000;
      }
      let _this1 = this;
      let requester = new Requester();
      let quotesProvider = new QuotesProvider(datafeedURL, requester);
      _this1 = _super.call(this, datafeedURL, quotesProvider, requester, updateFrequency) || this;
      return _this1;
    }

    return UDFCompatibleDatafeed;
  }(UDFCompatibleDatafeedBase));
  exports.UDFCompatibleDatafeed = UDFCompatibleDatafeed;
  Object.defineProperty(exports, '__esModule', {value: true});
})));
