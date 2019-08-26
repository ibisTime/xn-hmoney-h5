<template>
  <div class="get_calculate">
    <ul class="cal_container">
      <li>
        <img src="../image/get_yqhy.png" alt="">
        <p>邀请好友</p>
      </li>
      <li>
        <img src="../image/get_cbi.png" alt="">
        <p>持币</p>
      </li>
      <li>
        <img src="../image/get_zdjg.png" alt="">
        <p>主动交割</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .get_calculate{
    background-image: url('../image/get_hqu_bg.png');
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    height: 100%;
    position: relative;
    .cal_container{
      position: absolute;
      top: 46%;
      left: 0.3rem;
      right: 0.3rem;
      display: flex;
      justify-content: space-between;
      li{
        width: 32%;
        background-color: #fff;
        border-radius: 0.1rem;
        text-align: center;
        padding: 0.6rem 0;
        img{
          width: 0.78rem;
        }
        p{
          font-size: 0.32rem;
          margin-top: 0.3rem;
        }
      }
    }
  }
</style>
