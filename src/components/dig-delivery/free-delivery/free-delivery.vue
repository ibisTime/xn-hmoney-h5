<template>
  <div class="free-delivery">
    <div class="deli_con">
      <div class="c_h_select">
        <select>
          <option value="0">请选择资产交通证</option>
          <option value="1">haha</option>
        </select>
      </div>
      <div class="c_h_con">
        <div class="c_h_con_h">
          <div class="c_h_con_h_left">
            可交割余额：<span class="c_h_con_h_left_sp">12312</span>
          </div>
          <div class="c_h_con_h_right">
            了解更多
          </div>
        </div>
        <p class="c_h_con_c">
          到期交割时间：2019-10-10 00:00:00
        </p>
        <p>支持用户提前自由交割</p>
      </div>
    </div>
    <p class="line" />
    <div class="deli_foo">
      <h5 class="deli_h5">商品选择</h5>
      <router-link to="delivery-image" class="deli_iup_img">
        <img src="./update.png" alt="">
      </router-link>
      <div class="foo_box">
        <h5 class="foo_box_h5">
          交割流程：(待替换)
        </h5>
        <p>
          1，用户填写交割数量，提交交割申请
        </p>
        <p>
          2，交割单位确认转交物权
        </p>
        <p>
          3，智能合约自动销毁对应数量资产通证
        </p>
      </div>
      <div class="foo_btn" @click="toDelivery">
        确认交割
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toDelivery() {
        this.$router.push('delivery-confirm');
      }
    }
  }
</script>

<style scoped lang="scss">
  .deli_con{
    padding: 0 0.3rem;
    .c_h_select{
      display: flex;
      padding: 0.3rem 0;
      border-bottom: 1px solid #EBEBEB;
      margin-bottom: 0.3rem;
      select{
        width: 100%;
      }
    }
    .c_h_con{
      padding-bottom: 0.34rem;
      font-size: 0.24rem;
      color: #999999;
      .c_h_con_h{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .c_h_con_h_left_sp{
          color: #333;
        }
        .c_h_con_h_right{
          color: #517FFF;
        }
      }
      .c_h_con_c{
        margin-bottom: 0.3rem;
      }
    }
  }
  .line{
    background-color: #F5F5F5;
    height: 0.2rem;
  }
  .deli_foo{
    padding: 0.28rem 0.3rem 0.98rem;
    .deli_h5{
      color: #333333;
      font-size: 0.24rem;
      margin-bottom: 0.22rem;
    }
    .deli_iup_img{
      margin-bottom: 0.3rem;
      img{
        width: 2rem;
        height: 1.5rem;
      }
    }
    .foo_box{
      border-top: 1px solid #EBEBEB;
      padding-top: 0.3rem;
      font-size: 0.24rem;
      color: #999999;
      margin-bottom: 1.6rem;
      .foo_box_h5{
        margin-bottom: 0.14rem;
      }
      p{
        line-height: 0.36rem;
      }
    }
    .foo_btn{
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
      background-color: #D53D3D;
      border-radius: 0.1rem;
    }
  }
</style>
