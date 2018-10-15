<template>
  <div class="identity-wrapper" @click.stop>
    <!-- <header>
        <p>
        <i class='icon'></i>
        <span class='title'>身份认证</span>
        </p>
    </header> -->
    <div class='content cont1'>
        <router-link class='tag mb20' :to='isRzNum == -1 ? "security-idcard/sfz" : ""' :class="{'show': isRzNum == '1' || !isSfRz}">
            <p>
            <span>身份证认证</span>
            <span class="rz-sp" :class="{'rz-col': isRzNum == '1'}">{{rzStatus}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag mb20' :to='isRzNum == -1 ? "security-idcard/hz" : ""' :class="{'show': isRzNum == '2' || !isHzRz}">
            <p>
            <span>护照认证</span>
            <span class="rz-sp" :class="{'rz-col': isRzNum == '2'}">{{rzStatus}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
        <router-link class='tag' :to='isRzNum == -1 ? "security-idcard/jz" : ""' :class="{'show': isRzNum == '3' || !isJzRz}">
            <p>
            <span>驾照认证</span>
            <span class="rz-sp" :class="{'rz-col': isRzNum == '3'}">{{rzStatus}}</span>
            <i class='icon'></i>
            </p>
        </router-link>
    </div>

  </div>
</template>
<script>
import { getDictList } from 'api/general';
import { getUser } from 'api/user';
import {setTitle} from 'common/js/util';
export default {
  data() {
    return {
      show: true,
      rzStatusList: {},
      isRzNum: -1,
      rzStatus: '未认证',
      isSfRz: false,
      isHzRz: false,
      isJzRz: false
    };
  },
  created() {
    setTitle('身份认证');
    getDictList("approve_status").then(data => {
      data.forEach(item => {
        this.rzStatusList[`${item.dkey}`] = item.dvalue;
      });
      let that = this;
      getUser().then(data => {
        console.log('data', data);
        let userIdAuthInfo = data.userIdAuthInfo;
        if(userIdAuthInfo){
          switch(userIdAuthInfo['idKind']){
            case '1': this.isHzRz = true;this.isJzRz = true;break;
            case '2': this.isSfRz = true;this.isJzRz = true;break;
            case '3': this.isSfRz = true;this.isHzRz = true;break;
          }
          that.isRzNum = data['idKind'];
          that.rzStatus = that.rzStatusList[userIdAuthInfo['status']];
        }
      });

      function isRzFn(){

      }

    });
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.identity-wrapper {
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
      @include bg-image("返回");
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
    .mb20 {
      border-bottom: 0.01rem solid #d8d8d8;
    }
    .tag {
      display: block;
      width: 100%;
      font-size: 0.32rem;
      color: #333;
      display: none;
      .icon {
        width: 0.16rem;
        height: 0.26rem;
        float: right;
        margin-top: 0.37rem;
        @include bg-image("更多");
      }
      .tel {
        float: right;
        margin-right: .2rem;
      }
    }
  }
  .rz-sp{
    font-size: 0.26rem;
    padding: 0.04rem 0.1rem;
    border: 1px solid #ccc;
    margin-left: 0.14rem;
    color: #666;
  }
  .rz-col{
    color: #d53d3d;
    border-color: #d53d3d;
  }

}
</style>
