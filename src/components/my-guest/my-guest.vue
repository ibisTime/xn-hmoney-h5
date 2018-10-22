<template>
  <div class="guest-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>我的获客</span>
        </p>
    </header> -->
    <div class='main' >
        <div class='list-wrap'>
            <Scroll 
            ref="scroll"
            :data="list"
            :hasMore="hasMore"
            v-show="list.length > 0"
            @pullingUp="myGuest"
            >
                <div class='list' v-for='(item,index) in list' :key="index">
                    <div class='pic'>
                        <p :style="getUserPic(item.photo)" :class="{'hidden': !(item.photo)}" alt=""></p>
                        <img :class="{'hidden': item.photo}" src="./txiang.png"/>
                    </div>
                    <div class='text'>
                        <div class='text1'>
                            <p class='txt1'><span class='name'>{{item.nickname}}</span><span class='slogn1' :class="[item.idNO ? 'slogn1' : 'slogn2']">{{item.idNO ? '已认证' : '未认证'}}</span></p>
                            <p class='txt2 gray'>{{item.createDatetime}}</p>
                        </div>
                        <div class='text2'>
                            <p class='txt1'>交易金额：{{item.tradeCount}}</p>
                            <p class='txt2'>获佣(注册佣金 + 交易佣金)：<span class='gray' :class="[item.regAwardCount ? 'gray' : 'red']">{{item.regAwardCount + item.tradeAwardCount}} {{item.tradeCount ? 'X' : ''}}</span></p>
                        </div>
                    </div>
                </div>
            </Scroll>
            <div class="no-data" :class="{'hidden': len > 0}">
                <img src="./wu.png" />
                <p>暂无获客</p>
            </div>
        </div>

    </div>
  </div>
</template>
<script>
import { myGuest } from "../../api/person";
import { getUser, formatDate, formatAmount, isUnDefined, getAvatar, setTitle } from "../../common/js/util";
import Scroll from 'base/scroll/scroll';

export default {
  data() {
    return {
      list: [],
      start: 1,
      limit: 10,
      hasMore: true,
      len: ''
    };
  },
  created() {
      setTitle('我的获客');
      this.myGuest();
  },
  methods: {
    // 获取头像
    getUserPic(pic){
      return getAvatar(pic);
    },
    myGuest() {
      myGuest(this.start, this.limit).then(data => {
        data.list.map( v => {
            v.tradeCount = formatAmount(`${v.tradeCount}`, '', 'X');
            v.tradeAwardCount = parseFloat(formatAmount(`${v.tradeAwardCount}`, '', 'X'));
            v.createDatetime = formatDate(v.createDatetime, 'yyyy-MM-dd');
        });
        if (data.totalPage <= this.start) {
          this.hasMore = false;
        }
        this.list = [...this.list, ...data.list];
        this.len = this.list.length;
        this.start++;
      });
    }
  },
  components: {
      Scroll
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

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fhui.png');
      float: left;
      margin-top: 0.31rem;
    }
  }
  .main {
    width: 100%;
    height: 12rem;
    overflow: scroll;
    background: #fff;
    .list-wrap {
      display: block;
      width: 100%;
      .list {
        width: 100%;
        display: flex;
        padding: 0.4rem 0.3rem;
        border-bottom: 0.01rem solid #e5e5e5;
        .pic {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-right: 0.22rem;
          p{
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
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
          .text1,
          .text2 {
            display: flex;
            justify-content: space-between;
          }

          .text1 {
            padding-bottom: 0.27rem;
            .name {
              font-size: 0.28rem;
              font-weight: bold;
            }
            .slogn1 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #d53d3d;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
            .slogn2 {
              display: inline-block;
              width: 0.74rem;
              border-radius: 0.04rem;
              background: #b3b3b3;
              font-size: 0.2rem;
              color: #fff;
              text-align: center;
              line-height: 0.28rem;
              margin-left: 0.23rem;
            }
          }
        }
      }
    }
  }
}
</style>
