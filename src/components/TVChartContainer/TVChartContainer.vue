<template>
  <div>
    <div class="chart-button-wrap" id="chartBtn">
      <div class="wrap">
        <div class="chart-button btn" v-for="(item, index) in btnList" v-if="item.show" :key="index"
             :data-key="item.resolution" :data-charttype="item.chartType"
             :class="item.resolution === resolution && !showMoreBtn ? 'selected' : ''">
          <p :class="item.class">{{item.label}}</p>
        </div>
        <div class="chart-button more" :class="showMoreBtn ? 'selected' : ''">
          <p>{{$t('trading.bbDepth.more')}}</p>
        </div>
      </div>
      <div class="hidden-wrap" v-show="showMore">
        <div class="chart-button btn more-btn" v-for="(item, index) in btnList" v-if="!item.show" :key="index"
             :data-key="item.resolution" :data-charttype="item.chartType"
             :class="item.resolution === resolution ? 'selected' : ''">
          <p :class="item.class">{{item.label}}</p>
        </div>
      </div>
    </div>
    <div class='TVChartContainer' :id='containerId'></div>
  </div>
</template>

<script>
  import {TradingView} from 'common/js/charting_library.min.js';
  import {getLangType} from 'common/js/util.js';

  export default {
    name: 'TVChartContainer',
    props: {
      symbol: {
        default: 'FMVP',
        type: String,
      },
      interval: {
        default: '1',
        type: String,
      },
      containerId: {
        default: 'tv_chart_container',
        type: String,
      },
      datafeedUrl: {
        default: 'https://demo_feed.tradingview.com',
        type: String,
      },
      libraryPath: {
        default: '/static/charting_library/',
        type: String,
      },
      userId: {
        default: 'public_user_id',
        type: String,
      },
      fullscreen: {
        default: false,
        type: Boolean,
      },
      autosize: {
        default: true,
        type: Boolean,
      },
      preset: {
        default: 'mobile',
        type: String,
      },
      studiesOverrides: {
        type: Object,
      },
      locale: {
        default: getLangType(),
        type: String,
      }
    },
    data() {
      return {
        showMore: false, // 更多面板
        showMoreBtn: false, // 更多按钮
        resolution: '15', // 当前选中分时
        btnList: [ // 分时
          {
            class: 'datetime',
            label: '分时',
            resolution: "",
            show: true,
            chartType: 3
          },
          {
            class: '',
            label: '1min',
            resolution: "1",
            selected: true,
            chartType: 1
          },
          {
            class: '',
            label: '5min',
            resolution: "5",
            chartType: 1
          },
          {
            class: '',
            label: '15min',
            resolution: "15",
            show: true,
            chartType: 1
          },
          {
            class: '',
            label: '30min',
            resolution: "30",
            chartType: 1
          },
          {
            class: '',
            label: '1hour',
            resolution: "60",
            show: true,
            chartType: 1
          },
          {
            class: '',
            label: '4hour',
            resolution: "240",
            show: true,
            chartType: 1
          },
          {
            class: '',
            label: '1day',
            resolution: "1D",
            show: true,
            chartType: 1
          }, {
            class: '',
            label: '1week',
            resolution: "1W",
            chartType: 1
          }, {
            class: '',
            label: '1month',
            resolution: "1M",
            chartType: 1
          }
        ]
      }
    },
    mounted() {
      let _this = this;
      const widgetOptions = {
        symbol: this.symbol,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
        interval: this.interval,
        container_id: this.containerId,
        library_path: this.libraryPath,
        locale: this.locale,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
        studies_overrides: this.studiesOverrides,
        preset: this.preset,
        disabled_features: ['show_chart_property_page', 'compare_symbol', 'display_market_status', 'go_to_date', 'header_chart_type', 'header_compare', 'header_interval_dialog_button', 'header_resolutions', 'header_screenshot', 'header_symbol_search', 'header_undo_redo', 'legend_context_menu', 'show_hide_button_in_legend', 'show_interval_dialog_on_key_press', 'snapshot_trading_drawings', 'symbol_info', 'timeframes_toolbar', 'use_localstorage_for_settings', 'volume_force_overlay'],
        enabled_features: ['dont_show_boolean_study_arguments', 'hide_last_na_study_output', 'move_logo_to_main_pane', 'same_data_requery', 'side_toolbar_in_fullscreen_mode', 'disable_resolution_rebuild'],
        overrides: {
          'volumePaneSize': 'small',
          'scalesProperties.lineColor': '#1f2943',
          'scalesProperties.textColor': '#61688A',
          'paneProperties.background': '#172432',
          'paneProperties.vertGridProperties.color': '#1f2943',
          'paneProperties.horzGridProperties.color': '#1f2943',
          'paneProperties.crossHairProperties.color': '#9194A3',
          'paneProperties.legendProperties.showLegend': false,
          'paneProperties.legendProperties.showStudyArguments': true,
          'paneProperties.legendProperties.showStudyTitles': true,
          'paneProperties.legendProperties.showStudyValues': true,
          'paneProperties.legendProperties.showSeriesTitle': true,
          'paneProperties.legendProperties.showSeriesOHLC': true,
          'mainSeriesProperties.candleStyle.upColor': '#03c087',
          'mainSeriesProperties.candleStyle.downColor': '#ef5555',
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderColor': '#4e5b85',
          'mainSeriesProperties.candleStyle.borderUpColor': '#03c087',
          'mainSeriesProperties.candleStyle.borderDownColor': '#ef5555',
          'mainSeriesProperties.candleStyle.wickUpColor': '#03c087',
          'mainSeriesProperties.candleStyle.wickDownColor': '#ef5555',
          'mainSeriesProperties.candleStyle.barColorsOnPrevClose': false,
          'mainSeriesProperties.hollowCandleStyle.upColor': '#03c087',
          'mainSeriesProperties.hollowCandleStyle.downColor': '#ef5555',
          'mainSeriesProperties.hollowCandleStyle.drawWick': true,
          'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
          'mainSeriesProperties.hollowCandleStyle.borderColor': '#4e5b85',
          'mainSeriesProperties.hollowCandleStyle.borderUpColor': '#03c087',
          'mainSeriesProperties.hollowCandleStyle.borderDownColor': '#ef5555',
          'mainSeriesProperties.haStyle.upColor': '#03c087',
          'mainSeriesProperties.haStyle.downColor': '#ef5555',
          'mainSeriesProperties.haStyle.drawWick': true,
          'mainSeriesProperties.haStyle.drawBorder': true,
          'mainSeriesProperties.haStyle.borderColor': '#4e5b85',
          'mainSeriesProperties.haStyle.borderUpColor': '#03c087',
          'mainSeriesProperties.haStyle.borderDownColor': '#ef5555',
          'mainSeriesProperties.haStyle.wickColor': '#4e5b85',
          'mainSeriesProperties.haStyle.barColorsOnPrevClose': false,
          'mainSeriesProperties.barStyle.upColor': '#03c087',
          'mainSeriesProperties.barStyle.downColor': '#ef5555',
          'mainSeriesProperties.barStyle.barColorsOnPrevClose': false,
          'mainSeriesProperties.barStyle.dontDrawOpen': false,
          'mainSeriesProperties.lineStyle.color': '#4e5b85',
          'mainSeriesProperties.lineStyle.linewidth': 1,
          'mainSeriesProperties.lineStyle.priceSource': 'close',
          'mainSeriesProperties.areaStyle.color1': 'rgba(122, 152, 247, .1)',
          'mainSeriesProperties.areaStyle.color2': 'rgba(122, 152, 247, .02)',
          'mainSeriesProperties.areaStyle.linecolor': '#4e5b85',
          'mainSeriesProperties.areaStyle.linewidth': 1,
          'mainSeriesProperties.areaStyle.priceSource': 'close',
          'mainSeriesProperties.style': 1
        },
        toolbar_bg: 'transparent'
      };

      const tvWidget = window.tvWidget = new TradingView.widget(widgetOptions);

      tvWidget.onChartReady(() => {
        let chart = tvWidget.chart();
        let activeChart = tvWidget.activeChart();
        activeChart.setTimezone('Asia/Shanghai');
        let MAColor = ["#965fc4", "#84aad5", "#55b263", "#b7248a"];
        let MAInputs = [5, 10, 30, 60];
        MAInputs.forEach(function (t, n) {
          chart.createStudy("Moving Average", !1, !1, [t], function (t) {
          }, {
            "plot.color.0": MAColor[n],
            precision: 8
          })
        });

        chart.onIntervalChanged().subscribe(null, function (interval, obj) {
          tvWidget.changingInterval = false;
        });

        $('#chartBtn').on('click', '.chart-button', function (e) {
          // 更多
          if ($(this).hasClass('more')) {
              _this.showMore = true;
              _this.showMoreBtn = true;
          }
          // 时分
          if ($(this).hasClass('btn')) {
            if ($(this).hasClass('more-btn') && !$(this).hasClass('selected')) {
              _this.showMore = false;
            } else if ($(this).hasClass('selected')) {
              _this.showMoreBtn = false;
              return;
            } else if (!$(this).hasClass('more-btn')) {
              _this.showMoreBtn = false;
            }
            _this.chartType = $(this).attr('data-charttype');

            if ($(this).find('p').hasClass('datetime')) {
              _this.resolution = chart.resolution()
            } else {
              _this.resolution = $(this).attr('data-key');
            }

            if (chart.resolution() !== _this.resolution) {
              $("#tv_chart_container").attr("firstLoad", "0");
              $("#tv_chart_container").attr("startDatetime", '');
              chart.setResolution(_this.resolution);
            }
            if (chart.chartType() !== _this.chartType) {
              chart.setChartType(Number(_this.chartType));
            }
          }
        });
      });
    },
    methods: {
    }
  }
</script>

<style lang='scss' scoped>
  .TVChartContainer {
    height: 6rem;
  }
  .chart-button-wrap{
    width: 100%;
    height: 0.6rem;
    position: relative;
    .wrap{
      width: 100%;
      padding: 0 0.2rem;
    }
    .hidden-wrap{
      width: 100%;
      overflow: hidden;
      background-color: #172432;
      position: absolute;
      top: 0.6rem;
      left: 0;
      padding: 0.3rem 0.2rem;
    }
    .chart-button{
      float: left;
      height: 0.6rem;
      padding: 0 0.2rem 0.02rem;
      p{
        display: inline-block;
        overflow: hidden;
        font-size: 0.26rem;
        line-height: 0.58rem;
        color: #61688A;
        border-bottom: 0.02rem solid transparent;
      }
    }
    .chart-button.selected{
      p{
        opacity: 0.8;
        color: #fff;
        border-bottom: 0.02rem solid #fff;
      }
      &.more{

        background-color: #172432;
      }
    }
  }
</style>
