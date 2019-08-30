<template>
  <div class="dig_coin">
    <div class="dig_head">
      <div class="head_gg">
        公告：xxx玩家挖到xxx矿
      </div>
      <div class="wa_dig">
        <router-link to="dig-out_mine" class="left">
          <img class="img_jb" src="./image/wa_jb.png" alt="">
          <span>挖矿：0.0001</span>
        </router-link>
        <div class="right">
          玩法介绍
        </div>
      </div>
      <div class="wa_dig">
        <router-link class="left" to="calculate-record">
          <img class="img_sl" src="./image/wa_sl.png" alt="">
          <span>算力：0.0001</span>
        </router-link>
      </div>
      <div class="wa_con">
        <div class="jbi_box">
          <div
            v-for="(item, index) in jbiList"
            :style="{left: `${listX[index]}%`, top: `${listY[index]}%`}"
            :key="`jb_${index}`"
            class="jbi_single"
          >
            <img src="./image/jinbi_x.png" alt="">
            <p>0.001</p>
          </div>
        </div>
        <router-link class="suanli_box" to="get-calculate">
          <img src="./image/get_suanli.png" alt="">
          <p class="sli_p">获取算力</p>
        </router-link>
      </div>
    </div>
    <div class="dig_con">
      <div class="con_head">
        <span class="set_sp">算力排行榜</span>
        <span>代币排行榜</span>
      </div>
      <div class="con_tab">
        <div class="tab_th">
          <span>名次</span>
          <span>用户名</span>
          <span>算力</span>
        </div>
        <ul class="tab_tbody">
          <li>
            <span></span>
            <span>张三</span>
            <span>10000</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {setTitle} from 'common/js/util';
  export default {
    data() {
      return {
        jbiList: [1, 2, 3, 4, 5, 6],
        listX: [],
        listY: []
      }
    },
    created() {
      setTitle('挖矿');
      const len = this.jbiList.length;
      const listX = [], listY = [];
      for(let i = 0; i < len; i ++) {
        listX.push(generateRandom(listX, 100));
        listY.push(generateRandom(listY, 100));
      }
      this.listX = listX;
      this.listY = listY;
      function generateRandom(list, scope) {
        let num = Math.random() * scope;
        if(list.includes(num)) {
          return generateRandom(list, scope)
        }
        return +(num.toFixed(2));
      }
    }
  }
</script>

<style scoped lang="scss">
  .dig_coin{
    height: 100%;
    background-color: #fff;
    .dig_head{
      height: 8rem;
      background-image: url('./image/dig_bg.png');
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      .head_gg{
        background-color: #519AED;
        opacity: 0.6;
        color: #fff;
        font-size: 0.24rem;
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.3rem;
        margin-bottom: 0.34rem;
      }
      .wa_dig{
        display: flex;
        justify-content: space-between;
        padding-left: 0.3rem;
        margin-bottom: 0.38rem;
        align-items: center;
        .left{
          font-size: 0.26rem;
          color: #fff;
          img{
            vertical-align: middle;
          }
          .img_jb{
            width: 0.38rem;
            height: 0.38rem;
            margin-right: 0.12rem;
          }
          .img_sl{
            width: 0.32rem;
            height: 0.38rem;
            margin-right: 0.18rem;
          }
        }
        .right{
          height: 0.5rem;
          border-top-left-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
          padding: 0.14rem 0.32rem 0.14rem 0.24rem;
          color: #fff;
          font-size: 0.26rem;
          background-image: url('./image/yuan_jx.png');
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
        }
      }
      .wa_con{
        position: relative;
        flex: 1;
        .jbi_box{
          position: relative;
          width: 85%;
          height: 68%;
          margin: 0 auto;
          .jbi_single{
            position: absolute;
            color: #ECE5FD;
            font-size: 0.22rem;
            animation: jbiSingle 3s ease infinite;
            img{
              width: 0.6rem;
              height: 0.6rem;
              margin-bottom: 0.04rem;
            }
          }
        }
      }
      .suanli_box{
        position: absolute;
        bottom: 0.52rem;
        left: 0.3rem;
        text-align: center;
        img{
          width: 0.9rem;
          height: 0.9rem;
        }
        .sli_p{
          color: #fff;
          font-size: 0.26rem;
        }
      }
    }
    .dig_con{
      .con_head{
        padding-top: 0.32rem;
        display: flex;
        justify-content: space-around;
        span{
          display: inline-block;
          width: 30%;
          text-align: center;
          vertical-align: top;
          font-size: 0.28rem;
          color: #333;
          padding-bottom: 0.26rem;
          border-bottom: 2px solid transparent;
        }
        .set_sp{
          color: #D53D3D;
          border-bottom: 2px solid #D53D3D;
        }
      }
      .con_tab{
        .tab_th{
          background-color: #F6F6F6;
          color: #333;
          padding: 0.22rem 0.3rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.24rem;
        }
        .tab_tbody{
          padding: 0 0.3rem;
          li{
            border-bottom: 1px solid #F0F0F0;
            color: #333;
            font-size: 0.26rem;
            display: flex;
            padding: 0.22rem 0;
            justify-content: space-between;
          }
        }
      }
    }
  }
  @keyframes jbiSingle{
    0% {
      margin-top: 0;
    }
    10% {
      margin-top: -4px;
    }
    20% {
      margin-top: -8px;
    }
    30% {
      margin-top: -12px;
    }
    40% {
      margin-top: -16px;
    }
    50% {
      margin-top: -20px;
    }
    60% {
      margin-top: -16px;
    }
    70% {
      margin-top: -12px;
    }
    80% {
      margin-top: -8px;
    }
    90% {
      margin-top: -4px;
    }
    100% {
      margin-top: 0;
    }
  }
</style>
