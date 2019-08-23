<template>
  <div class="dig_coin">
    <div class="dig_head">
      <div class="head_gg">
        公告：xxx玩家挖到xxx矿
      </div>
      <div class="wa_dig">
        <div class="left">
          <img class="img_jb" src="./image/wa_jb.png" alt="">
          <span>挖矿：0.0001</span>
        </div>
        <div class="right">
          玩法介绍
        </div>
      </div>
      <div class="wa_dig">
        <div class="left">
          <img class="img_sl" src="./image/wa_sl.png" alt="">
          <span>算力：0.0001</span>
        </div>
      </div>
      <div class="wa_con">
        <div class="suanli_box">
          <img src="./image/get_suanli.png" alt="">
          <p class="sli_p">获取算力</p>
        </div>
      </div>
    </div>
    <div class="dig_con">
      <div class="con_head">
        <div>算力排行榜</div>
        <div>代币排行榜</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
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
        opacity: 0.5;
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
          background-color: rgb(153, 0, 153);
          color: #fff;
          font-size: 0.26rem;
        }
      }
      .wa_con{
        position: relative;
        flex: 1;
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
  }
</style>
