<template>
  <div class="map-wrapper" @click.stop>
    <div class='main' @touchmove.prevent>
      <div id="charts" :style="{width: '7rem', height: '6rem'}"></div>
    </div>
  </div>
</template>
<script>
  import {getDepthData} from 'api/bb';
  import {formatAmount} from 'common/js/util';

  export default {
    data() {
      return {
        setBazDeal: {}
      };
    },
    props: {
      bazDeal: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    mounted() {
      //   setTimeout(() => {
      //     this.setBazDeal = JSON.parse(sessionStorage.getItem('setBazDeal')) ;
      //     this.getDepthFn();
      //   }, 1000);
    },
    methods: {
      getDepthFn() {
        getDepthData(this.setBazDeal).then(data => {
          this.depthFn(data.bids, data.asks);
        });
      },
      depthFn(buyData, sellData) {
        let sellList = [],
          sellLjListData = [],
          buyLjListData = [],
          sellWtData = [],
          sellLjData = [],
          buyWtData = [],
          buyLjData = [],
          wtXListData = [];
        //卖
        sellData.forEach((item) => {
          // buyList.push(0);
          sellWtData.push(formatAmount(`${item.price}`, '', this.setBazDeal.toSymbol));
          sellLjData.push(formatAmount(`${item.count}`, '', this.setBazDeal.symbol));
        });
        // sellWtListData = [...sellWtData, ...sellList];
        //买
        buyData.forEach((item) => {
          sellList.push('');
          buyWtData.push(formatAmount(`${item.price}`, '', this.setBazDeal.toSymbol));
          buyLjData.push(formatAmount(`${item.count}`, '', this.setBazDeal.symbol));
        });
        buyWtData.sort((a, b) => (a - b));
        buyLjData.sort((a, b) => (b - a));
        // wtListData = [...buyList, ...sellWtData];
        buyLjListData = [...buyLjData];
        sellLjListData = [...sellList, ...sellLjData];
        wtXListData = [...buyWtData, ...sellWtData];

        let chart = document.getElementById('charts');
        let myChart = this.$echarts.init(chart);
        chart.style.width = window.innerWidth / 750 * 690 + 'px';

        var colors = ['rgba(79, 213, 141, 0.3)', 'rgba(225, 118, 118, 0.3)', '#6a7985'];

        var option = {
          // color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            confine: true,
            formatter: function (data) {
              if (data[0].value == 0 && data[1]) {
                return `委托价：${data[1].name}</br>累计：${data[1].value}`;
              }
              return `委托价：${data[0].name}</br>累计：${data[0].value}`;
            }
          },
          grid: {
            top: 50,
            bottom: 50
          },
          xAxis: [{
            type: 'category',
            scale: true,
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#61688A'
              }
            },
            data: wtXListData
          }, {
            type: 'category',
            scale: true,
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: 'transparent'
              }
            },
            data: wtXListData
          }
          ],
          yAxis: [{
            type: 'value',
            scale: true,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#61688A'
              }
            }
          }],
          series: [{
            name: '买入',
            type: 'line',
            smooth: false,
            step: 'end',
            symbol: 'none',
            sampling: 'average',
            lineStyle: {
              color: 'rgba(79, 213, 141, 0.7)'
            },
            areaStyle: {
              color: 'rgba(79, 213, 141, 0.3)'
            },
            data: buyLjListData
          }, {
            name: '卖出',
            type: 'line',
            // barCategoryGap: 0,
            smooth: false,
            step: 'end',
            symbol: 'none',
            sampling: 'average',
            lineStyle: {
              color: 'rgba(225, 118, 118, 0.7)'
            },
            areaStyle: {
              color: 'rgba(225, 118, 118, 0.3)'
            },
            data: sellLjListData
          }
          ]
        };
        myChart.setOption(option);
      }
    },
    watch: {
      bazDeal: {
        handler(val, oldVal) {
          this.setBazDeal = val;
          this.getDepthFn();
        },
        deep: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

  .map-wrapper {
    width: 100%;
    background: #172432;
    font-size: .28rem;
    color: #ccc;
    line-height: .35rem;

    .main {
      width: 100%;
      padding: 0 .3rem;
      #charts {
        margin: 0rem auto;
      }
    }

  }
</style>
