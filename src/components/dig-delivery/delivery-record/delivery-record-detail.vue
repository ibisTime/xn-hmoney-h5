<template>
  <div class="delivery-detail">
    <div class="header">
      <div class="h_left">
        <p :style="{backgroundImage: `url('${deliveryRecordMsg.symbolIcon}')`}"></p>
        <div>{{deliveryRecordMsg.symbol}}</div>
      </div>
      <div class="h_m">
        <img src="./Fill 1@2x.png" alt="">
      </div>
      <div class="h_right">
        <p :style="deliveryRecordMsg.pic ? {backgroundImage: `url('${deliveryRecordMsg.pic}')`} : ''"></p>
        <div class="product_div">{{deliveryRecordMsg.productName ? deliveryRecordMsg.productName : 'xxx'}}</div>
      </div>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="li_single">
          <div class="li_left">交割状态</div>
          <div class="li_right">
            {{deliveryRecordMsg.status}}
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">交割份数</div>
          <div class="li_right">
            {{deliveryRecordMsg.quantity}}
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">交割方式</div>
          <div class="li_right">
            {{deliveryRecordMsg.pickWayName}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryRecordMsg.pickWay === '2'">
          <div class="li_left">自提密码</div>
          <div class="li_right">
            {{deliveryRecordMsg.pickPassword}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryRecordMsg.pickWay === '1'">
          <div class="li_left">提货人</div>
          <div class="li_right">
            {{deliveryRecordMsg.pickName}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryRecordMsg.pickWay === '1'">
          <div class="li_left">提货电话</div>
          <div class="li_right">
            {{deliveryRecordMsg.pickMobile}}
          </div>
        </li>
        <li class="li_single" v-if="deliveryRecordMsg.pickWay === '1'">
          <div class="li_left">邮寄地址</div>
          <div class="li_right">
            {{deliveryRecordMsg.pickAddress}}
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">申请时间</div>
          <div class="li_right">
            {{deliveryRecordMsg.applyDatetime}}
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">交割时间</div>
          <div class="li_right">
            {{deliveryRecordMsg.deliveryDatetime}}
          </div>
        </li>
      </ul>
    </div>
    <FullLoading :title="''" v-show="isLoading"/>
  </div>
</template>

<script>
  import { setTitle, formatAmount, formatDate } from "common/js/util";
  import {deliveryRecordDetail} from 'api/homeDig';
  import {getDictList} from 'api/general';
  import FullLoading from 'base/full-loading/full-loading';
  export default {
    data() {
      return {
        isLoading: true,
        deliveryRecordMsg: {},
        wayObj: {},
        statusObj: {}
      }
    },
    created() {
      setTitle('交割记录详情');
      const code = this.$route.query.code;
      Promise.all([
        getDictList('delivery_pick_way'),
        getDictList('delivery_record_status')
      ]).then(([typeData, statusData]) => {
          typeData.forEach(item => {
            this.wayObj[item.dkey] = item.dvalue;
          });
          statusData.forEach(item => {
            this.statusObj[item.dkey] = item.dvalue;
          });
        deliveryRecordDetail(code).then(data => {
            data.applyDatetime = formatDate(data.applyDatetime, 'yyyy-MM-dd hh:mm:ss');
            data.deliveryDatetime = data.deliveryDatetime ? formatDate(data.deliveryDatetime, 'yyyy-MM-dd hh:mm:ss') : '-';
            data.pic = PIC_PREFIX + data.pic;
            data.symbolIcon = PIC_PREFIX + data.symbolIcon;
            data.pickWayName = this.wayObj[data.pickWay];
            data.status = this.statusObj[data.status];
            this.deliveryRecordMsg = data;
            this.isLoading = false;
        }).catch(() => {
            this.isLoading = false;
        });
      }).catch(() => {
        this.isLoading = false;
      });
    },
    components: {
        FullLoading
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
      padding-bottom: 1rem;
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
      position: absolute;
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
