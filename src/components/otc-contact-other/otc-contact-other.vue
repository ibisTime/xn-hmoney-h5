<template>
  <div class="contact-wrapper" @click.stop>

    <div class='chat'>
        <div class='chat-inner'>
          <div class='content'>
          </div>
        </div>
    </div>

    <div class="chat-input">
        <p>
            <input type="text" placeholder="说点什么吧">
            <i class='ico1 icon'></i>
            <i class='ico2 icon'></i>
        </p>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import "~common/scss/mixin";
@import "~common/scss/variable";

.contact-wrapper {
  font-size: 0.28rem;
  color: #333;
  position: fixed;
  left: 0;
  top: 0;
  
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }


  .chat {
    width: 100%;
    padding: 0 .3rem;
    height: 100%;
    margin-bottom: 0.98rem;
    overflow: hidden;
    .chat-inner {
      width: 102%;
      height: 100%;
      overflow-y: auto;
      .content {
        height: 100%;
      }
    }
  }

  .chat-input {
    width: 100%;
    height: 0.98rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    p {
      width: 100%;
      margin: 0.14rem 0.3rem;
      input {
        width: 5.4rem;
        line-height: 0.7rem;
        border: 0.01rem solid #e5e5e5;
        border-radius: 0.05rem;
        text-indent: 0.22rem;
      }
      input[attr="placeholder"] {
        font-size: 0.32rem;
        color: #999;
      }

      .ico1,
      .ico2 {
        width: 0.5rem;
        height: 0.5rem;
        position: absolute;
        top: 0.28rem;
      }

      .ico1 {
        @include bg-image("表情(1)");
        right: 1rem;
      }
      .ico2 {
        @include bg-image("添加(2)");
        right: 0.3rem;
      }
    }
  }

    
  

}
</style>
