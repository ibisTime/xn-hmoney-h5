<template>
  <div class="market">
    <div class="market_box">
      <div class="header">
        <category-scroll
          :currentIndex="currentIndex"
          :categorys="orderTypeList"
          @select="selectCategory"
        />
      </div>
      <div class="con_box">
        <div class="con_header">
          <p>币种名称</p>
          <p>
            <span class="h_pic">价格(¥)</span>
            <span>24H涨跌</span>
          </p>
          <p>市值&市场占比</p>
        </div>
        <ul class="container">
          <li class="mar_single">
            <div class="sing_left">
              <p class="li_head">BCH</p>
              <p>比特币现金</p>
            </div>
            <div class="sing_mid">
              <p class="li_head">464,411.25</p>
              <p class="up_p">0.76%</p>
            </div>
            <div class="sing_right">
              <p class="li_head">64,411.25</p>
              <p>0.76%</p>
            </div>
          </li>
          <li class="mar_single">
            <div class="sing_left">
              <p class="li_head">BCH</p>
              <p>比特币现金</p>
            </div>
            <div class="sing_mid">
              <p class="li_head">464,411.25</p>
              <p class="dw_p">0.76%</p>
            </div>
            <div class="sing_right">
              <p class="li_head">64,411.25</p>
              <p>0.76%</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import categoryScroll from 'base/category-scroll/category-scroll';
  import Footer from 'components/footer/footer';
  export default {
    data() {
      return {
        orderTypeList: [
          {
            key: 'c01',
            value: '自选'
          }, {
            key: 'c02',
            value: '全部'
          }, {
            key: 'c03',
            value: '主板'
          }, {
            key: 'c04',
            value: '股权'
          }, {
            key: 'c05',
            value: '农业'
          }
        ],
        currentIndex: 0
      }
    },
    created() {
      this.$set(document, 'title', '行情');
      document.getElementById('app').style.height = '100%';
    },
    methods: {
      selectCategory(index) {
        this.currentIndex = index;
      }
    },
    components: {
      Footer,
      categoryScroll
    }
  }
</script>

<style lang="scss" scoped>
  .market{
    background-color: #fff;
    height: 100%;
  }
  .header{
    height: 0.8rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.32rem;
    color: #999999
  }
  .con_header{
    background-color: #F0F0F0;
    color: #999;
    display: flex;
    padding: 0.14rem 0.3rem;
    font-size: 0.24rem;
    justify-content: space-between;
    .h_pic{
      margin-right: 0.3rem;
    }
  }
  .container{
    padding: 0 0.3rem;
    .mar_single{
      padding: 0.3rem 0;
      display: flex;
      border-bottom: 1px solid #E6E6E6;
      .sing_left{
        flex: 1;
      }
      .sing_mid{
        flex: 2;
        text-align: right;
        .up_p{
          color: #C93D3D;
        }
        .dw_p{
          color: #28BE67;
        }
      }
      .sing_right{
        flex: 2;
        text-align: right;
      }
      .li_head{
        font-style: 'Helvetica Neue Medium';
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
        color: #333;
        font-weight: 500;
      }
      p{
        font-size: 0.24rem;
        color: #999;
      }
    }
  }
</style>
