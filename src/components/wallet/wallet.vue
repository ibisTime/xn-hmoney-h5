<template>
  <div class="wallet-wrapper" @click.stop>
    <div class='banner'>
      <p class='txt1'><span class='icon ico'></span>总资产 {{cdInfo.currency}} 币</p>
      <div class='txt2' style='margin-top:.3rem;'>
        <p class='t1'>{{cdInfo.symbol}} {{currency}}</p>
      </div>
      <div class='txt3'>
      </div>
    </div>
    <!-- <div class='dollar'>
      <i class='icon ico1'></i>
      <span>$1 ≈ ¥6.6079</span>
      <i class='icon ico2'></i>
      <i class='icon ico3'></i>
    </div> -->
    <div class='my-assets' v-for="(infoItem, index) in info" :key="index">
      <i class="icon"
         :class="[{'ico1': infoItem.currency == 'FMVP'}, {'ico2': infoItem.currency == 'ETH'}, {'ico3': infoItem.currency == 'BTC'}]"></i>
      <div class='my'>
        <p class='txt1'>{{infoItem.currency}}币种资产({{infoItem.currency}})</p>
        <p class='txt2'>{{formatAmount(infoItem.amount, '', infoItem.currency)}}</p>
        <p class='txt3'><span :title="infoItem.frozenAmount">冻结{{formatAmount(infoItem.frozenAmount, '', infoItem.currency)}}</span><span
          :title="infoItem.amount - infoItem.frozenAmount">可用{{formatMoneySubtract(infoItem.amount, infoItem.frozenAmount, '', infoItem.currency)}} {{infoItem.currency}}</span>
        </p>
      </div>
      <div class='datil'>
        <div class='box'><i class='icon ico1'></i>
          <router-link
            :to="'wallet-into'+'?adress='+infoItem.address + '&currency=' + infoItem.currency + '&accountNumber=' + infoItem.accountNumber ">
            转入
          </router-link>
        </div>
        |
        <div class='box' @click="zcMoneyFn(infoItem.currency, infoItem.amount, infoItem.accountNumber)"><i
          class='icon icoz'></i><span>转出</span></div>
        |
        <div class='box'><i class='icon icoc'></i>
          <router-link :to="'wallet-bill'+'?accountNumber='+infoItem.accountNumber">账单</router-link>
        </div>
      </div>
      <div class='operate' v-if="infoItem.currency === 'FMVP'">
        <router-link to='wallet-top-up?type=buy' class='txt1'>充值</router-link>
        <router-link to='wallet-top-up?type=sell' class='txt2'>提现</router-link>
      </div>
    </div>
    <Footer></Footer>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import Footer from 'components/footer/footer';
  import {userAllMoneyX, wallet, getUser} from 'api/person';
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';
  import {
    getUserId,
    formatAmount,
    formatMoneySubtract,
    moneyParse,
    getCoinList,
    setCoinData,
    setTitle
  } from 'common/js/util';

  export default {
    data() {
      return {
        textMsg: '',
        isLoading: true,
        info: [{}, {}, {}],
        cdInfo: {},
        currency: 'CNY'
      };
    },
    computed: {},
    created() {
      setTitle('我的资产');
      this.wallet();
      userAllMoneyX(this.currency).then(v => {
        this.cdInfo = v;
      })
    },
    methods: {
      // 列表查询用户账户
      wallet() {
        wallet().then(v => {
          this.info = v;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      // 转出
      zcMoneyFn(currency, amount, accountNumber) {
        getUser().then(data => {
          if (data.tradepwdFlag && data.realName) {
            this.$router.push(`wallet-out?currency=${currency}&amount=${amount}&accountNumber=${accountNumber}`);
          } else if (!data.realName) {
            this.textMsg = '请先进行身份验证';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/security-center');
            }, 1500);
          } else if (!data.tradepwdFlag) {
            this.textMsg = '请先设置资金密码';
            this.$refs.toast.show();
            setTimeout(() => {
              this.$router.push('/security-center');
            }, 1500);
          }
        });
      },
      formatAmount(money, format, coin) {
        return formatAmount(money, format, coin);
      },
      formatMoneySubtract(s1, s2, format, coin) {
        return formatMoneySubtract(s1, s2, format, coin);
      }
    },
    components: {
      Footer,
      Toast,
      FullLoading
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
    padding: 0.3rem .3rem .96rem .3rem;
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
        padding-top: .52rem;
        padding-bottom: .12rem;
        font-size: .24rem;
        color: #fff5f3;
        line-height: .24rem;
        letter-spacing: .002rem;

        .ico {
          width: .22rem;
          height: .24rem;
          background-image: url('./uzc.png');
          vertical-align: middle;
          margin-right: .083rem;
        }
      }

      .txt2 {
        .t1 {
          font-size: .52rem;
          line-height: .52rem;
          text-shadow: .04rem 0 .08rem rgba(206, 58, 7, 0.20);
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
        background-image: url('./mg.png');
        margin: 0 .22rem 0 .1rem;
      }
      .ico2 {
        background-image: url('./zg.png');
        margin-left: .21rem;
        margin-right: 3.2rem;
      }
      .ico3 {
        width: .148rem;
        height: .255rem;
        background-image: url('./gd.png');
      }
    }

    .my-assets {
      width: 100%;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 .04rem .2rem 0 rgba(131, 128, 128, 0.14);
      border-radius: .14rem;
      position: relative;
      margin-bottom: 0.5rem;
      .ico1, .ico2, .ico3 {
        width: 1.2rem;
        height: 1.2rem;
        @include bg-image("x");
        position: absolute;
        top: .3rem;
        right: .4rem;
      }
      .ico2 {
        background-image: url('./yt.png');
      }
      .ico3 {
        background-image: url('./bt.png');
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
          span {
            width: 49%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .datil {
        width: 100%;
        line-height: .8rem;
        font-size: .26rem;
        color: #e5e5e5;
        display: flex;
        border-top: 0.01rem solid #e5e5e5;
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
            background-image: url('./zr.png');
            margin-right: 1.1rem;
          }
          .icoz {
            width: .3rem;
            height: .3rem;
            background-image: url('./zc.png');
            margin-right: .1rem;
            vertical-align: middle;
          }

          .icoc {
            width: .26rem;
            height: .3rem;
            background-image: url('./zd.png');
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
        border-top: 0.01rem solid #e5e5e5;
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

  }

</style>
