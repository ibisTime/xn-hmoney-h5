<template>
  <div class="idcard-wrapper" @click.stop>
    <div class='main'>
      <Scroll 
        ref="scroll"
        :data="noticeData"
        :hasMore="hasMore"
        :pullUpLoad="pullUpLoad"
        v-show="noticeData.length > 0"
        @pullingUp="getNotice"
      >
        <div class="list" v-for="(item, index) in noticeData" :key="index">
          <div class='text1'><i class='icon'></i><span class='txt1'>FUNMVP</span><span class='txt2'>{{item.createDatetime}}</span></div>
          <p class="text2">{{item.content}}</p>
        </div>
      </Scroll>
      <div class="no-data" :class="{'hidden': noticeData.length > 0}">
        <img src="./wu.png" />
        <p>{{ $t('notice.subject.zwgg') }}</p>
      </div>
    </div>
    

  </div>
</template>
<script>
import { setTitle } from 'common/js/util';
import { notice } from 'api/general';
import Scroll from 'base/scroll/scroll';
export default {
  data() {
    return {
      start: 1,
      hasMore: true,
      noticeData: [],
      pullUpLoad: {
        threshold: 40,
        txt: {
          more: this.$t('common.jzz') + '...',
          noMore: this.$t('common.jzwb')
        }
      }
    };
  },
  created() {
    setTitle(this.$t('notice.subject.gg'));
    this.getNotice();
  },
  methods: {
    getNotice(){
      notice(this.start).then(data => {
        if(data.totalPage <= this.start){
          this.hasMore = false;
        }
        this.noticeData = [...this.noticeData, ...data.list];
        this.start ++;
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

.idcard-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;

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
    margin-bottom: .3rem;

    .icon {
      width: 0.21rem;
      height: 0.36rem;
      background-image: url('./fh.png');
      float: left;
      margin-top: 0.31rem;
    }
  }

  .main {
    width: 100%;
    height: 12rem;
    padding: 0 .3rem;
    margin-top: 0.3rem;
    .list {
      width: 100%;
      border-radius: .08rem;
      background: #fff;
      padding: .4rem .3rem .52rem;
      margin-bottom: .3rem;
      .text1 {
        line-height: .6rem;
        padding-bottom: .3rem;
        .icon {
          width: .6rem;
          height: .6rem;
          background-image: url('./gg.png');
          vertical-align: middle;
          margin-right: .18rem;
        }
        .txt1 {
          font-weight: bold;
          color: #323232;
        }
        .txt2 {
          float: right;
          font-size: .24rem;
          color: #989898;
        }
      }
      .text2 {
        color: #323232;
        font-weight: bold;
        line-height: .4rem;
      }
    }
  }




}
</style>
