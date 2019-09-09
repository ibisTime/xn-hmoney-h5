<template>
  <div class="dig_coin">
    <div class="dig_coin_wrp">
      <Scroll :pullUpLoad="null">
        <div class="coin_box">
          <div class="dig_head">
            <div class="head_gg">
              公告：xxx玩家挖到xxx矿
            </div>
            <div class="wa_dig">
              <router-link to="dig-out_mine" class="left">
                <img class="img_jb" src="./image/wa_jb.png" alt="">
                <span>挖矿：{{digValues.totalAmount}}</span>
              </router-link>
              <!-- <div class="right">
                玩法介绍
              </div> -->
            </div>
            <div class="wa_dig">
              <router-link class="left" to="calculate-record">
                <img class="img_sl" src="./image/wa_sl.png" alt="">
                <span>算力：{{digValues.dayCalculate}}</span>
              </router-link>
            </div>
            <div class="wa_con">
              <div class="jbi_box">
                <div
                  v-for="(item, index) in digList"
                  :style="{left: `${listX[index]}%`, top: `${listY[index]}%`}"
                  :key="`jb_${index}`"
                  class="jbi_single"
                  @click="() => {jbiSingleClick(item.id, index)}"
                >
                  <img src="./image/jinbi_x.png" alt="">
                  <p>{{item.poolAmount}}</p>
                </div>
              </div>
              <router-link class="suanli_box" to="get-calculate">
                <img src="./image/get_suanli.png" alt="">
                <p class="sli_p">获取算力</p>
              </router-link>
            </div>
          </div>
          <div class="dig_con">
            <div class="con_head">
              <span :class="isSelectTab === 0 ? 'set_sp' : ''" @click="selectCalculate">算力排行榜</span>
              <span :class="isSelectTab === 1 ? 'set_sp' : ''" @click="selectToken">代币排行榜</span>
            </div>
            <div class="con_tab">
              <div class="tab_th">
                <span>名次</span>
                <span class="th_sp02">用户名</span>
                <span class="th_sp03">{{isSelectTab === 0 ? '算力' : '代币'}}</span>
              </div>
              <ul class="tab_tbody">
                <li v-for="(item, index) in calculateData" :key="`calculate_${index}`">
                  <span
                    class="t_sp01"
                  >
                    <i :class="index === 0 ? 'one_icon' : index === 1 ? 'two_icon' : index === 2 ? 'three_icon' : 'hidden'"></i>
                    {{index > 2 ? index + 1 : ''}}
                  </span>
                  <span class="t_sp02">{{item.nickname}}</span>
                  <span class="t_sp03">{{item.dayCalculate}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroll>  
    </div>
  </div>
</template>

<script>
  import {ownerDigValue, willDigList, receiveDigValue, calculateList, tokensList} from 'api/homeDig';
  import {setTitle, formatAmount} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        listX: [],
        listY: [],
        digList: [],
        digValues: {},
        isReceive: true,
        singleIndex: -1,
        calculateData: [],
        isSelectTab: 0
      }
    },
    created() {
      setTitle('挖矿');
      willDigList().then(data => {
        this.digList = data.map(item => ({
          ...item,
          poolAmount: item.poolAmount > 0 ? formatAmount(item.poolAmount, '4', 'TWT') : '0.0000'
        }));
        const len = data.length;
        const listX = [], listY = [];
        for(let i = 0; i < len; i ++) {
          listX.push(generateRandom(listX, 100));
          listY.push(generateRandom(listY, 100));
        }
        this.listX = listX;
        this.listY = listY;
        function generateRandom(list, scope) {
          let num = Math.random() * scope;
          if(list.includes(num)) {
            return generateRandom(list, scope)
          }
          return +(num.toFixed(2));
        }
      });
      this.getOwnerDigValue();
      this.getCalculateList();
    },
    methods: {
      jbiSingleClick(id, index) {
        if(this.isReceive) {
          this.isReceive = false;
          this.singleIndex = index;
          receiveDigValue(id).then(() => {
            this.isReceive = true;
            this.getOwnerDigValue();
            willDigList().then(data => {
              this.digList = data.map(item => ({
                ...item,
                poolAmount: item.poolAmount > 0 ? formatAmount(item.poolAmount, '4', 'TWT') : '0.0000'
              }));
            });
          });
        }
      },
      getOwnerDigValue() {
        ownerDigValue().then(data => {
          this.digValues = {
            dayCalculate: data.dayCalculate > 0 ? formatAmount(data.dayCalculate, '4', 'TWT') : '0.0000',
            totalAmount: data.totalAmount > 0 ? formatAmount(data.totalAmount, '4', 'TWT') : '0.0000'
          }
        });
      },
      getCalculateList() {
        calculateList().then(data => {
          // 算力排行榜
          this.calculateData = data.map(item => ({
            dayCalculate: item.dayCalculate > 0 ? formatAmount(item.dayCalculate, '4', 'TWT') : '0.0000',
            nickname: item.nickname
          }));
        });
      },
      getTokensList() {
        tokensList().then(data => {
          // 代币排行榜
          this.calculateData = data.map(item => ({
            dayCalculate: item.dayPoolAmount > 0 ? formatAmount(item.dayPoolAmount, '4', 'TWT') : '0.0000',
            nickname: item.nickname
          }));
        });
      },
      selectCalculate() {
        this.isSelectTab = 0;
        this.getCalculateList();
      },
      selectToken() {
        this.isSelectTab = 1;
        this.getTokensList();
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .dig_coin{
    height: 100%;
    background-color: #fff;
    position: relative;
    .dig_coin_wrp{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .coin_box{
        padding-bottom: 1rem;
      }
    }
    .dig_head{
      height: 8rem;
      background-image: url('./image/dig_bg.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      .head_gg{
        background-color: #519AED;
        opacity: 0.6;
        color: #fff;
        font-size: 0.24rem;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.3rem;
        margin-bottom: 0.34rem;
      }
      .wa_dig{
        display: flex;
        justify-content: space-between;
        padding-left: 0.3rem;
        margin-bottom: 0.38rem;
        align-items: center;
        .left{
          font-size: 0.26rem;
          color: #fff;
          img{
            vertical-align: middle;
          }
          .img_jb{
            width: 0.38rem;
            height: 0.38rem;
            margin-right: 0.12rem;
          }
          .img_sl{
            width: 0.32rem;
            height: 0.38rem;
            margin-right: 0.18rem;
          }
        }
        .right{
          height: 0.5rem;
          border-top-left-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
          padding: 0.14rem 0.32rem 0.14rem 0.24rem;
          color: #fff;
          font-size: 0.26rem;
          background-image: url('./image/yuan_jx.png');
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
      .wa_con{
        position: relative;
        flex: 1;
        .jbi_box{
          position: relative;
          width: 85%;
          height: 60%;
          margin: 0 auto;
          .jbi_single{
            position: absolute;
            color: #ECE5FD;
            font-size: 0.22rem;
            opacity: 1;
            text-align: center;
            animation: jbiSingle 2s ease infinite;
            img{
              width: 0.6rem;
              height: 0.6rem;
              margin-bottom: 0.04rem;
            }
          }
        }
      }
      .suanli_box{
        position: absolute;
        bottom: 0.52rem;
        left: 0.3rem;
        text-align: center;
        img{
          width: 0.9rem;
          height: 0.9rem;
        }
        .sli_p{
          color: #fff;
          font-size: 0.26rem;
        }
      }
    }
    .dig_con{
      .con_head{
        padding-top: 0.32rem;
        display: flex;
        justify-content: space-around;
        span{
          display: inline-block;
          width: 30%;
          text-align: center;
          vertical-align: top;
          font-size: 0.28rem;
          color: #333;
          padding-bottom: 0.26rem;
          border-bottom: 2px solid transparent;
        }
        .set_sp{
          color: #D53D3D;
          border-bottom: 2px solid #D53D3D;
        }
      }
      .con_tab{
        .tab_th{
          background-color: #F6F6F6;
          color: #333;
          padding: 0.22rem 0.3rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
          span{
            flex: 1;
          }
          .th_sp02{
            text-align: center;
          }
          .th_sp03{
            flex: 2;
            text-align: right;
          }
        }
        .tab_tbody{
          padding: 0 0.3rem;
          li{
            border-bottom: 1px solid #F0F0F0;
            color: #333;
            font-size: 0.26rem;
            display: flex;
            padding: 0.22rem 0;
            justify-content: space-between;
            .t_sp01{
              background-size: 100% 100%;
              flex: 1;
              padding-left: 0.1rem;
              i{
                display: inline-block;
                width: 0.28rem;
                height: 0.36rem;
                background-size: 100% 100%;
              }
            }
            .t_sp02{
              display: inline-block;
              flex: 1;
              text-align: center;
            }
            .t_sp03{
              flex: 2;
              text-align: right;
            }
            .one_icon{
              background-image: url('./one.png');
            }
            .two_icon{
              background-image: url('./two.png');
            }
            .three_icon{
              background-image: url('./three.png');
            }
          }
        }
      }
    }
  }
  @keyframes jbiSingle{
    0% {
      margin-top: 0;
    }
    10% {
      margin-top: -2px;
    }
    20% {
      margin-top: -4px;
    }
    30% {
      margin-top: -6px;
    }
    40% {
      margin-top: -8px;
    }
    50% {
      margin-top: -10px;
    }
    60% {
      margin-top: -8px;
    }
    70% {
      margin-top: -6px;
    }
    80% {
      margin-top: -4px;
    }
    90% {
      margin-top: -2px;
    }
    100% {
      margin-top: 0;
    }
  }
</style>
