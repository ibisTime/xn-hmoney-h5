<template>
  <div class="order-detail-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        订单详情
        </p>
    </header> -->
    <div class='order'>
        <p>
            <span class='num'><i class='icon'></i>{{$t('myOrderDetail.subject.ddbh')}}{{orderDetailData.code.substring(orderDetailData.code.length-8)}}</span>
            <span class='state'>{{statusValueList[orderDetailData.status]}}</span>
        </p>
    </div>
    <div class='trading'>
        <p class='money'><span>{{$t('myOrderDetail.subject.jyje')}}</span><span>{{orderDetailData.tradeAmount ? orderDetailData.tradeAmount : '-'}} {{orderDetailData.tradeCurrency}}</span></p>
        <p class='number'><span>{{$t('myOrderDetail.subject.jysl')}}</span><span>{{countString ? countString : '0'}} {{orderDetailData.tradeCoin}}</span></p>
        <p class='price'><span>{{$t('myOrderDetail.subject.jyjg')}}</span><span>{{orderDetailData.tradePrice ? orderDetailData.tradePrice : '-'}} {{orderDetailData.tradeCurrency}}</span></p>
        <p class='paytype'><span>{{$t('buyPublish.subject.fkfs')}}</span><span>{{payTypeList[orderDetailData.payType]}}</span></p>
    </div>
    <div class='message'>
        <div class='mess'>
            <p class='text1'>
              <span>{{$t('myOrderDetail.subject.mj')}} {{buyNick}}</span>
              <span class='seller m-r'>{{$t('myOrderDetail.subject.maij')}}： {{sellNick}}</span>
            </p>
            <p class="titly">{{$t('orderDetail.subject.ggly')}}：</p>
            <p class='text2'>{{orderDetailData.leaveMessage}}</p>
        </div>
        <div class='appraise'>
          <p class='txt1'>
            {{$t('myOrderDetail.subject.pj')}}
            <span class="fr" :class="ishpTxt == $t('common.hp') ? 'hptxt' : 'cptxt'">
              <i class="icon pjback" :style="pjback"></i>{{ishpTxt}}
            </span>
            </p>
          <p class='txt2'>{{pjComment ? pjComment : ''}}</p>
        </div>
    </div>
    <div class='window'>
        <p v-html="yjTitle"></p>
        <p v-html="btns" @click="operationBtn">
        </p>
    </div>

    <div class="zc-box" v-show="zcShow">
      <div class='up-window'>
        <h3>{{$t('myOrderDetail.subject.zcly')}}</h3>
        <div class='text'>
          <textarea type="text" :placeholder="$t('myOrderDetail.subject.sqly')" v-model="reason"></textarea>
        </div>
        <div class='btn'>
          <button class='no' @click='qxReason'>{{$t('common.qx')}}</button>
          <button class='yes' @click="qrReason">{{$t('common.qr')}}</button>
        </div>
      </div>
    </div>
    <div class="zc-box" v-show="showFlag">
      <div class='up-window'>
        <h3>{{$t('myOrderDetail.subject.jypj')}}</h3>
        <p>{{$t('myOrderDetail.subject.yhyx')}}</p>
        <div class='pj-text'>
          <div class="item on">
              <div class="icon icon-good" @click="pjClick('2')">
                <img src="./hph.png" alt="" :class="{'hidden': userHp}">
                <img src="./hp.png" alt="" :class="{'hidden': !userHp}">
              </div>
              <p>{{$t('common.hp')}}</p>
          </div>
          <div class="item ml20">
              <div class="icon icon-bad" @click="pjClick('0')">
                <img src="./cph.png" alt="" :class="{'hidden': userCp}">
                <img src="./cp.png" alt="" :class="{'hidden': !userCp}">
              </div>
              <p>{{$t('common.cp')}}</p>
          </div>
        </div>
        <div class="pj-content">
              <textarea name="" id="" :placeholder="$t('myOrderDetail.subject.klpj')" v-model="content"></textarea>
          </div>
        <div class='btn'>
          <button class='no' @click='qxUserPj'>{{$t('common.qx')}}</button>
          <button class='yes' @click="qrUserPj">{{$t('common.qr')}}</button>
        </div>
      </div>
    </div>
    <Toast :text="textMsg" ref="toast" />
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>
<script>
  import { getUrlParam, formatAmount, formatDate, getUserId, setTitle, getLangType } from 'common/js/util';
  import { getOrderDetail, releaseOrder, payOrder, cancelOrder, arbitrationlOrder, commentOrder } from 'api/person';
  import { getDictList } from "api/general";
  import Toast from 'base/toast/toast';
  import FullLoading from 'base/full-loading/full-loading';

  export default {
  data() {
    return {
      textMsg: '',
      yjTitle: '',
      orderDetailData: {
        buyUserInfo: {
          nickname: ''
        },
        sellUserInfo: {
          nickname: ''
        },
        code: ''
      },
      statusValueList: {},
      payTypeList: {},
      pjList: {
        '2': this.$t('common.hp'),
        '0': this.$t('common.cp')
      },
      ishpTxt: '',
      btns: '',
      index: 0,
      show: true,
      code: '',
      countString: '',
      reason: '',
      zcShow: false,
      showFlag: false,
      userHp: false,
      userCp: false,
      isLoading: true,
      comment: '',
      content: '',
      buyNick: '',
      sellNick: '',
      pjComment: '',
      pjback: ''
    };
  },
  created() {
    this.code = this.$route.query.code;
    getDictList('pay_type').then(data => {
      data.forEach((item) => {
          this.payTypeList[item.dkey] = item.dvalue;
      });
    }, () => {
      this.isLoading = false;
    });
    getDictList('trade_order_status').then(data => {
        data.forEach((item) => {
            this.statusValueList[item.dkey] = item.dvalue
        });
        this.orderMessage();
    }, () => {
      this.isLoading = false;
    })
  },
  mounted() {
      setTitle(this.$t('myOrderDetail.subject.ddxq'));
  },
  methods: {
    // 评价
    pjClick(value){
      if(value == '0'){ // 差评
        this.userHp = false;
        this.userCp = !this.userCp;
      }
      if(value == '2'){ // 好评
        this.userCp = false;
        this.userHp = !this.userHp;
      }
      this.comment = value;
    },
    qxUserPj(){
      this.showFlag = false;
    },
    qrUserPj(){
      if(this.comment == ''){
        this.textMsg = this.$t('myOrderDetail.subject.qdp');
        this.$refs.toast.show();
        return;
      }
      this.isLoading = true;
      this.showFlag = true;
      commentOrder(this.code, this.comment, this.content).then(data => {
        if(data.filterFlag == '2'){
          this.textMsg = this.$t('myOrderDetail.subject.pjsh');
        }else{
          this.textMsg = this.$t('myOrderDetail.subject.pjcg');
        }
        this.$refs.toast.show();
        sessionStorage.setItem('ordering', 'ended');
        setTimeout(() => {
          this.$router.push('my-order');
        }, 1200);
      }, () => {
        this.isLoading = false;
        this.orderMessage();
      })
    },
    orderMessage(){
      getOrderDetail(this.code).then(data => {
        this.zcShow = false;
        if(data.tradeAmount && data.tradePrice){
          data.tradeAmount = (Math.floor(data.tradeAmount * 100) / 100).toFixed(2);
          data.tradePrice = (Math.floor(data.tradePrice * 100) / 100).toFixed(2);
        }
        this.buyNick = data.buyUserInfo.nickname;
        this.sellNick = data.sellUserInfo.nickname;
        this.orderDetailData = data;
        this.countString = formatAmount(data.countString, '', data.tradeCoin);
        if(data.invalidDatetime){
          this.yjTitle = `${this.$t('myOrderDetail.subject.ddbcd')}<i>${formatDate(data.invalidDatetime, "hh:mm:ss")}</i>，${this.$t('myOrderDetail.subject.zdqx')}`;
        }else{
          this.yjTitle = '';
        }
        // 当前用户为买家
        if (data.buyUser == getUserId()) {
          if(data.sbComment){
            this.pjback = data.sbComment == 2 ? 'background-image:url("/static/hp.png")' : 'background-image:url("/static/cph.png")';
          }
          this.pjComment = data.sbCommentContent;
          this.ishpTxt = data.sbComment ? this.pjList[data.sbComment] : '';
          if(data.status == 0){
            this.btns = `<button class="o-btn payBtn">
                          ${this.$t('myOrderDetail.subject.bjfk')}
                        </button>
                        <button class="o-btn qx-btn cancelBtn">
                          ${this.$t('myOrderDetail.subject.qxjy')}
                        </button>`;
          }else if(data.status == "2"){
            if (!data.bsComment) {
              this.btns = `<button class="o-btn pjBtn">${this.$t('myOrderDetail.subject.jypj')}</button>`
            }
          }
          if (data.status == "1") {
            this.btns = `<button class="o-btn qx-btn sqBtn">${this.$t('myOrderDetail.subject.sqzc')}</button>`
          }
        }else{  // 当前用户为卖家
        if(data.bsComment){
          this.pjback = data.bsComment == 2 ? 'background-image:url("/static/hp.png")' : 'background-image:url("/static/cph.png")';
        }
        this.pjComment = data.bsCommentContent;
        this.ishpTxt = data.bsComment ? this.pjList[data.bsComment] : '';
          //待支付
          if (data.status == "1") {
              this.btns = `<button class="o-btn releaseBtn">${this.$t('myOrderDetail.subject.sfhb')}</button>
                          <button class="o-btn qx-btn sqBtn">${this.$t('myOrderDetail.subject.sqzc')}</button>`;
          } else if (data.status == "2") {
              if (!data.sbComment) {
                this.btns = `<button class="o-btn pjBtn">${this.$t('myOrderDetail.subject.jypj')}</button>`
              }
          }
        }

        if(data.status == '-1'){
          this.btns = `<button class="o-btn qx-btn cancelBtn">
                          ${this.$t('myOrderDetail.subject.qxjy')}
                        </button>`;
          if(data.type == 'buy'){
                if(data.buyUser == getUserId()){
                    this.btns += `<button class="o-btn qx-btn buyBtn" data-ocode="${data.adsCode}" data-user="${data.sellUser}">
                              ${this.$t('wallet.subject.cz')}
                            </button>`;
                }
            }
          if(data.type == 'sell'){
              if(data.sellUser == getUserId()){
                  this.btns += `<button class="o-btn qx-btn sellBtn" data-ocode="${data.adsCode}" data-user="${data.buyUser}">
                              ${this.$t('wallet.subject.tx')}
                            </button>`;
              }
          }
        }

        // 系统自动取消
        if( data.status == '4' || data.status == '5' || data.status == '3'){
          if(getLangType() === 'en') {
            this.yjTitle = this.statusValueList[data.status];
          } else {
            this.yjTitle = data.remark;
          }

          this.btns = '';
        }
        this.btns += `<button class="o-btn qx-btn chatBtn">
                          ${this.$t('otcBuy.subject.xldf')}
                        </button>`;
        this.isLoading = false;
      });
    },
    operationBtn(){
      let target = event.target;
      let toast = this.$refs.toast;
      if(target.localName === 'button'){
        this.isLoading = true;
        // 去购买 buyBtn
        if(target.classList.contains('buyBtn')){
          let code = target.dataset.ocode;
          let user = target.dataset.user;
          this.$router.push(`otc-buy?userId=${user}&adsCode=${code}&type=1`);
        }
        // 去出售 sellBtn
        if(target.classList.contains('sellBtn')){
          let code = target.dataset.ocode;
          let user = target.dataset.user;
          this.$router.push(`otc-buy?userId=${user}&adsCode=${code}&type=0`);
        }
        // 标记付款 payOrder
        if(target.classList.contains('payBtn')){
          payOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }
        // 取消订单 cancelOrder
        if(target.classList.contains('cancelBtn')){
          cancelOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }
        // 申请仲裁 arbitrationlOrder
        if(target.classList.contains('sqBtn')){
          this.isLoading = false;
          this.zcShow = true;
        }
        // 释放货币 releaseOrder
        if(target.classList.contains('releaseBtn')){
          releaseOrder(this.code).then(data => {
            this.orderMessage();
          }, () => {
            this.isLoading = false;
          });
        }

        // 评价
        if(target.classList.contains('pjBtn')){
          this.showFlag = true;
          this.isLoading = false;
        }
        // 联系对方
        if(target.classList.contains('chatBtn')){
          this.goChat(this.code);
        }
      }
    },
    // 联系对方
    goChat(orderCode) {
      this.$router.push(`/messageCart?code=${orderCode}`);
    },
    qxReason(){
      this.zcShow = false;
    },
    qrReason(){
      if(this.reason == ''){
        this.textMsg = this.$t('myOrderDetail.subject.sqlybk');
        this.$refs.toast.show();
        return;
      }
      let config = {
        code: this.code,
        reason: this.reason
      };
      this.isLoading = true;
      arbitrationlOrder(config).then(data => {
        this.textMsg = this.$t('myOrderDetail.subject.fqcg');
        this.$refs.toast.show();
        this.orderMessage();
      }, () => {
        this.isLoading = false;
      });
    },
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

.order-detail-wrapper {
  font-size: 0.28rem;
  color: #333;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    border-bottom: 0.01rem solid #e5e5e5;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      float: left;
      margin-top: 0.31rem;
    }
  }

  .order {
    width: 100%;
    padding: 0.15rem 0.3rem;
    background: #fff;
    line-height: 1rem;
    p {
      border-bottom: 0.01rem solid #e5e5e5;
      .icon {
        width: 0.23rem;
        height: 0.26rem;
        background-image: url('./ddbh.png');
        margin-right: 0.12rem;
      }
      .state {
        float: right;
        font-size: 0.32rem;
        color: #d53d3d;
      }
      .num{
        display: inline-block;
        max-width: 4rem;
        line-height: 0.4rem;
      }
    }
  }

  .trading {
    background: #fff;
    width: 100%;
    padding: 0.3rem 0.3rem;
    margin-bottom: 0.2rem;

    p {
      display: flex;
      justify-content: space-between;
    }
    .number,
    .price,
    .paytype {
      font-size: 0.28rem;
      color: #999;
    }
    .number {
      margin: 0.34rem 0;
    }
    .paytype{
      margin-top: 0.34rem;
    }
  }

  .message {
    width: 100%;
    padding: 0.32rem 0.3rem 0;
    background: #fff;
    .mess {
      padding-bottom: 0.3rem;
      border-bottom: 0.01rem solid #e6e6e6;
      .text1 {
        margin-bottom: 0.3rem;
        .pay {
          display: inline-block;
          background: #0ec55b;
          font-size: 0.2rem;
          line-height: 0.28rem;
          color: #fff;
          text-align: center;
          margin-left: 0.12rem;
          border-radius: 0.03rem;
        }
        .seller {
          float: right;
        }
        .m-r{
          margin-right: 0.2rem;
        }
      }
      .text2 {
        padding: 0.1rem;
        padding-top: 0.2rem;
        padding-bottom: 0;
        font-size: 0.26rem;
        color: #999;
        line-height: 0.34rem;
      }
    }
    .appraise {
      padding: .3rem 0 .28rem;
      border-bottom: .01rem solid #e6e6e6;
      .txt1 {
        margin-bottom: .28rem;
      }
      .txt2 {
        color: #999;
      }
      .hptxt{
        color: #d53d3d;
      }
      .cptxt{
        color: #666;
      }
      .pjback{
        display: inline-block;
        width: 0.3rem;
        height: 0.4rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
    }
  }

  .window {
    width: 100%;
    background: #fff;
    text-align: center;
    p {
      font-size: 0.24rem;
      color: #999;
      padding: 0.3rem 0 0.34rem;
    }
  }

  .chat {
    width: 100%;
    padding: 0 .3rem;
    height: 4rem;
    margin-bottom: 0.98rem;
    overflow: hidden;
    .chat-inner {
      width: 102%;
      height: 4rem;
      overflow-y: auto;
      .content {
        height: 100%;
      }
    }
  }

  .chat-input {
    width: 100%;
    height: 0.98rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    p {
      width: 100%;
      margin: 0.14rem 0.3rem;
      input {
        width: 5.4rem;
        line-height: 0.7rem;
        border: 0.01rem solid #e5e5e5;
        border-radius: 0.05rem;
        text-indent: 0.22rem;
      }
      input[attr="placeholder"] {
        font-size: 0.32rem;
        color: #999;
      }

      .ico1,
      .ico2 {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.28rem;
      }

      .ico1 {
        background-image: url('./bq1.png');
        right: 1rem;
      }
      .ico2 {
        background-image: url('./tj2.png');
        right: 0.3rem;
      }
    }
  }

  .prompt {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    top: 0;

    .appraise {
      width: 6.14rem;
      height: 6.4rem;
      background: #fff;
      border-radius: .2rem;
      position: absolute;
      left: 50%;
      top: 3rem;
      transform: translateX(-50%);
      text-align: center;
      padding: .54rem .57rem 0;

      .text1 {
        font-size: .32rem;
        font-weight: bold;
        margin-bottom: .4rem;
      }

      .text2 {
        margin-bottom: .62rem;
      }

      textarea {
        width: 5rem;
        height: 1.3rem;
        font-size: 0.32rem;
        border-radius: .1rem;
        border: .01rem solid #dedede;
        text-align: left;
        color: #999;
        padding: .26rem 0 0 .2rem;
        margin-bottom: .52rem;
      }

      .btn {
        font-size: .32rem;
        color: #d53d3d;
      }

    }

  }

  .zc-box{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 110%;
    background-color: rgba(0,0,0,.5);
  }
  .up-window{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.14rem;
    // height: 6.5rem;
    background: #fff;
    border-radius: .2rem;
    padding: .4rem .6rem .34rem;
    p{
      margin-top: 0.3rem;
      text-align: center;
    }
    .ico,h3 {
      text-align: center;
      font-size: .32rem;
      color: #333;
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
    .text{
      margin-top: .4rem;
      margin-bottom: .3rem;
    }
    textarea{
      width: 100%;
      height: 1.3rem;
      border: 1px solid #ddd;
      border-radius: 0.06rem;
      padding: .12rem 0.18rem;
    }
    .pj-text{
      display: flex;
      margin-top: .2rem;
      margin-bottom: .2rem;
      justify-content: space-between;
      >div{
        width: 40%;
        height: 2rem;
        text-align: center;
        padding-top: 0.2rem;
        box-sizing: border-box;
        img{
          width: 100%;
        }
        .icon{
          width: 1rem;
          height: 1rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .pj-content{
      margin-bottom: 0.4rem;
    }
  }
  .fr{
    float: right;
  }
}

</style>
