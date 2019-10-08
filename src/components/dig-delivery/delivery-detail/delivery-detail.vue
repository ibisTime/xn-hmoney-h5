<template>
  <div class="delivery-detail">
    <div class="header">
      <div class="h_left">
        <p :style="{backgroundImage: `url('${deliveryMsg.symbolIcon}')`}"></p>
        <div>{{deliveryMsg.symbol}}</div>
      </div>
      <div class="h_m">
        <img src="./Fill 1@2x.png" alt="">
      </div>
      <div class="h_right">
        <p :style="dueToProductMsg.productPic ? {backgroundImage: `url('${dueToProductMsg.productPic}')`} : {backgroundImage: `url('${this.mrPic}')`}"></p>
        <div class="product_div">{{dueToProductMsg.productName ? dueToProductMsg.productName : '???'}}</div>
      </div>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="li_single">
          <div class="li_left">交割单位</div>
          <div class="li_right" @click="toDeliveryUnit">
            {{deliveryMsg.mainUnit}}
            <i class="right_icon"></i>
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">商品选择</div>
          <div class="li_right" @click="toDeliveryImg">
            {{dueToProductMsg.productName ? dueToProductMsg.productName : '请选择商品'}}
            <i class="right_icon"></i>
          </div>
        </li>
        <li class="li_single" v-if="pickWayList.length">
          <div class="li_left">交割方式</div>
          <div class="li_right">
            <select v-model="deliveryConfig.pickWay" @change="selectedPickWay">
              <option value="" disabled>请选择交割方式</option>
              <option :value="item.key" v-for="(item, index) in pickWayList" :key="`pick_${index}`">{{item.value}}</option>
            </select>
          </div>
        </li>
        <li class="li_single" v-if="!pickWayList.length">
          <div class="li_left">交割方式</div>
          <div class="li_right">
            {{deliveryConfig.pickWay === '1' ? '邮寄' : '自提'}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryConfig.pickWay === '1'">
          <div class="li_left">邮寄地址</div>
          <div class="li_right" @click="toSelectedAddress">
            {{deliveryConfig.addressCode ? `${addRessMsg.province}-${addRessMsg.city}-${addRessMsg.district}-${addRessMsg.detailAddress}` : '请选择邮寄地址'}}
            <i class="right_icon"></i>
          </div>
        </li>
        <li class="li_single" v-if="deliveryConfig.addressCode && deliveryConfig.pickWay === '1'">
          <div class="li_left">收货人</div>
          <div class="li_right">
            {{addRessMsg.addressee}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryConfig.addressCode && deliveryConfig.pickWay === '1'">
          <div class="li_left">收货人电话</div>
          <div class="li_right">
            {{addRessMsg.mobile}}
          </div>
        </li>
      </ul>
      <div class="pur_introduce">
        <h5 class="int_head">交割规则</h5>
        <div class="int_p" v-html="deliveryRuleNote"></div>
      </div>
    </div>
    <div class="pur_foo_btn" @click="comfirmPayment" v-if="deliveryStatus === '1'">
      <p>确认交割</p>
    </div>
    <Toast :text="toastMsg" ref="toast"/>
  </div>
</template>

<script>
  import { setTitle, formatAmount } from "common/js/util";
  import {deliveryDetail} from 'api/homeDig';
  import {getAddressList} from 'api/user';
  import { getSysConfig } from "api/general";
  import {getBbListData} from 'api/tradingOn';
  import {wallet} from 'api/person';
  import Toast from 'base/toast/toast';
  export default {
    data() {
      return {
        timer: 5,
        deliveryMsg: {},
        dueToProductMsg: {
          productName: '',
          productPic: ''
        },
        pickWayList: [],
        deliveryConfig: {
          coinDeliveryCode: '',
          symbol: '',
          realRightCode: '',
          quantity: '',
          pickWay: '',
          addressCode: '',
          tradePwd: ''
        },
        toastMsg: '',
        addRessMsg: {
          mobile: '',
          addressee: ''
        },
        isMail: false,
        code: '',
        avaAmount: '',
        deliveryStatus: '',
        cvalue: '',
        mrPic: require('./mr_pic.png'),
        deliveryUnitIntroduce: '',
        deliveryRuleNote: ''
      }
    },
    created() {
      setTitle('交割详情');
      this.code = this.$route.query.code;
      const dueToProductMsg = sessionStorage.getItem('dueToProductMsg');
      this.isMail = sessionStorage.getItem('isMail');
      let setRess = sessionStorage.getItem('setRess');
      if(this.code) {
        this.deliveryConfig.coinDeliveryCode = this.code;
        deliveryDetail(this.code).then(data => {
          data.symbolIcon = PIC_PREFIX + data.symbolIcon;
          this.deliveryMsg = data;
          this.deliveryConfig.symbol = data.symbol;
          this.deliveryStatus = data.deliveryStatus;
          getBbListData().then(data => {
            data.forEach(item => {
                if(item.symbol === this.deliveryConfig.symbol) {
                    this.deliveryUnitIntroduce = item.deliveryUnitIntroduce || '';
                    this.deliveryRuleNote = item.deliveryRuleNote;
                    this.deliveryMsg.mainUnit = item.deliveryUnit;
                }
            });
        });
          if(data.pickWay === '3') {
            this.pickWayList = [{
              key: '1',
              value: '邮寄'
            }, {
              key: '2',
              value: '自提'
            }]
          }else {
            this.deliveryConfig.pickWay = data.pickWay;
          }
          wallet(data.symbol).then(res => {
            const amount = res.accountList[0].amount - res.accountList[0].frozenAmount;
            this.avaAmount = (amount && amount > 0) ? formatAmount(amount, '', data.symbol) : '0';
          });
        });
      }
      if(dueToProductMsg) {
        this.dueToProductMsg = JSON.parse(dueToProductMsg);
        this.deliveryConfig.realRightCode = this.dueToProductMsg.productCode;
      }
      if(this.isMail && setRess) {
        this.deliveryConfig.pickWay = '1';
        setRess = JSON.parse(setRess);
        this.addRessMsg = setRess;
        this.deliveryConfig.addressCode = setRess.code;
      }
      sessionStorage.removeItem('storetype');
      sessionStorage.removeItem('isokIndex');
    },
    methods: {
      comfirmPayment() {
        if(!this.deliveryConfig.realRightCode) {
          this.toastMsg = '请选择商品';
          this.$refs.toast.show();
          return;
        }
        if(!this.deliveryConfig.pickWay) {
          this.toastMsg = '请选择交割方式';
          this.$refs.toast.show();
          return;
        }
        if(this.deliveryConfig.pickWay === '1' && !this.deliveryConfig.addressCode) {
          this.toastMsg = '请选择邮寄地址';
          this.$refs.toast.show();
          return;
        }
        sessionStorage.setItem('dueToSymbol', this.deliveryConfig.symbol);
        sessionStorage.setItem('dueToProductMsg', JSON.stringify(this.dueToProductMsg));
        sessionStorage.setItem('deliveryConfig', JSON.stringify(this.deliveryConfig));
        this.$router.push(`/delivery-confirm?avaAmount=${this.avaAmount}&type=dueTo`);
      },
      toDeliveryImg() {
        this.$router.push(`delivery-image?symbol=${this.deliveryMsg.symbol}&type=dueTo`);
      },
      toDeliveryUnit() {
        sessionStorage.setItem('deliveryUnitIntroduce', this.deliveryUnitIntroduce);
        this.$router.push(`delivery-unit`);
      },
      selectedPickWay() {
        if(this.deliveryConfig.pickWay === '1') {
          this.getAddressList();
        }
      },
      getAddressList() {
        getAddressList('1').then(data => {
          if(data[0]) {
            this.addRessMsg = data[0];
            this.deliveryConfig.addressCode = data[0].code;
          }
        });
      },
      toSelectedAddress() {
        sessionStorage.setItem('isMail', '1');
        sessionStorage.setItem('storetype', '1');
        sessionStorage.setItem('toBank', `delivery-detail?code=${this.code}`);
        this.$router.push('/mine-address');
      }
    },
    components: {
      Toast
    }
  }
</script>


<style lang="scss" scoped>
  .delivery-detail{
    background-color: #FAFAFA;
    height: 100%;
    position: relative;
    padding: 0.4rem 0.3rem;
    .header{
      background-color: #fff;
      font-size: 0.22rem;
      color: #333;
      padding: 0.22rem 0;
      display: flex;
      border-radius: 0.08rem;
      text-align: center;
      margin-bottom: 0.3rem;
      align-items: center;
      .h_left{
        flex: 2;
      }
      .h_m{
        flex: 1;
        img{
          width: 0.6rem;
          height: 0.32rem;
        }
      }
      .h_right{
        flex: 2;
        .product_div{
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 2.8rem;
        }
      }
      p{
        width: 0.78rem;
        height: 0.78rem;
        margin: 0 auto 0.2rem;
        background-size: 100% 100%;
        border-radius: 100%;
      }
    }
    .pur_con{
      padding-bottom: 2rem;
      .con_ul{
        .li_single{
          padding: 0.3rem 0;
          display: flex;
          border-bottom: 1px solid #E6E6E6;
          align-items: center;
          .li_left{
            font-size: 0.28rem;
            color: #999;
            width: 23%;
          }
          .li_right{
            flex: 1;
            font-size: 0.26rem;
            color: #333333;
            select, input{
              width: 100%;
              font-size: 0.26rem;
            }
            .right_icon{
              display: inline-block;
              width: 0.2rem;
              height: 0.2rem;
              background-image: url('./more.png');
              background-size: 100% 100%;
              float: right;
            }
          }
        }
        .li_sigin_pic {
          align-items: flex-start;
        }
      }
      .pur_introduce{
        margin-top: 0.3rem;
        .int_head{
          color: #333333;
          font-size: 0.3rem;
          margin-bottom: 0.2rem;
        }
        .int_p{
          font-size: 0.28rem;
          color: #999;
          line-height: 0.4rem;
        }
      }
    }
    .pur_foo_btn{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1.8rem;
      background-color: #fff;
      font-size: 0.32rem;
      color: #fff;
      box-shadow: 0 -0.04rem 0.08rem 0 #E6E6E6;
      padding: 0.4rem 0.3rem;
      p{
        border-radius: 0.08rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: #D53D3D;
      }
    }
  }
  .pur_modal{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0,0,0,.5);
    .modal_box{
      position: absolute;
      left: 0.7rem;
      right: 0.7rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 0.1rem;
      padding: 0.3rem 0.4rem 0.8rem;
      .del{
        position: absolute;
        right: 0.22rem;
        top: 0.22rem;
        font-size: 0;
        img{
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      .modal_ul{
        margin-bottom: 0.2rem;
        li{
          padding: 0.24rem 0;
          border-bottom: 1px solid #E6E6E6;
          color: #999999;
        }
        .modal_li_single{
          font-size: 0.28rem;
          .modal_li_single_sp{
            color: #333333;
            margin-right: 0.3rem;
            font-size: 0.28rem;
          }
        }
        .modal_li_single_num{
          padding: 0.2rem 0;
          font-size: 0.24rem;
          .modal_li_single_num_p{
            padding-top: 0.12rem;
            .modal_li_single_num_iup{
              color: #333;
              font-size: 0.32rem;
            }
          }
        }
      }
      .modal_p{
        font-size: 0.24rem;
        color: #999;
        margin-bottom: 0.64rem;
        display: flex;
        justify-content: space-between;
      }
      .foo_btn{
        height: 0.9rem;
        line-height: 0.9rem;
        color: #fff;
        background-color: #D53D3D;
        font-size: 0.28rem;
        text-align: center;
      }
    }
  }
</style>
