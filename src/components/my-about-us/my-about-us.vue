<template>
  <div class="aboutus-wrapper" @click.stop>
    <div class='content cont1'>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=about_us'>
            <p>
            <span>{{$t('aboutprivacy.subject.ptjs')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=reg_protocol'>
            <p>
            <span>{{$t('aboutprivacy.subject.yhxy')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=privacy'>
            <p>
            <span>{{$t('aboutprivacy.subject.ystk')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=raw_note'>
            <p>
            <span>{{$t('aboutprivacy.subject.flsm')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=fee_note'>
            <p>
            <span>{{$t('aboutprivacy.subject.fvsm')}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class='content'>
        <a class='tag mb20' href="https://funmvp.zendesk.com/hc/zh-cn/">
            <p>
            <span>帮助中心</span>
            <i class='icon'></i>
            </p>
        </a>
    </div>
  </div>
</template>
<script>
import { setTitle } from "common/js/util";
export default {
  data() {
    return {
    };
  },
  created() {
    setTitle('关于我们');
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.aboutus-wrapper {
  font-size: 0.28rem;
  color: #333;
  width: 100%;
  background: #fff;

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

  .cont1 {
    border-bottom: 0.2rem solid #f5f5f5;
  }

  .content {
    width: 100%;
    padding: 0 0.3rem;
    line-height: 1rem;
    .tag {
      display: block;
      width: 100%;
      font-size: 0.32rem;
      color: #333;
      border-bottom: 0.01rem solid #eee;
      &:last-child{
        border-bottom: none;
      }
      .icon {
        width: 0.16rem;
        height: 0.26rem;
        float: right;
        margin-top: 0.37rem;
        background-image: url('./more.png');
      }
      .tel {
        float: right;
        margin-right: .2rem;
      }
    }
  }

}
</style>
