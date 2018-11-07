<template>
  <div class="guest-wrapper" @click.stop>
    <div class='main' >
        <div class='list-wrap'>
            <Scroll 
            ref="scroll"
            :data="list"
            :hasMore="hasMore"
            v-show="list.length > 0"
            @pullingUp="userEvaluate"
            >
                <div v-for='(item,index) in list' :key="index">
                    <div class="list">
                        <div class='pic'>
                            <p :style="getUserPic(item.user.photo)" :class="{'hidden': !(item.user.photo)}" alt=""></p>
                            <!-- <img :class="{'hidden': item.user.photo}" src="./txiang.png"/> -->
                            <HeadPic :content="item.user.nickname.substring(0, 1)" :class="{'hidden': item.user.photo}"/>
                        </div>
                        <div class='text'>
                            <p><span class='name'>{{item.user.nickname}}</span></p>
                            <p class="isgood"><span :class="{'isg': item.starLevel == '2'}">{{isGood[item.starLevel]}}</span></p>
                            <p class="fr">{{item.commentDatetime}}</p>
                        </div>
                    </div>
                    <div class='text2'>
                        <p class='txt1'>{{item.content ? item.content : '-'}}</p>
                    </div>
                </div>
            </Scroll>
            <div class="no-data" :class="{'hidden': len > 0}">
                <img src="./wu.png" />
                <p>暂无信息</p>
            </div>
        </div>
    </div>
    <FullLoading ref="fullLoading" v-show="isLoading"/> 
  </div>
</template>
<script>
import { userEvaluate } from "../../api/person";
import { getAvatar, setTitle, getUrlParam, getUserId, formatDate } from "../../common/js/util";
import Scroll from 'base/scroll/scroll';
import HeadPic from 'base/head-pic/headPic';
import FullLoading from 'base/full-loading/full-loading';

export default {
  data() {
    return {
      list: [],
      start: 1,
      limit: 10,
      hasMore: true,
      len: '',
      userId: '',
      isGood: {
          '0': '差评',
          '2': '好评'
      },
      config: {
        start: 1,
        limit: 10
      },
      isLoading: true
    };
  },
  created() {
    setTitle('用户评价');
    this.userId = getUrlParam('userId');
    this.config.objectUserId = this.userId;
    this.userEvaluate();
  },
  methods: {
    // 获取头像
    getUserPic(pic){
      return getAvatar(pic);
    },
    userEvaluate(){
      this.config.start = this.start;
      userEvaluate(this.config).then(data => {
        data.list.map( v => {
          v.commentDatetime = formatDate(v.commentDatetime, 'yyyy-MM-dd');
        });
        if (data.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.list = [...this.list, ...data.list];
        this.len = this.list.length;
        this.start++;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
    }
  },
  components: {
      Scroll,
      HeadPic,
      FullLoading
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.guest-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  .red {
    color: #d53d3d;
  }
  .gray {
    color: #999;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  header {
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    background: #fff;
    width: 100%;
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
    p{
      display: flex;
      justify-content: space-around;
      color: #666;
      font-size: 0.32rem;
    }
  }
  .main {
    width: 100%;
    height: 12rem;
    padding-bottom: 1rem;
    overflow: scroll;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      .list {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.4rem 0.3rem 0.1rem;
        .pic {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-right: 0.22rem;
          p{
            width: 100%;
            height: 100%;    
            background-position: center;
            background-size: cover;
            border-radius: 100%;
          }
          img{
              width: 100%;
              height: 100%;
          }
        }
        .text {
          width: 83%;
          font-size: 0.24rem;
          color: #323232;
          display: flex;
          p{
            margin-right: 0.08rem;
          }
          .name{
            font-size: 0.3rem;
          }
          .isgood{
              span{
                  min-width: 1rem;
                  display: inline-block;
                  text-align: center;
                  padding: 0.05rem 0;
                  border: 1px solid #ccc;
                  border-radius: 0.03rem;
                  color: #888;
              }
              .isg{
                  color: #d53d3d;
                  border-color: #d53d3d;
              }
          }
          .fr{
              width: 100%;
              text-align: right;
          }
        }
      }
      .text2{
        border-bottom: 0.01rem solid #e5e5e5;
        padding: 0.3rem;
        color: #333;
        font-size: 0.3rem;
      }
    }
  }
}
</style>
