<template>
  <div class="address-book">
    <div class="header">
      地址本
      <span @click="toAddBook">添加</span>
    </div>
    <ul class="book_con">
      <li class="single_li">
        <div class="li_head">
          <span class="left">火币地址</span>
          <span>2019-10-10 20:00:00</span>
        </div>
        <p>1cjiosuadfiosdaufi0xf750b288323dfpfdspof</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      toAddBook() {
        this.$router.push('address-book-add');
      }
    }
  }
</script>

<style scoped lang="scss">
  .address-book{
    height: 100%;
    background-color: #FFFFFF;
    padding: 0.26rem 0.3rem 0;
    .header{
      position: relative;
      color: #333333;
      font-size: 0.36rem;
      text-align: center;
      span{
        position: absolute;
        right: 0.3rem;
        font-size: 0.28rem;
      }
    }
    .book_con{
      padding-top: 0.28rem;
      position: relative;
      .single_li{
        padding: 0.26rem 0;
        border-bottom: #E6E6E6;
        .li_head{
          display: flex;
          justify-content: space-between;
          color: #999;
          font-size: 0.24rem;
          margin-bottom: 0.14rem;
          .left{
            color: #333;
            font-size: 0.32rem;
          }
        }
        p{
          color: #666;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
