<template>
  <div class="mine_team">
    <ul class="team_box">
      <li class="single_li">
        <p class="li_title">18839802894 <span>一代</span></p>
        <p class="li_time">加入时间：2019-07-07 11:02:00</p>
        <i></i>
      </li>
      <li class="single_li active">
        <p class="li_title">18839802894 <span>一代</span></p>
        <p class="li_time">加入时间：2019-07-07 11:02:00</p>
        <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  .mine_team{
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding-top: 0.18rem;
    .team_box{
      .single_li{
        padding: 0.28rem 0.3rem;
        position: relative;
        border-bottom: 1px solid #eee;
        .li_title{
          color: #333333;
          font-size: 0.32rem;
          margin-bottom: 0.18rem;
          span{
            background-color: #FFA358;
            color: #fff;
            margin-left: 0.12rem;
            font-size: 0.24rem;
            padding: 0.04rem 0.15rem;
            vertical-align: top;
          }
        }
        .li_time{
          color: #999999;
          font-size: 0.24rem;
        }
        i{
          position: absolute;
          right: 0.3rem;
          top: 50%;
          transform: translateY(-50%);
          background-color: #CCCCCC;
          display: inline-block;
          width: 0.18rem;
          height: 0.14rem
        }
      }
      .active{
        background-color: #DBDBDB;
      }
    }
  }
</style>
