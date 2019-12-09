<template>
  <div class="mine_team">
    <div class="mine_team_head_box">
      <div class="mine_team_recommend_census">
        <div><span>团队总人数(人)</span></div>
        <strong>{{tramObj.teamCount}}</strong>
        <div class="mine_team_layer">
          <span class="mine_team_one_left">一代总人数：{{tramObj.firstCount}}人</span>
          <span class="mine_team_two_right">二代总人数：{{tramObj.secondCount}}人</span>
          <span class="clear"></span>
        </div>
      </div>
    </div>
    <div class="user_list">
      <div class="wap_box">
        <Scroll
          ref="scroll"
          :data="userList"
          :hasMore="hasMore"
          v-show="userList.length > 0"
          @pullingUp="getUserChildren"
        >
          <ul class="team_box">
            <li
              class="single_li"
              v-for="(itemTeam, index) in userList"
              :key="`team_${index}`"
              @click='() => {selectedTeam(index)}'
            >
              <div style="padding: 0.28rem 0.3rem;">
                <p class="li_title">{{itemTeam.loginName}} <span>一代</span></p>
                <p class="li_time">加入时间：{{itemTeam.createDatetime}}</p>
                <i :class="selTeamIndex === index ? 'li_icon_in' : 'li_icon_out'"></i>
              </div>
              <ul class="team_children" v-if="itemTeam.referUserList && selTeamIndex === index">
                <li
                  class="children_single"
                  v-for="(childrenItem, index) in itemTeam.referUserList"
                  :key='`children_${index}`'
                >
                  <p class="li_title">{{childrenItem.loginName}} <span>二代</span></p>
                  <p class="li_time">加入时间：{{childrenItem.createDatetime}}</p>
                </li>
              </ul>
            </li>
          </ul>
        </Scroll>
        <div class="no-data" :class="{'hidden': userList.length > 0}">
          <img src="./wu.png" />
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setTitle, formatDate} from 'common/js/util';
  import {userChildren, userChildrenNum} from 'api/user';
  import Scroll from 'base/scroll/scroll';
  export default {
    data() {
      return {
        params: {
          start: 1,
          limit: 16
        },
        userList: [],
        hasMore: true,
        selTeamIndex: -1,
        tramObj: {
          teamCount: 0,
          firstCount: 0,
          secondCount: 0
        }
      }
    },
    created() {
      setTitle('我的团队');
      this.getUserChildren();
      userChildrenNum().then(data => {
        if(data.teamCount) {
          this.tramObj = data;
        }
      });
    },
    methods: {
      getUserChildren() {
        userChildren(this.params).then(data => {
          data.list.forEach(item => {
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
            if(item.referUserList && Array.isArray(item.referUserList)) {
              item.referUserList.forEach(referItem => {
                referItem.createDatetime = formatDate(referItem.createDatetime, 'yyyy-MM-dd hh:mm:ss');
              });
            }
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.userList = [...this.userList, ...data.list];
          this.params.start ++;
        });
      },
      selectedTeam(index) {
        if(this.selTeamIndex === index) {
          this.selTeamIndex = -1;
        }else {
          this.selTeamIndex = index;
        }
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="scss">
  .mine_team{
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    .mine_team_head_box{
      width: 100%;
      padding: 0.2rem 0.3rem 0;
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
            font-size: 0.20rem;
            padding: 0.03rem 0.15rem;
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
          top: 0.5rem;
          transform: translateY(-50%);
          background-image: url('/static/triangle-bottom.png');
          background-size: 0.18rem;
          display: inline-block;
          width: 0.18rem;
          height: 0.14rem
        }
        .team_children{
          background-color: #f7f7f7;
          .children_single{
            padding: 0.28rem 0.3rem;
          }
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
