<template>
  <div class="modal_tag" v-show="isShowPawModal" @click.stop>
    <div class="bounced" @click.stop :style="{top: isFocus ? '30%' : '50%'}">
      <h5>请输入密码</h5>
      <div class="iup_box">
        <div>{{iupPawList[0] && '·'}}</div>
        <div>{{iupPawList[1] && '·'}}</div>
        <div>{{iupPawList[2] && '·'}}</div>
        <div>{{iupPawList[3] && '·'}}</div>
        <div>{{iupPawList[4] && '·'}}</div>
        <div>{{iupPawList[5] && '·'}}</div>
        <input
          type="password"
          @keyup.stop="inputPaw"
          @focus.stop="iupFocus"
          @blur="blurIn"
          @click.stop
          ref="pawRef"
        >
      </div>
      <div class="foo_btns">
        <div class="left" @click.stop="removePaw">
          取消
        </div>
        <div class="right" @click.stop="determinePaw">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowPawModal: false,
        isFocus: false,
        iupPawList: [],
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      inputPaw(ev) {
        const v = ev.target.value;
        if (v.length < 7) {
          this.iupPawList = v.split('');
        }
      },
      determinePaw() {
        this.$emit('getPawList', this.iupPawList);
      },
      removePaw() {
        this.$emit('removePaw');
      },
      blurIn () {
        this.isFocus = false;
        window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
      },
      iupFocus() {
        this.isFocus = true;
      }
    },
    watch: {
      isShowPawModal() {
        this.$refs.pawRef.value = '';
        this.iupPawList = [];
      },
      isShow(newVal) {
        this.isShowPawModal = newVal;
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal_tag {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    .bounced {
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 0.2rem;
      padding-top: 0.8rem;
      h5 {
        color: #333;
        font-size: 0.48rem;
        margin-bottom: 0.6rem;
        text-align: center;
      }
      .iup_box {
        height: 1.2rem;
        line-height: 1.2rem;
        background-color: #eee;
        font-size: 0.4rem;
        color: #333;
        margin-bottom: 0.6rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        position: relative;
        border-radius: 0.08rem;
        border-left: 1px solid #DEE0E5;
        border-top: 1px solid #DEE0E5;
        border-bottom: 1px solid #DEE0E5;
        display: flex;
        div {
          border-right: 1px solid #DEE0E5;
          text-align: center;
          flex: 1;
          height: 100%;
          font-size: 1rem;
        }
        input {
          position: absolute;
          z-index: 9;
          left: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          opacity: 0;
        }
      }
      .foo_btns {
        border-top: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        font-size: 0.32rem;
        height: 1.1rem;
        line-height: 1.1rem;
        color: #333;
        .left {
          text-align: center;
          flex: 1;
          border-right: 1px solid #E5E5E5;
        }
        .right {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
</style>
