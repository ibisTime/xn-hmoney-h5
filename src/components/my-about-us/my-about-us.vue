<template>
  <div class="aboutus-wrapper" @click.stop>
    <div class='content cont1'>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=plat_introduce'>
            <p>
            <span>平台介绍</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=service'>
            <p>
            <span>联系我们</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=reg_protocol'>
            <p>
            <span>用户协议</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
    <div class='content'>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=privacy'>
            <p>
            <span>隐私条款</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' to='about-platformIntroduced?ckey=raw_note'>
            <p>
            <span>法律声明</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>
  </div>
</template>
<script>
import { setTitle } from "common/js/util";
export default {
  name: 'test-keep-alive',
  data() {
    return {
    };
  },
  created() {
    setTitle(this.$t('aboutprivacy.subject.gywm'));
  },
  activated() {
    this.$set(document, 'title', this.$t('aboutprivacy.subject.gywm'));
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
