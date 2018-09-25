<template>
  <div class="wallet-wrapper" @click.stop>
      <header>
        我的资产
      </header>
      <div class='banner'>
        <p class='txt1'><span class='icon ico'></span>总资产X币</p>
        <div class='txt2' style='margin-top:.3rem;'>
          <p class='t1'>{{info[1].amount}}</p>
          <!-- <p class='t1'>{{amount}}</p> -->
          <!-- <p class='t2'>≈60000.00 CNY</p> -->
        </div>
        <div class='txt3'>
          <!-- <div class='left'>
            <p>币币资产 0.000987</p>
            <p>≈60000.00 CNY</p>
          </div>
          <div class='right'>
            <p>场外资产 0.000987</p>
            <p>≈60000.00 CNY</p>
          </div> -->
        </div>
      </div>
      <div class='dollar'>
        <i class='icon ico1'></i>
        <span>$1≈¥6.6079</span>
        <i class='icon ico2'></i>
        <i class='icon ico3'></i>   
      </div>
      <div class='my-assets'>
        <i class="icon ico1"></i>
        <div class='my'>
          <p class='txt1'>自己币种资产({{info[1].currency}})</p>
          <p class='txt2'>{{info[1].amount}}</p>
          <p class='txt3'><span>冻结{{info[1].frozenAmount}}</span><span>可用{{info[1].amount - info[1].frozenAmount}}{{info[1].currency}}</span><span></span></p>
        </div>
        <div class='datil'>
          <div class='box'><i class='icon ico1'></i><router-link to='wallet-into'>转入</router-link></div>|
          <div class='box'><i class='icon ico2'></i><router-link to='wallet-out'>转出</router-link></div>|
          <div class='box'><i class='icon ico3'></i><router-link to='wallet-bill'>账单</router-link></div>
        </div>
        <div class='operate'>
          <router-link to='wallet-top-up' class='txt1'>充值</router-link>|
          <router-link to='wallet-top-up' class='txt2'>提现</router-link>
        </div>
      </div>
      <div class='my-assets my-assets1'>
        <i class="icon ico1 icon1"></i>
        <div class='my'>
          <p class='txt1'>比特币资产({{info[2].currency}})</p>
          <p class='txt2'>{{info[2].amount}}</p>
          <p class='txt3'><span>冻结{{info[2].frozenAmount}}</span><span>可用{{info[2].amount - info[2].frozenAmount}}{{info[2].currency}}</span><span></span></p>
        </div>
        <div class='datil datil1'>
          <div class='box'><i class='icon ico1'></i><router-link to='wallet-into'>转入</router-link></div>|
          <div class='box'><i class='icon ico2'></i><router-link to='wallet-out'>转出</router-link></div>|
          <div class='box'><i class='icon ico3'></i><router-link to='wallet-bill'>账单</router-link></div>
        </div>
      </div>
      <div class='my-assets my-assets1'>
        <i class="icon ico1 icon2"></i>
        <div class='my'>
          <p class='txt1'>以太币资产({{info[0].currency}})</p>
          <p class='txt2'>{{info[0].amount}}</p>
          <p class='txt3'><span>冻结{{info[0].frozenAmount}}</span><span>可用{{info[0].amount - info[0].frozenAmount}}{{info[0].currency}}</span><span></span></p>
        </div>
        <div class='datil datil1'>
          <div class='box'><i class='icon ico1'></i><router-link to='wallet-into'>转入</router-link></div>|
          <div class='box'><i class='icon ico2'></i><router-link to='wallet-out'>转出</router-link></div>|
          <div class='box'><i class='icon ico3'></i><router-link to='wallet-bill'>账单</router-link></div>
        </div>
      </div>
      <Footer></Footer>
  </div>
</template>
<script>
import Footer from 'components/footer/footer';
import {wallet} from '../../api/person';
import jquery from 'jquery';
import {getUserId, moneyFormat, moneyParse, moneyReplaceComma, moneyFormatSubtract, getCoinList, setCoinData } from '../../common/js/util';

export default {
  data() {
    return {
      info: [{}, {}, {}]
    };
  },
  computed: {},
  created() {
    this.wallet();
  },
  methods: {
    wallet() {
      wallet().then(v => {
        v.map( v => {
          v.amount = moneyFormat(v.amount, 8);
        } )
        this.info = v;
      });
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

.wallet-wrapper {
  font-size: .3rem;
  font-family: PingFangSC-Medium;
  color: #333;
  width: 100%;
  padding: 0 .3rem .96rem .3rem;
  background: #fff;
  overflow: auto;

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    width: 100%;
    line-height: .9rem;
    font-size: .36rem;
    font-weight: bold;
    text-align: center;
  }

  .banner {
    width: 100%;
    height: 2.9rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    @include bg-image("banner");
    color: #fff;
    font-size: .22rem;

    .txt1, .txt2 {
      text-align: center;
    }

    .txt1 {
      padding-top:.52rem;
      padding-bottom: .12rem;
      font-size: .24rem;
      color: #fff5f3;
      line-height: .24rem;
      letter-spacing: .002rem;


      .ico {
        width: .22rem;
        height: .24rem;
        @include bg-image("资产");
        vertical-align: middle;
        margin-right: .083rem;
      }
    }

    .txt2 {
      .t1 {
        font-size: .52rem;
        line-height: .52rem;
        text-shadow: .04rem 0 .08rem rgba(206,58,7,0.20);
        padding-bottom: .06rem;
      }
      .t2 {
        font-size: .22rem;
        letter-spacing: .0018rem;
        margin-bottom: .22rem;
      }
    }

    .txt3 {
      width: 100%;
      padding: 0 .85rem 0 .74rem;
      display: flex;
      justify-content: space-between;
      font-size: .22rem;
      line-height: .32rem;
    }
    
   

  }

  .dollar {
    height: .9rem;
    line-height: .9rem;
    .ico1, .ico2 {
      width: .45rem;
      height: .3rem;
    }
    .ico1 {
      @include bg-image("美国");
      margin: 0 .22rem 0 .1rem ;
    }
    .ico2 {
      @include bg-image("中国");
      margin-left: .21rem;
      margin-right: 3.2rem;
    }
    .ico3 {
      width: .148rem;
      height: .255rem;
      @include bg-image("更多");
    }
  }

  .my-assets {
    width: 100%;
    height: 4rem;
    background: #FFFFFF;
    box-shadow: 0 .04rem .2rem 0 rgba(131,128,128,0.14);
    border-radius: .14rem;
    position: relative;
    margin-bottom: .2rem;
    .ico1 {
      width: 1.2rem;
      height: 1.2rem;
      @include bg-image("x");
      position: absolute;
      top: .3rem;
      right: .4rem;
    }
    .my {
      padding: .3rem .62rem .3rem .2rem;
      .txt1 {
        color: #D53D3D;
        letter-spacing: .0025rem;
        line-height: .42rem;
        padding-bottom: .22rem;
        margin-left: .1rem;
      }
      .txt2 {
        font-size: .48rem;
        line-height: .48rem;
        color: #333;
        margin-left: .1rem;
        padding-bottom: .24rem;
      }
      .txt3 {
        font-size: .22rem;
        line-height: .24rem;
        color: #999;
        display: flex;
        justify-content: space-between;
      }
    }
    .datil {
      width: 100%;
      line-height: .8rem;
      font-size: .26rem;
      color: #e5e5e5;
      display: flex;
      border-top: .01rem solid #e5e5e5;
      border-bottom: .01rem solid #e5e5e5;
      .box {
        flex: 1;
        text-align: center;
        position: relative;
        color: #333;

        a {
          color: #333;
        }

        .ico1 {
          width: .29rem;
          height: .26rem;
          @include bg-image("转入");
          margin-right: 1.1rem;
        }
        .ico2 {
          width: .3rem;
          height: .3rem;
          @include bg-image("转出");
          margin-right: .1rem;
          vertical-align: middle;
        }

        .ico3 {
          width: .26rem;
          height: .3rem;
          @include bg-image("账单");
          margin-right: .1rem;
          vertical-align: middle;
        }

      }

    }

    .operate {
      display: flex;
      font-size: .32rem;
      line-height: 1rem;
      color: #e5e5e5;
      a {
        flex: 1;
        text-align: center;
        font-size: .32rem;
        color: #333;
      }
    }

    .datil1 {
      border-bottom: none;
    }

  }

  .my-assets1 {
    height: 3rem;
    .icon1 {
      @include bg-image("比特");
    }
    .icon2 {
      @include bg-image("以太");
    }
  }


}

</style>
