<template>
  <div class="otcbuy-wrapper" @click.stop>
      <!-- <header>
        <i class='icon'></i><span class='title'>购买</span> 
      </header> -->
      <div class='header'>
        <div class='person'>
          <div class='pic'>
            <p :style="getUserPic(photo)" :class="{'hidden': !(photo)}" alt=""></p>
            <img :class="{'hidden': photo}" src="./txiang.png"/>
          </div>
          <div class='text'>
            <p class='name'><span class='txt1'>{{data.user.nickname}}</span><span class='icon'>{{bizTypeList[data.payType]}}</span></p>
            <p class='num'>限额：{{data.minTrade}}-{{data.maxTrade}} {{data.tradeCurrency}}</p>
          </div>
          <div class='money'>{{truePrice}} {{data.tradeCurrency}}</div>
        </div>
        <div class='about'>
          <div>
            <p>{{data.userStatistics.jiaoYiCount}}</p>
            <span>交易次数</span>
          </div>
          <div>
            <p>{{data.userStatistics.beiXinRenCount}}</p>
            <span>信任次数</span>
          </div>
          <div>
            <p>{{data.userStatistics.beiPingJiaCount != 0 ? getPercentum(data.userStatistics.beiHaoPingCount, data.userStatistics.beiPingJiaCount) : '0'}}%</p>
            <span>好评率</span>
          </div>
          <div>
            <p>{{data.userStatistics.totalTradeCount === '0' ? '0' : formatAmount(data.userStatistics.totalTradeCount, 0, data.tradeCoin) + '+' + data.tradeCoin}}</p>
            <span>历史交易</span>
          </div>
        </div>
      </div>
      <div class='message'>
        广告留言：{{data.leaveMessage}}
      </div>
      <div class='main'>
        <div class='want'>
          <p class='txt1'><span class='icon1'></span>你想{{bText}}多少？</p>
          <p class='txt2'>{{type == '0' ? '可用余额' : '广告剩余可交易量'}}：{{yMoney}} {{data.tradeCoin}}</p>
          <div class='text'>
            <p class='txt3'><span class='txt'> {{data.tradeCurrency}}</span><input class="inp1" type="number" v-model="Cnum" @keyup="changeEnum" placeholder="请输入数字"></p>
            <p class=txt4><span class='icon2'></span><span class='txt'> {{data.tradeCoin}}</span><input v-model="Enum" @keyup="changeCnum" class="inp2" type="number" placeholder="请输入数值"></p>
          </div>
        </div>
      </div>

      <div class='remind'>
          <p class='txt1'><span class='icon1'></span>{{remark}}</p>
          <p class='cont' v-html="jyText"></p>
      </div>
      <div class='footer'>
          <div class='chat' @click='getChatOrderBuy'>
            <span></span>
            联系对方
          </div>
          <div class='buy' @click='showOrder'>
              {{bText}}
          </div>
      </div>
      <div v-show='show && type === "0"' class='pop-up'>
        <div class='up-window'>
          <h3>资金密码</h3>
          <div class='text'>
            <input type="password" placeholder="请输入资金密码" v-model="userMoney">
          </div>
          <div class='btn'>
            <button class='no' @click='qxMoney'>取消</button>
            <button class='yes' @click="qrMoney">确认</button>
            <router-link to='order-details'></router-link>
          </div>
        </div>
      </div>
      <div v-show='showBuy' class='pop-up'>
        <div class='pop-up-window'>
          <div class='ico'><span></span></div>
          <h3>下单确定</h3>
          <div class='text'>
          <p><span class='txt1'>{{bText}}价格</span><span class='txt2'>{{truePrice}} {{data.tradeCurrency}}</span></p>
          <p><span class='txt1'>{{bText}}金额</span><span class='txt2'>{{Cnum}} {{data.tradeCurrency}}</span></p>
          <p><span class='txt1'>{{bText}}数量</span><span class='txt2'>{{Enum}} {{data.tradeCoin}}</span></p>
          </div>
          <div class='prompt'>
            <span class='icon'></span>
            <span class='txt'>提醒：请确认价格再下单，下单后此交易的 {{data.tradeCoin}}将冻结锁定，请放心{{bText}}</span>
          </div>
          <div class='btn'>
            <button class='no' @click='qxBuy'>放弃{{bText}}</button>
            <button class='yes' @click="qrBuy">确认{{bText}}</button>
            <router-link to='order-details'></router-link>
          </div>
        </div>
      </div>
      <Toast :text="textMsg" ref="toast" />
      <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
import { formatAmount, setTitle, getUrlParam, formatMoneySubtract, formatMoneyMultiply, getAvatar, getPercentum } from 'common/js/util';
import { otcBuy, buyETH, sellBB, chatOrderBuy } from "api/otc";
import {getUser} from 'api/person';
import { getSysConfig } from "api/general";
import { wallet } from "api/person";
import Toast from 'base/toast/toast';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      show: false,
      showBuy: false,
      isLoading: true,
      textMsg: '',
      userMoney: '',
      yMoney: '',
      bText: '购买',
      data: {
        user: {
          nickname: ''
        },
        userStatistics: {
          jiaoYiCount: 0,
          beiXinRenCount: 0,
          beiPingJiaCount: 0,
          beiHaoPingCount: 0,
          totalTradeCount: 0
        }
      },
      bizTypeList: {
        "0": "支付宝",
        "1": "微信",
        "2": "银行卡转账"
      },
      rate: '',
      truePrice: '',
      Cnum: '',
      Enum: '',
      jyText: '',
      remark: '',
      type: '',
      config: {
        adsCode: '',
        count: '',
        tradeAmount: '',
        tradePrice: '',
        tradePwd: ''
      },
      photo: '',
      userId: ''
    };
  },
  created() {
    this.type = getUrlParam('type');
    this.userId = getUrlParam('userId');
    this.config.adsCode = getUrlParam('adsCode');
    if(this.type === '1'){
      this.bText = '购买';
      setTitle('购买');
    }else{
      this.bText = '出售';
      setTitle('出售');
    }
    getUser(this.userId).then(data => {
      this.photo = data.photo;
    });
    this.otcBuy();
    getSysConfig('trade_remind').then(data => {
      this.jyText = data.cvalue.replace(/\n/g, '<br>');
      this.remark = data.remark;
      this.isLoading = false;
    })
  },
  methods: {
    // 购买开始聊天，提交交易订单
    getChatOrderBuy() {
      this.isLoading = true;
      chatOrderBuy(this.config.adsCode).then(data => {
        this.isLoading = false;
        this.goChat(data.code);
      }).catch(() => {
        this.isLoading = false
      });
    },
    goChat(orderCode) {
      this.$router.push(`/message/${orderCode}`);
    },
    getPercentum(num1, num2){
      return getPercentum(num1, num2);
    },
    // 获取头像
    getUserPic(pic){
      return getAvatar(pic);
    },
    configFn(){
      this.config.count = formatMoneyMultiply(this.Enum, '', this.data.tradeCoin);
      this.config.tradeAmount = this.Cnum.toString();
    },
    // 资金密码弹框、出售
    qrMoney(){
      this.showBuy = true;
      this.show = false;
      if(this.userMoney === ''){
        this.textMsg = '请输入资金密码';
        this.$refs.toast.show();
        this.showBuy = false;
      }else{
        this.configFn();
        this.config.tradePwd = this.userMoney;
        this.showBuy = false;
        this.isLoading = true;
        sellBB(this.config).then(data => {
          this.userMoney = '';
          sessionStorage.setItem('tradeType', '0');
          this.textMsg = '订单提交成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push('/otc');
          }, 1500);
        }, (err) => {
          this.textMsg = err;
          this.$refs.toast.show();
          this.showBuy = false;
          this.isLoading = false;
        })
      }
    },
    qxMoney(){
      this.show = false;
      this.userMoney = '';
    },
    // 确认下单弹框
    showOrder(){
      if(this.Enum > 0 && this.Cnum > 0){
        this.showBuy = true;
      }else{
        this.textMsg = '请输入购买数量与购买金额';
        this.$refs.toast.show();
      }
    },
    formatAmount(money, format, coin) {
      return formatAmount(money, format, coin);
    },
    otcBuy() {
      this.isLoading = true;
      otcBuy(getUrlParam('adsCode'), getUrlParam('userId')).then((data) => {
        this.data = data;
        this.config.tradePrice = data.truePrice;
        this.truePrice = data.truePrice.toFixed(2);
        this.rate = this.truePrice;
        wallet().then(items => {
          let bbMoney = items.filter(item => {
            return data.tradeCoin === item.currency;
          });
          if(this.type == '0'){
            this.yMoney = formatMoneySubtract(`${bbMoney[0].amount}`, `${bbMoney[0].frozenAmount}`, '', bbMoney[0].currency);
          }else{
            this.yMoney = this.formatAmount(`${data.leftCountString}`, '', data.tradeCoin);
          }
          this.isLoading = false;
        });
      }, () => {
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    },
    changeEnum() {
      this.Enum = this.Cnum / this.rate;
    },
    changeCnum() {
      this.Cnum = this.Enum * this.rate;
    },
    // 确认购买
    qrBuy(){
      this.show = true;
      this.showBuy = false;
      this.userMoney = '';
      if(this.type === '1'){
        this.configFn();
        delete this.config.tradePwd;
        this.isLoading = true;
        buyETH(this.config).then(data => {
          sessionStorage.setItem('tradeType', '1');
          this.textMsg = '订单提交成功';
          this.$refs.toast.show();
          setTimeout(() => {
            this.$router.push('/otc');
          }, 1500);
        }, (err) => {
          this.textMsg = err;
          this.$refs.toast.show();
          this.showBuy = false;
          this.isLoading = false;
        })
      }
    },
    qxBuy(){
      this.showBuy = false;
    }
  },
  components: {
    Toast,
    FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.otcbuy-wrapper {
  font-family: PingFangSC-Medium;
  font-size: 0.3rem;
  background: #fff;

  header {
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.36rem;
      color: #333;
      font-weight: bold;
      width: 100%;
      padding: 0 .3rem;

      .icon {
          display: inline-block;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          width: 0.21rem;
          height: 0.36rem;
          background-image: url('./fh.png');
          float: left;
          margin-top: .26rem;
      }
  }


  .header {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 0.01rem solid #eee;
    border-left: none;
    border-right: none;

    .person {
      display: flex;
      width: 100%;
      padding: 0 .3rem;
      
      .pic {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        margin-top: 0.26rem;
        margin-right: 0.2rem;
        margin-bottom: 0.46rem;
        p{
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          border-radius: 100%;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }

      .text {
        margin-top: 0.36rem;
        width: 3.7rem;
        .name {
          font-size: 0.32rem;
          line-height: 0.28rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.24rem;
          .txt1 {
            display: inline-block;
            line-height: 0.28rem;
            width: 1.3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .icon {
            display: inline-block;
            width: 0.76rem;
            height: 0.3rem;
            border-radius: 0.03rem;
            background: #0ec55b;
            text-align: center;
            font-size: 0.2rem;
            line-height: 0.28rem;
            color: #fff;
            margin-left: 0.12rem;
          }
        }

        .num {
          font-size: 0.24rem;
          color: #999;
        }
      }

      .money {
        text-align: right;
        width: 2.1rem;
        font-size: 0.3rem;
        color: #0ec55b;
        line-height: 1.4rem;
      }
    }

    .about {
      display: flex;
      padding: 0 0.54rem;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 0.18rem;

      p {
        font-size: 0.34rem;
        color: #333;
        margin-bottom: 0.18rem;
      }

      span {
        font-size: 0.22rem;
        color: #999;
      }
    }
  }

  .message {
    font-size: 0.28rem;
    line-height: 0.36rem;
    color: #333;
    padding: 0.3rem 0.54rem 1.42rem 0.3rem;
    border-bottom: 0.2rem solid #f7f7f7;
  }

  .main {
    border-bottom: 0.2rem solid #f7f7f7;
    padding: 0 0.3rem 0.3rem 0.3rem;
    .want {
      padding: 0.28rem 0 0.3rem;
      border-bottom: 0.01rem solid #e5e5e5;

      .txt1 {
        font-size: 0.3rem;
        color: #333;
        margin-bottom: 0.34rem;

        .icon1 {
          display: inline-block;
          width: 0.27rem;
          height: 0.3rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          background-image: url('./gmds.png');
          margin-right: 0.14rem;
        }
      }

      .txt2 {
        font-size: 0.24rem;
        color: #d53d3d;
        margin-bottom: 0.4rem;
      }

      .text {
        display: flex;
        justify-content: space-between;

        .txt {
          font-size: 0.3rem;
          color: #333;
          margin-right: 0.2rem;
        }

        .txt3 {
          width: 3.2rem;
          input {
            width: 2.3rem;
            border: none;
            font-size: 0.28rem;
            height: 0.3rem;
            line-height: 0.3rem;
          }
        }
        .txt4 {
          width: 3.6rem;
          .icon2 {
            display: inline-block;
            width: .49rem;
            height: .49rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            background-image: url('./z_h.png');
            margin-right: .1rem;
            vertical-align: middle;
           
          }

          input {
            width: 1.8rem;
            border: none;
            font-size: 0.28rem;
            height: 0.3rem;
            line-height: 0.3rem;
          }
        }
      }
    }
  }

  .remind {
    width: 100%;
    height: 2.4rem;
    padding: .28rem .3rem;
    color: #333;

    .txt1 {
      margin-bottom: .4rem;

      .icon1 {
        display: inline-block;
        width: .26rem;
        height: .3rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./jytx.png');
        margin-right: .14rem;
      }
    }

    .cont {
      font-size: .26rem;
      line-height: .35rem;
    }

  }

  .footer {
    height: 1rem;
    width: 100%;
    // position: fixed;
    // bottom: 0;
    // z-index: 99999;
    background: #fff;
    display: flex;
    line-height: 1rem;
    font-size: .32rem;
    color: #333;
    justify-content: space-between;
    .chat {
      width: 61.6%;
      border-top: .01rem solid #e6e6e6;
      span {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        background-image: url('./ltian.png');
        margin: 0 .16rem 0 .3rem;
      }
    }
    .buy{
      width: 38.4%;
      background: #d53d3d;
      text-align: center;
      color: #fff;
    }
  }

  .pop-up {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;
      .pop-up-window, .up-window {
        position: absolute;
        top: 2.1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 6.14rem;
        height: 6.2rem;
        background: #fff;
        border-radius: .2rem;
        padding: .3rem .6rem .64rem;

        .ico,h3 {
          text-align: center;
          font-size: .32rem;
          color: #333;
        }

        .ico span {
          display: inline-block;
          width: .42rem;
          height: .44rem;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          background-image: url('./xdqr.png');
          margin-bottom: .24rem;
        }

        .text {
          font-size: .24rem;
          margin: .4rem 0 .62rem;

          p {
            display: flex;
            justify-content: space-between;
            margin-bottom: .32rem;
          }
          .txt1 {
            color: #666;
          }
          .txt2 {
            color: #333;
          }
        }

        .prompt {
          margin-bottom: .7rem;
          .icon {
            display: inline-block;
            width: .24rem;
            height: .24rem;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            background-image: url('./ts.png');
            margin-bottom: 0.2rem;
          }
          .txt {
            display: inline-block;
            width: 4.6rem;
            font-size: .22rem;
            color: #d53d3d;
            line-height: .26rem;
          }
        }

        .btn {
          button {
            width: 2.2rem;
            height: .7rem;
            border-radius: .1rem;
            color: #fff;
            line-height: .7rem;
            font-size: .28rem;
          }
          .no {
            background: #dedede;
            margin-right: .25rem;
          }
          .yes {
            background: #d53d3d;
          }
        }

      }
      .up-window{
        top: 4.1rem;
        height: 3.2rem;
        input{
          margin-top: 0.1rem;
          border: 0.01rem solid #ddd;
          width: 100%;
          padding: 0.12rem 0.2rem;
          border-radius: 0.04rem;
        }
      }
  }
  

}
</style>
