<template>
  <transition name="confirm-fade">
    <div class="loading-module-cont" v-show="showFlag">
      <span class="close" @click="hide">X</span>
      <span class="loading-module-text">{{text}}</span>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "~common/scss/variable";

  .loading-module-cont {
    position: fixed;
    top: 40%;
    left: 50%;
    padding: 0.2rem 0.25rem;
    line-height: 2;
    transform: translate(-50%, -50%);
    min-width: 4.2rem;
    max-width: 60%;
    border-radius: 0.08rem;
    z-index: 998;
    word-wrap: break-word;
    font-size: 0;
    color: #fff;
    background-color: rgba(58,58,58,.9);

    &.toast-fade-enter-active {
      animation: toast-fadein 0.3s;
      .toast-content {
        animation: toast-zoom 0.3s;
      }
    }

    .loading-module-text{
      font-size: $font-size-medium;
    }
    .close{
        position: absolute;
        top: -0.15rem;
        right: -0.15rem;
        display: inline-block;
        width: .4rem;
        height: .4rem;
        border-radius: .75rem;
        font-weight: 600;
        background-color: rgba(58,58,58,.9);
        color: #fff;
        z-index: 9999;
        font-size: $font-size-medium;
        text-align: center;
        line-height: 0.4rem;
    }
  }
  @keyframes toast-fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes toast-zoom {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
