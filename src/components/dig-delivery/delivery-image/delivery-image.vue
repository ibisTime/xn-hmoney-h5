<template>
  <div class="delivery-image">
    <ul class="deli_ul">
      <li class="li_single">
        <span class="selected_box">
          <img src="./deli_yuan.png" alt="">
        </span>
        <div class="img_box">
          <img src="" alt="">
        </div>
        <p class="li_single_p">1000币/份</p>
      </li>
      <li class="li_single">
        <span class="selected_box">
          <img src="./deli_yuan.png" alt="">
        </span>
        <div class="img_box">
          <img src="" alt="">
        </div>
        <p class="li_single_p">1000币/份</p>
      </li>
      <li class="li_single">
        <span class="selected_box">
          <img src="./deli_yuan.png" alt="">
        </span>
        <div class="img_box">
          <img src="" alt="">
        </div>
        <p class="li_single_p">1000币/份</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { setTitle } from "common/js/util";
  export default {
    data() {
      return {}
    },
    created() {
      setTitle('选择商品');
    }
  }
</script>

<style lang="scss" scoped>
  .delivery-image{
    height: 100%;
    background-color: #fff;
    color: #333;
    font-size: 0.28rem;
    .deli_ul{
      display: flex;
      flex-wrap: wrap;
      padding: 0.4rem 0.3rem 0.92rem;
      justify-content: space-between;
      .li_single{
        width: 3.3rem;
        margin-bottom: 0.3rem;
        position: relative;
        .img_box{
          height: 2.48rem;
          margin-bottom: 0.2rem;
          background-color: red;
        }
        .selected_box{
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          img{
            width: 0.28rem;
            height: 0.28rem;
          }
        }
        .li_single_p{
          text-align: center;
        }
      }
    }
  }
</style>
