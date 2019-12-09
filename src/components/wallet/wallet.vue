<template>
  <div class="wallet-wrapper">
    <div class="wrapper">
      <Scroll :pullUpLoad="null">
        <div style="padding-bottom: 0.8rem; padding-top: 0.3rem;">
          <div class='banner'>
            <p class='txt1'><span class='icon ico'></span>{{$t('wallet.subject.zzc')}} {{cdInfo.symbol}}</p>
            <div class='txt2' style='margin-top:.12rem;'>
              <p class='t1'>{{cdInfo.totalAmountTWT}} TWT</p>
              <p style="font-size: 0.24rem;margin-top: 0.08rem;">≈ {{currency === 'CNY' ? cdInfo.totalAmountCNY : cdInfo.totalAmountUSD}} {{currency}}</p>
            </div>
            <div class='txt3'>
            </div>
          </div>
          <div class='my-assets' v-for="(infoItem, index) in info" :key="index">
            <i class="icon" :style="{backgroundImage: `url('${infoItem.coinIcon}')`}"></i>
            <div class='my'>
              <p class='txt1'>{{infoItem.currency}}{{$t('wallet.subject.bzzc')}}</p>
              <p class='txt2'>{{infoItem.amount}}</p>
              <div class='txt3'>
                <p :title="infoItem.frozenAmount">折合：{{infoItem.current}} {{currency}}</p>
                <p :title="infoItem.syAmount" class="sy_p">
                  冻结：{{infoItem.frozenAmount}}
                </p>
              </div>
            </div>
            <div class='datil'>
              <div class='box' @click="toZrMoney(infoItem)">
                <i class='icod'></i>
                <span>充币</span>
              </div>
              |
              <div
                class='box'
                @click="zcMoneyFn(infoItem)"
              ><i class='icoz'></i><span>提币</span></div>
              |
              <div class='box'>
                <i class='icoc'></i>
                <router-link
                  :to="'wallet-bill'+'?accountNumber='+infoItem.accountNumber"
                  @click.native="() => {
                    toWalletBill(infoItem);
                  }"
                >{{$t('wallet.subject.zd')}}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="transfer_box" @click="toWalletTransfer">
      转账
    </div>
    <Footer></Footer>
    <Toast :text="textMsg" ref="toast"/>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import Footer from 'components/footer/footer';
  import Scroll from 'base/scroll/scroll';
  import {wallet, getUser} from 'api/person';
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
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        textMsg: '',
        isLoading: true,
        info: [{}, {}, {}],
        cdInfo: {},
        currency: 'CNY',
        loginName: ''
      };
    },
    created() {
      setTitle(this.$t('wallet.subject.wdzc'));
      this.currency = sessionStorage.getItem('WALLET_CURRY') || 'CNY';
      this.wallet();
      sessionStorage.removeItem('paw_go_back');
      sessionStorage.removeItem('walletItem');
    },
    methods: {
      // 列表查询用户账户
      wallet() {
        wallet().then(v => {
          this.cdInfo = {
            totalAmountCNY: v.totalAmountCNY > 0 ? ((Math.floor(v.totalAmountCNY * 100)) / 100).toFixed(2) : '0.00',
            totalAmountTWT: v.totalAmountTWT > 0 ? ((Math.floor(v.totalAmountTWT * 1e8)) / 1e8).toFixed(8) : '0.00000000',
            totalAmountUSD: v.totalAmountUSD > 0 ? ((Math.floor(v.totalAmountUSD * 100)) / 100).toFixed(2) : '0.00'
          };
          this.info = v.accountList.map(item => ({
            ...item,
            syAmount: item.amount === 0 ? '0.00000000' : formatMoneySubtract(item.amount, item.frozenAmount, '8', item.currency),
            amount: item.amount === 0 ? '0.00000000' : formatAmount(item.amount, '8', item.currency),
            frozenAmount: item.frozenAmount === 0 ? '0.00000000' :formatAmount(item.frozenAmount, '8', item.currency),
            current: this.currency === 'CNY' ? item.currentCny : item.currentUsd,
            coinIcon: PIC_PREFIX + item.coinIcon
        }));
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      },
      // 转出
      zcMoneyFn(infoItem) {
        getUser().then(data => {
          if (data.tradepwdFlag) {
            sessionStorage.setItem('walletItem', JSON.stringify(infoItem));
            this.$router.push(`wallet-out?currency=${infoItem.currency}&amount=${infoItem.amount}&accountNumber=${infoItem.accountNumber}&loginName=${data.loginName}`);
          } else if (!data.tradepwdFlag) {
            this.textMsg = this.$t('wallet.subject.szjymm');
            this.$refs.toast.show();
            setTimeout(() => {
              const goBack = this.$route.path;
              sessionStorage.setItem('paw_go_back', goBack);
              this.$router.push('/security-tradePassword?istw=0');
            }, 1500);
          }
        });
      },
      toZrMoney(infoItem) {
        sessionStorage.setItem('walletItem', JSON.stringify(infoItem));
        this.$router.push(`/wallet-into?adress=${infoItem.address}&currency=${infoItem.currency}&accountNumber=${infoItem.accountNumber}`);
      },
      formatAmount(money, format, coin) {
        return formatAmount(money, format, coin);
      },
      formatMoneySubtract(s1, s2, format, coin) {
        return formatMoneySubtract(s1, s2, format, coin);
      },
      toOtcFn(){
        sessionStorage.removeItem('coin');
        sessionStorage.setItem('tradeType', '1');
      },
      toWalletBill(infoItem) {
        sessionStorage.setItem('walletItem', JSON.stringify(infoItem));
      },
      toWalletTransfer() {
        this.$router.push(`/wallet-transfer`);
      }
    },
    components: {
      Footer,
      Toast,
      FullLoading,
      Scroll
    },
    computed: mapGetters([
      'isUpdateAccount'
    ]),
    watch: {
      isUpdateAccount() {
        this.wallet();
      }
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
    background: #fff;
    .wrapper{
      position: absolute;
      z-index: 10;
      top: 0rem;
      bottom: 0rem;
      left: 0.3rem;
      right: 0.3rem;
      overflow: auto;
    }
    .icon {
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
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
      margin-bottom: 0.2rem;

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
      .icon {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: .3rem;
        right: .4rem;
        border-radius: 100%;
        opacity: 0.6;
      }
      .my {
        padding: .3rem .36rem .3rem .2rem;
        .txt1 {
          color: #D53D3D;
          letter-spacing: .0025rem;
          line-height: .42rem;
          padding-bottom: .22rem;
        }
        .txt2 {
          font-size: .48rem;
          line-height: .48rem;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.14rem;
        }
        .txt3 {
          font-size: .22rem;
          color: #999;
          .sy_p{
            border-radius: 0.04rem;
            margin-top: 0.22rem;
            padding: 0.14rem 0.2rem;
            background-color: #F5F5F5;
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
            display: inline-block;
          }

          .icon{
            margin-top: -0.04rem;
          }

          .icod {
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: none;
            width: .3rem;
            height: .26rem;
            background-image: url('./zr.png');
            background-size: .3rem;
            vertical-align: middle;
          }
          .icoz {
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: none;
            width: .26rem;
            height: .26rem;
            background-image: url('./zc.png');
            margin-right: .1rem;
            vertical-align: middle;
            background-size: .26rem;
          }

          .icoc {
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: none;
            width: .26rem;
            height: .3rem;
            background-image: url('./zd.png');
            margin-right: .1rem;
            background-size: .26rem;
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
    .transfer_box{
      position: fixed;
      bottom: 1.4rem;
      right: 0.2rem;
      width: 0.88rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      border-radius: 100%;
      background-color: #D53D3D;
      color: #fff;
      font-size: 0.26rem;
      z-index: 999;
      opacity: 0.8;
      &:hover{
        opacity: 0.9;
      }
    }
  }

</style>
