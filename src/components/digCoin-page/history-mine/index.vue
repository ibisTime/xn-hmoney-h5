<template>
  <div class="his_mine">
    <div class="his_header">
      <p>出矿总量</p>
      <h5>0.0000</h5>
      <p>2019-10-09</p>
    </div>
    <div class="con_canvas">
      <div class="left">
        <div id="charts"></div>
      </div>
      <div class="right">
        <div class="r_box">
          <p class="r_p_tit"><i class="r1_i"></i> 投资收益</p>
          <p class="r_p_con">60%</p>
        </div>
        <div>
          <p class="r_p_tit"><i class="r2_i"></i> 团队收益</p>
          <p class="r_p_con">40%</p>
        </div>
      </div>
    </div>
    <ul class="his_list">
      <h5 class="his_tit">领取记录</h5>
      <li class="li_single">
        <div class="li_left">
          <p class="left_p">可领取 <span class="b_sp">12451</span></p>
          <p>2018-10-10 20:00:00</p>
        </div>
        <div class="li_right">
          <span>+4644.1125</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {setTitle} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {}
    },
    created() {
      setTitle('历史出矿');
    },
    mounted() {
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
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'}
            ]
          }
        ]
      };
      myChart.setOption(option);
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
    .his_list{
      flex: 1;
      position: relative;
      padding: 0.3rem;
      background-color: #fff;
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
