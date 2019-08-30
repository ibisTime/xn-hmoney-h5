<template>
  <div class="mine_team">
    <div class="mine_team_head_box">
      <div class="mine_team_recommend_census">
        <div><span>团队总人数(人)</span></div>
        <strong>5</strong>
        <div class="mine_team_layer">
          <span class="mine_team_one_left">一代：10人</span>
          <span class="mine_team_two_right">二代：10人</span>
          <span class="clear"></span>
        </div>
      </div>
    </div>
    <ul class="team_box">
      <li class="single_li">
        <p class="li_title">18839802894 <span>一代</span></p>
        <p class="li_time">加入时间：2019-07-07 11:02:00</p>
        <i class="li_icon_out"></i>
      </li>
      <li class="single_li active">
        <p class="li_title">18839802894 <span>一代</span></p>
        <p class="li_time">加入时间：2019-07-07 11:02:00</p>
        <i clas="li_icon_in"></i>
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
    .mine_team_head_box{
      width: 100%;
      padding: 0rem 0.3rem;
      .mine_team_recommend_census{
        background: url("./mine-team-recommend.png") no-repeat;
        background-size: 100% 3rem;
        width: 100%;
        height: 3rem;
        text-align: center;
        span{
          font-size: 0.28rem;
          color: #fff;
        }
        strong{
          font-size: 0.48rem;
          color: #fff;
        }
        .mine_team_layer{
          width: 100%;
          margin-top: 0.2rem;
          .mine_team_one_left{
            float: left;
            margin-left: 1rem;
          }
          .mine_team_two_right{
            float: right;
            margin-right: 1rem;
          }
        }
      }
    }
    .team_box{
      margin-top: 0.2rem;
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
        .li_icon_out{
          background-image: url('/static/triangle-bottom.png');
        }
        .li_icon_in{
          background-image: url('/static/triangle-top.png');
        }
        i{
          position: absolute;
          right: 0.3rem;
          top: 50%;
          transform: translateY(-50%);
          background-image: url('/static/triangle-bottom.png');
          background-size: 0.18rem;
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
  .clear{
    clear: both;
  }
</style>
