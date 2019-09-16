<template>
  <div class="his_mine">
    <div class="his_header">
      <p>出矿总量</p>
      <h5>{{dayPoolAmount}}</h5>
      <p>{{outDatetime}}</p>
    </div>
    <div class="con_canvas">
      <div class="left">
        <div id="charts"></div>
      </div>
      <div class="right">
        <div class="r_box">
          <p class="r_p_tit"><i class="r1_i"></i> 自身收益</p>
          <p class="r_p_con">{{selfProportion}}%</p>
        </div>
        <div>
          <p class="r_p_tit"><i class="r2_i"></i> 团队收益</p>
          <p class="r_p_con">{{teamProportion}}%</p>
        </div>
      </div>
    </div>
    <div class="list_box">
      <div class="list_wrp">
        <Scroll
          ref="scroll"
          :data="recordList"
          :hasMore="hasMore"
          v-show="recordList.length > 0"
          @pullingUp="queryCalculateRecord"
        >
          <ul class="his_list">
            <h5 class="his_tit">领取记录</h5>
            <li
              class="li_single"
              v-for="(item, index) in recordList"
              :key="`his_record_${index}`"
            >
              <div class="li_left">
                <p class="left_p">{{item.statusName}} <span class="b_sp">{{item.poolAmount}}</span></p>
                <p>{{item.receiveDatetime}}</p>
              </div>
              <div class="li_right">
                <span>+{{item.poolAmount}}</span>
              </div>
            </li>
          </ul>
        </Scroll>
        <div class="no-data" :class="{'hidden': recordList.length > 0}">
          <img src="../outMine/wu.png" />
          <p>暂无记录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setTitle, formatAmount, formatDate} from 'common/js/util';
  import {ownerCalculateEarnings, queryCalculateRecord} from 'api/homeDig';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        outDatetime: '',
        mapData: [],
        selfProportion: 0,
        teamProportion: 0,
        dayPoolAmount: 0,
        recordList: [],
        hasMore: false,
        params: {
          start: 1,
          limit: 10
        }
      }
    },
    created() {
      setTitle('历史出矿');
      this.outDatetime = this.$route.query.outDatetime;
      this.params.outDatetime = this.outDatetime;
      this.queryCalculateRecord();
    },
    mounted() {
      ownerCalculateEarnings(this.outDatetime).then(data => {
        this.dayPoolAmount = data.dayPoolAmount > 0 ? formatAmount(data.dayPoolAmount, '4', 'TWT') : '0.0000';
        this.mapData.push({value: data.daySelfAmount > 0 ? data.daySelfAmount : 1});
        this.mapData.push({value: data.dayTeamAmount > 0 ? data.dayTeamAmount : 1});
        const allAmount = data.daySelfAmount + data.dayTeamAmount;
        if(allAmount > 0) {
          this.selfProportion = (data.daySelfAmount / allAmount * 100).toFixed(2);
          this.teamProportion = (Math.floor((100 - this.selfProportion) * 100) / 100).toFixed(2);
        }
        setTimeout(() => {
          let chart = document.getElementById('charts');
          let myChart = this.$echarts.init(chart);
          const option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#FFDA6B', '#6BAFFF'],
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: this.mapData
              }
            ]
          };
          myChart.setOption(option);
        }, 0);
      });
    },
    methods: {
      queryCalculateRecord() {
        queryCalculateRecord(this.params).then(data => {
          data.list.forEach(item => {
            item.poolAmount = item.poolAmount > 0 ? formatAmount(item.poolAmount, '4', 'TWT') : '0';
            item.receiveDatetime = item.receiveDatetime ? formatDate(item.receiveDatetime, 'yyyy-MM-dd hh:mm:ss') : '';
            item.statusName = item.status === '1' ? '待领取' : item.status === '2' ? '已领取' : '';
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.recordList = [...this.recordList, ...data.list];
          this.params.start ++;
        });
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .his_mine{
    height: 100%;
    display: flex;
    flex-direction: column;
    .his_header{
      background-image: url('../image/Mask@2x.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      padding-top: 0.56rem;
      padding-bottom: 0.4rem;
      text-align: center;
      margin-bottom: 0.2rem;
      p{
        color: #FFEEEC;
        font-size: 0.24rem;
      }
      h5{
        font-size: 0.48rem;
        color: #fff;
        margin: 0.18rem 0;
      }
    }
    .con_canvas{
      padding: 0.4rem;
      display: flex;
      margin-bottom: 0.4rem;
      background-color: #fff;
      .left{
        width: 50%;
        #charts{
          width: 2.5rem;
          height: 2.5rem;
          margin: 0 auto;
        }
      }
      .right{
        margin-top: 0.3rem;
        .r_box{
          margin-bottom: 0.4rem;
        }
        .r_p_tit{
          color: #999999;
          font-size: 0.24rem;
          margin-bottom: 0.16rem;
          i{
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 0.08rem;
            margin-right: 0.08rem;
            vertical-align: middle;
          }
          .r1_i{
            background-color: #6BAFFF;
          }
          .r2_i{
            background-color: #FFDA6B;
          }
        }
        .r_p_con{
          color: #333;
          font-size: 0.32rem;
        }
      }
    }
    .list_box{
      flex: 1;
      position: relative;
      background-color: #fff;
      .list_wrp{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }
    }
    .his_list{
      padding: 0.3rem;
      .his_tit{
        margin-bottom: 0.3rem;
        font-size: 0.36rem;
        color: #333;
      }
      .li_single{
        padding: 0.24rem 0;
        color: #999;
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E6E6E6;
        .li_left{
          .left_p{
            margin-bottom: 0.1rem;
          }
          .b_sp{
            color: #333;
            font-size: 0.32rem;
          }
        }
        .li_right{
          display: flex;
          align-items: center;
          line-height: 1;
          color: #D53D3D;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
