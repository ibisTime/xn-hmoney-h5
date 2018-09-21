<template>
  <div class="trading-wrapper" @click.stop>
    <div class='header'>
      <router-link v-show="show2" to=''><i class='icon' @click="showTwo"></i></router-link>
      <router-link v-show="!show2" to=''><i></i></router-link>

      <p v-show='show2'><span>X/ETH</span><i class='icon'></i></p>
      <p v-show='!show2'>币币交易</p>
      <router-link to='otc'>场外交易</router-link>
    </div>
      
    <div v-show="show2" class='One'>
      <div class="top">
        <p>
          <span @click="buy" :class="[show1? 'txt1 buy' : 'txt1']">买入</span>
          <span @click="sell" :class="[!show1? 'txt2 sell' : 'txt2']">卖出</span>
          <span class='txt3'>限价</span>
          <i class='icon'></i>
          <span class='txt4'>盘口</span>
          <span class='txt5'>价格</span>
          <span class='txt6'>数量</span>
        </p>
      </div>
      <div class="main">
        <!-- 买入 -->
        <div v-show="show1" class="left">
          <p class='he9'>
            <input type="text" placeholder="委托价格">
            <span class='black'>X</span>
          </p>
          <p class='text2'>
            <span>折合CNY</span>
            <span class='red'>￥0.00</span>
          </p>
          <p class='he9 mb20'>
            <input type="text" placeholder="委托数量">
            <span class='black'>ETH</span>
          </p>
          <p class='he9'>
            <input type="text" placeholder="交易额">
            <span class='black'>X</span>
          </p>
          <button class='buy'>买入X</button>
          <p class='he9 red'>
            <span>可用X</span>
            <span>0.04</span>
          </p>
          <p class='he9 btn red'>
            <span>可买ETH</span>
            <span>0</span>
          </p>
          <p class='he9 btn'>
            <span>可用ETH</span>
            <span class='black'>12.5</span>
          </p>
          <p class='he9 btn'>
            <span>冻结X</span>
            <span class='black'>0</span>
          </p>
        </div>
        <!-- 卖出 -->
        <div v-show="!show1" class="left">
          <p class='he9'>
            <input type="text" placeholder="委托价格">
            <span class='black'>X</span>
          </p>
          <p class='text2'>
            <span>折合CNY</span>
            <span class='red'>￥0.00</span>
          </p>
          <p class='he9 mb20'>
            <input type="text" placeholder="委托数量">
            <span class='black'>ETH</span>
          </p>
          <p class='he9'>
            <input type="text" placeholder="交易额">
            <span class='black'>X</span>
          </p>
          <button class='sell'>卖出X</button>
          <p class='he9 green'>
            <span>可用X</span>
            <span>0.04</span>
          </p>
          <p class='he9 btn green'>
            <span>可买ETH</span>
            <span>0</span>
          </p>
          <p class='he9 btn'>
            <span>可用ETH</span>
            <span class='black'>12.5</span>
          </p>
          <p class='he9 btn'>
            <span>冻结X</span>
            <span class='black'>0</span>
          </p>
        </div>

        <div class="right">
          <div class='one'>
            <p class='text1'>
              <span class='green txt1'>卖10</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖9</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖8</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖7</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖6</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖5</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖4</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖3</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖2</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='green txt1'>卖1</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
          </div>
          <p class='middle'><span class='red'>￥ 8022.00</span><i class='icon'></i></p>
          <div class='one two'>
            <p class='text1'>
              <span class='red txt1'>买10</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买9</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买8</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买7</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买6</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买5</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买4</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买3</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买2</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
            <p class='text1'>
              <span class='red txt1'>买1</span>
              <span class='txt2'>9015.71</span>
              <span class='txt3'>0.0014</span>
            </p>
          </div>

        </div>
      </div>
      <div class='entrust'>
        <div class='tabs'>
          <p @click="showCurr" class='current'>当前委托</p>
          <p @click='showHisto' class='history'><i class='icon'></i>
          <router-link to='trading-historyEntrust'>历史</router-link></p>
        </div>
        <div v-show="!show3" class='current-history'>
          <div class='list'>
            <p class='text1'>
              <span class='green'>买入</span>
              <span>2018-04-12:00</span>
              <span class='red'>撤销</span>
            </p>
            <div class='text2'>
              <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
              </div>
              <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
              </div>
              <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
              </div>
            </div>
          </div>
          <div class='list'>
            <p class='text1'>
              <span class='green'>买入</span>
              <span>2018-04-12:00</span>
              <span class='red'>撤销</span>
            </p>
            <div class='text2'>
              <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
              </div>
              <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
              </div>
              <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
              </div>
            </div>
          </div>

        </div>
        <!-- 无记录时显示 -->
        <div v-show="show3" class='history-main'>
          <i class='icon'></i>
          <p>暂无记录</p>
        </div>
        <!-- 有记录时显示 -->
        <!-- <div v-show="show3" class='current-history'>
          <div class='list'>
            <p class='text1'>
              <span class='green'>买入</span>
              <span>2018-04-12:00</span>
              <span class='red'>已完成</span>
            </p>
            <div class='text2'>
              <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
              </div>
              <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
              </div>
              <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
              </div>
            </div>
          </div>
          <div class='list'>
            <p class='text1'>
              <span class='green'>买入</span>
              <span>2018-04-12:00</span>
              <span class='red'>已完成</span>
            </p>
            <div class='text2'>
              <div class='txt1'>
                <p>价格(ETH)</p>
                <p class='black'>13.60</p>
              </div>
              <div class='txt2'>
                <p>数量(X)</p>
                <p class='black'>7.4569</p>
              </div>
              <div class='txt3'>
                <p>实际成交(X)</p>
                <p class='black'>7.0430</p>
              </div>
            </div>
          </div>

        </div> -->

      </div>
    </div>
    <!-- K线图 -->
    <div v-show="!show2" class='Two'>
      <div class="top-mian">
        <div class='top'>
          <i class='icon ico1'></i>
          <p>
            <span>X/BTC</span>
            <i class='icon ico2'></i>
          </p>
          <i class='icon ico3'></i>
        </div>
        <p class='text1'><span class='txt1'>BTC</span><span>现价</span><span class='red txt3'>0.045678</span><span class='red txt4'>折合≈1911.567CNY</span></p>
        <div class='text2'>
          <p><span class='gray txt1'>涨幅</span><span class='red txt2'>+1.17%</span></p>
          <p><span class='gray'>最高</span><span>0.041924</span></p>
        </div>
        <div class='text3'>
          <p><span class='gray'>成交</span><span>1.5万</span></p>
          <p><span class='gray'>最低</span><span>0.041924</span></p>
        </div>
      </div>
      <!-- k线图部分 -->
      <div class='main1'></div>
      <!-- 主要内容区 -->
      <div class='main2'>
        <div class='tabs'>
          <router-link to='trading-synopsis' class='tab-item'>简介</router-link>
          <router-link to='trading-putUp' class='tab-item'>挂单</router-link>
          <router-link to='trading-clinchADeal' class='tab-item'>成交</router-link>
          <router-link to='trading-depthMap' class='tab-item'>深度图</router-link>
        </div>
        <router-view></router-view>
        <div class='foot'>
          <button class='buy'><router-link to=''>买入X</router-link></button>
          <button class='sell'><router-link to=''>卖出X</router-link></button>
        </div>

      </div>
    </div>
      <Footer></Footer>
  </div>
</template>
<script>
import Footer from 'components/footer/footer';
export default {
  data() {
    return {
      show1: true,
      show2: true,
      show3: false
    };
  },
  created() {
  },
  updated() {
  },
  computed: {
  },
  methods: {
    buy() {
      this.show1 = true;
    },
    sell() {
      this.show1 = false;
    },
    showHisto() {
      this.show3 = true;
    },
    showCurr() {
      this.show3 = false;
    },
    showTwo() {
      this.show2 = false;
    }
  },
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";
.trading-wrapper {
  width: 100%;
  background: #fff;
  font-size: .28rem;
  color: #999;
  overflow: auto;
  .red {
    color: #d53d3d;
  }
  .green {
    color: #0ec55b;
  }
  .black {
    color: #333;
  }
  .gray {
    color: #a0a0a2;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;    
  }

  .header {
    width: 100%;
    padding: 0 .3rem;
    display: flex;
    justify-content: space-between;
    height: .98rem;
    font: bold .32rem/.98rem PingFangSC-Medium;
    font-size: .32rem;
    color: #333;
    border-bottom: .01rem solid #dedede;
    a {
      font-size: .32rem;
      color: #333;
    }
    p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .icon {
        width: .24rem;
        height: .15rem;
        @include bg-image("下啦黑色");
        margin-left: .2rem;
      }
    }

    .icon {
      width: .24rem;
      height: .28rem;
      @include bg-image("k线图");
    }

  }

// 币币交易页面
  .One {
    .top {
      line-height: 1rem;
      height: 1rem;
      width: 100%;
      padding: 0 .3rem;
      border-bottom: .01rem solid #e5e5e5;
      font-size: .3rem;
      margin-bottom: .2rem;
      .buy {
        padding-bottom: .3rem;
        border-bottom: .04rem solid #d53d3d;
      }
      .sell {
        color: #0ec55b;
        padding-bottom: .3rem;
        border-bottom: .04rem solid #0ec55b;
      }

      .txt1 {
        color: #d53d3d;
        margin-right: .8rem;
      }

      .txt2 {
        color: #0ec55b;
        margin-right: 1.06rem;
      }

      .txt3 {
        font-size: .26rem;
        color: #999;
        margin-right: .1rem;
      }

      .icon {
        width: .14rem;
        height: .08rem;
        @include bg-image("限价下拉");
        margin-right: .36rem;
      }
      .txt4, .txt5, .txt6 {
        font-size: .2rem;
        color: #c2c2c2;
      }

      .txt4 {
        margin-right: .38rem;
      }
      .txt6 {
        float: right;
        margin-top: .06rem;
      }
    }

    .main {
      display: flex;
      width: 100%;
      padding: 0 .3rem;
      border-bottom: .2rem solid #f7f7f7;
      .left {
        margin-right: .2rem;
        .he9 {
          width: 3.9rem;
          height: .9rem;
          padding: 0 .2rem;
          border: .01rem solid #e5e5e5;
          display: flex;
          justify-content: space-between;
          line-height: .9rem;
          input[attr="placeholder"] {
            color: #999;
          }
          input {
            width: 85%;
            height: .87rem;
            font-size: .28rem;
            line-height: .87rem;
          }
        }
        .mb20 {
          margin-bottom: .2rem;
        }
        .text2 {
          margin: .18rem 0 .28rem;
          display: flex;
          justify-content: space-between;
          border: none;
          font-size: .2rem;
          color: #999;
          line-height: .2rem;
        }
        button {
          width: 100%;
          height: .8rem;
          background: #d53d3d;
          font-size: .34rem;
          color: #fff;
          margin: .3rem 0 .2rem;
        }
        .sell {
          background: #0ec55b;
        }
        .btn {
          border-top: none;
        }
      }
      .right {
        width: 100%;
        .one {
          .text1 {
            font-size: .2rem;
            color: #484848;
            line-height: .43rem;
            .txt1 {
              margin-right: .2rem;
              display: inline-block;
              width: .6rem;
              text-align: left;
            }
            .txt3 {
              float: right;
              text-align: right;
            }
            
          }
        }
        .middle {
          width: 100%;
          display: flex;
          justify-content: space-between;         
          margin: .36rem 0; 
          .icon {
            width: .24rem;
            height: .24rem;
            @include bg-image("转换");
          }
        }
      }
    }

    .entrust {
      width: 100%;
      padding: 0 .3rem;
      margin-bottom: .96rem;
      .tabs {
        line-height: .8rem;
        display: flex;
        justify-content: space-between;
        .current {
          color: #333;
        }
        .history {
          .icon {
            width: .25rem;
            height: .28rem;
            @include bg-image("历史");
            vertical-align: middle;
            margin-right: .12rem;
          }
        }
      }
      .history-main {
        color: #98999c;
        text-align: center;
        .icon {
          width: 1.64rem;
          height: .96rem;
          @include bg-image("暂无相关数据");
          margin: .54rem auto .22rem;
        }
        p {
          padding-bottom: .68rem;
        }
      }

      .current-history {
        width: 100%;
        .list {
          width: 100%;
          padding: .4rem 0;
          border-top: .01rem solid #e5e5e5;
          .text1 {
            padding-bottom: .4rem;
            .green {
              margin-right: .36rem;
            }
            .red {
              float: right;
            }
          }
          .text2 {
            display: flex;
            justify-content: space-between;
            font-size: .24rem;
            .black {
              font-size: .28rem;
              padding-top: .2rem;
            }
            .txt1 {
              text-align: left;
            }
            .txt2 {
              text-align: center;
            }
            .txt3 {
              text-align: right;
            }
          }
        }
      }
    }
  }

// K线图页面
  .Two{
    width: 100%;
    font-size: .32rem;
    color: #fff;
    .top-mian {
      width: 100%;
      padding: 0 .3rem;
      background: #1c2b3f;
      .top {
        line-height: .78rem;
        display: flex;
        justify-content: space-between;
        .ico1 {
          width: .2rem;
          height: .36rem;
          @include bg-image("返回白色");
          margin-top: .21rem;
        }
        .ico2 {
          width: .24rem;
          height: .15rem;
          @include bg-image("下拉白色");
          margin-left: .2rem;
          margin-bottom: .05rem;
        }
        .ico3 {
          width: .28rem;
          height: .27rem;
          @include bg-image("星星白色");
          margin-top: .25rem;
        }
      }
      .text1 {
        padding-bottom: .2rem;
        .txt1 {
          margin-right: .21rem;
        }
        .txt3 {
          font-size: .42rem;
          font-weight: bold;
        }
        .txt4 {
          margin-left: .3rem;
          font-weight: bold;
        }
      }
      .text2, .text3{
        display: flex;
        padding-bottom: .2rem;
        p {
          flex: 1;
          font-size: .26rem;
          .gray {
            margin-right: .25rem;
            font-size: .24rem;
          }
        }
      }


    }

    .main1 {
      width: 100%;
      height: 9.12rem;
      background: #1c2b3f;
    }
    .main2 {
      width: 100%;
      margin-bottom: 1.85rem;
      .tabs {
        width: 100%;
        padding: 0 .3rem;
        background: #1c2b3f;
        display: flex;
        line-height: .8rem;
        a {
          font-size: .28rem; 
          color: #fff;
          margin: 0 .35rem;
        }
        .tab-item {
          flex: 1;
          text-align: center;
          &.router-link-active {
            color: #d53d3d;
            border-bottom: .03rem solid #d53d3d;
          }

        }
        
      }
      .foot {
        width: 100%;
        position: fixed;
        bottom: .96rem;
        display: flex;
        .buy {
          background: #d53d3d;
        }
        .sell {
          background: #0ec55b;
        }
        button {
          flex: 1;
          height: .9rem;
          a {
            font-size: .32rem;
            color: #fff;
          }
        }
      }

    }
  }



}

</style>
