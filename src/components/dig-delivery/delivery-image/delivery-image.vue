<template>
  <div class="delivery-image">
    <div class="wrp_box">
      <Scroll
        ref="scroll"
        :data="deliveryImageList"
        :hasMore="hasMore"
        v-show="deliveryImageList.length > 0"
        @pullingUp="queryRealRightData"
      >
        <ul class="deli_ul">
          <li
            class="li_single"
            v-for="(item, index) in deliveryImageList"
            :key="`img_${index}`"
            @click="() => {selectedProduct(item, index)}"
          >
            <span
              class="selected_box"
              :class="selectIndex === index ? 'select_sp' : ''"
            ></span>
            <div class="img_box" :style="{backgroundImage: `url('${item.pic}')`}"></div>
            <p class="li_single_p">{{item.price}}币/份</p>
          </li>
        </ul>
      </Scroll>
      <div class="no-data" :class="{'hidden': deliveryImageList.length > 0}">
        <img src="./wu.png" />
        <p>暂无记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import { setTitle, formatAmount } from "common/js/util";
  import {queryRealRight} from 'api/homeDig';
  export default {
    data() {
      return {
        params: {
          start: 1,
          limit: 10,
          symbol: ''
        },
        deliveryImageList: [],
        hasMore: true,
        selectIndex: -1
      }
    },
    created() {
      setTitle('选择商品');
      this.params.symbol = this.$route.query.symbol || '';
      this.queryRealRightData();
    },
    methods: {
      queryRealRightData() {
        queryRealRight(this.params).then(data => {
          data.list.forEach(item => {
            item.price = formatAmount(item.price, '', item.symbol);
            item.pic = PIC_PREFIX + item.pic;
          });
          if (data.totalPage <= this.params.start) {
            this.hasMore = false;
          }
          this.deliveryImageList = [...this.deliveryImageList, ...data.list];
          this.params.start ++;
        });
      },
      selectedProduct(msg, index) {
        this.selectIndex = index;
        sessionStorage.setItem('productMsg', JSON.stringify({
          productPic: msg.pic,
          productCode: msg.code,
          price: msg.price,
          productName: msg.productName,
          remainQuantity: msg.remainQuantity
        }))
        setTimeout(() => {
          this.$router.back();
        }, 100);
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  .delivery-image{
    height: 100%;
    background-color: #fff;
    color: #333;
    font-size: 0.28rem;
    position: relative;
    .wrp_box{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
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
          background-size: 100% 100%;
        }
        .selected_box{
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          width: 0.28rem;
          height: 0.28rem;
          background-size: 100% 100%;
          background-image: url('./deli_tyuan.png');
        }
        .select_sp{
          background-image: url('./deli_yuan.png');
        }
        .li_single_p{
          text-align: center;
        }
      }
    }
  }
</style>
