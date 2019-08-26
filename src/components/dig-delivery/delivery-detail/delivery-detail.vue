<template>
  <div class="delivery-detail">
    <div class="header">
      <div class="h_left">
        <img src="" alt="">
        <p>TWT</p>
      </div>
      <div class="h_m">
        <img src="" alt="">
      </div>
      <div class="h_right">
        <img src="" alt="">
        <p>WIS</p>
      </div>
    </div>
    <div class="pur_con">
      <ul class="con_ul">
        <li class="li_single">
          <div class="li_left">交割单位</div>
          <div class="li_right">
            <select>
              <option value="0">请选择</option>
              <option value="1">adsa</option>
              <option value="2">qwe</option>
            </select>
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">商品选择</div>
          <div class="li_right">
            <select>
              <option value="0">请选择</option>
              <option value="1">adsa</option>
              <option value="2">qwe</option>
            </select>
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">交割方式</div>
          <div class="li_right">
            <select>
              <option value="0">请选择</option>
              <option value="1">adsa</option>
              <option value="2">qwe</option>
            </select>
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">自提密码</div>
          <div class="li_right">
            <input type="text" placeholder="请输入自提密码">
          </div>
        </li>
        <li class="li_single">
          <div class="li_left">邮寄地址</div>
          <div class="li_right">
            <input type="text" placeholder="请输入邮寄地址">
          </div>
        </li>
      </ul>
      <div class="pur_introduce">
        <h5 class="int_head">交割规则(待替换)</h5>
        <p class="int_p">
          无论是做内容营销还是产品市场,内容体系的完整性非常重要。而内容体系里面,文字性的内容,产品相关的内容,都是主力。
        </p>
      </div>
    </div>
    <div class="pur_foo_btn" @click="isShowModal = true;">
      <p>申购</p>
    </div>
    <div class="pur_modal" v-show="isShowModal" @click="isShowModal = false">
      <div class="modal_box" @click.stop>
        <div class="del" @click="isShowModal = false">
          <img src="./del.png" alt="">
        </div>
        <ul class="modal_ul">
          <li class="modal_li_single">申购通证 <span class="modal_li_single_sp">WIS币</span></li>
          <li class="modal_li_single">申购单价 <span class="modal_li_single_sp">1 TWT=1000 WIS</span></li>
          <li class="modal_li_single_num">
            <p>请输入申购数量</p>
            <p class="modal_li_single_num_p"><input type="text" class="modal_li_single_num_iup"></p>
          </li>
        </ul>
        <p class="modal_p">
          <span>0 TWT</span>
          <span>TWT余额：8960.0000</span>
        </p>
        <div class="foo_btn" @click="comfirmPayment">
          确认付款
        </div>
      </div>
    </div>
    <div class="modal_success" v-if="isSuccessModal" @click="isSuccessModal = false">
      <div class="success_modal_box" @click.stop>
        <div class="suc_m_header">
          <img class="s_m_h_img" src="./success_icon.png" alt="">
          <p class="s_m_h_p">转账成功</p>
        </div>
        <div class="con_btn"><span>查看转账记录</span></div>
        <p class="tip">
          {{timer}}秒后自动跳转
        </p>
      </div>
    </div>
    <PawModal :isShow="isShowPawModal" @getPawList="getPawList" @removePaw="removePaw"/>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  import PawModal from 'base/pwd-modal/index';
  export default {
    data() {
      return {
        isShowModal: false,
        isShowPawModal: false,
        isSuccessModal: false,
        timer: 5
      }
    },
    created() {
      setTitle('交割详情');
    },
    methods: {
      comfirmPayment() {
        this.isShowPawModal = true;
        this.isShowModal = false;
      },
      getPawList(list) {
        this.isShowPawModal = false;
        console.log(list);
      },
      removePaw() {
        this.isShowPawModal = false;
      }
    },
    components: {
      PawModal
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
      .h_left{
        flex: 2;
        img{
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
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
        img{
          width: 0.78rem;
          height: 0.78rem;
          margin-bottom: 0.2rem;
        }
      }
    }
    .pur_con{
      padding-bottom: 1rem;
      .con_ul{
        .li_single{
          padding: 0.3rem 0;
          display: flex;
          border-bottom: 1px solid #E6E6E6;
          .li_left{
            font-size: 0.28rem;
            color: #999;
            width: 20%;
          }
          .li_right{
            font-size: 0.26rem;
            color: #333333;
            select, input{
              width: 100%;
            }
          }
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
  .modal_success{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    .success_modal_box{
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 0.1rem;
      padding: 0.6rem 0;
      text-align: center;
    }
    .suc_m_header{
      margin-bottom: 0.36rem;
      .s_m_h_img{
        width: 1.2rem;
        height: 1.2rem;
        margin-bottom: 0.26rem;
      }
      .s_m_h_p{
        color: #333;
        font-size: 0.4rem;
      }
    }
    .con_btn{
      color: #999999;
      margin-bottom: 0.64rem;
      font-size: 0.66rem;
      span{
        font-size: 0.28rem;
        padding: 0.14rem 0.32rem;
        border: 1px solid #aaa;
        border-radius: 0.06rem;
      }
    }
    .tip{
      color: #999;
      font-size: 0.22rem;
    }
  }
</style>
