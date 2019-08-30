<template>
  <div class="address-book">
    <div class="header">
      地址本
      <span @click="toAddBook">添加</span>
    </div>
    <ul class="book_con">
      <Scroll
        ref="scroll"
        :data="list"
        :hasMore="hasMore"
        v-show="list.length > 0"
        @pullingUp="getAddressBookPage"
      >
      <li class="single_li" v-for='(item,index) in list' :key='index'>
        <div class="li_head">
          <span class="left">{{item.label}}</span>
          <span>{{item.createDatetime}}</span>
        </div>
        <p>{{item.address}}</p>
      </li>
      </Scroll>
    </ul>
    <FullLoading ref="fullLoading" v-show="isLoading"/>
  </div>
</template>

<script>
  import {getAddressBookPage} from 'api/mine';
  import { setTitle, formatDate } from 'common/js/util';
  import {getUserId} from 'common/js/util';
  import Scroll from 'base/scroll/scroll';
  import FullLoading from 'base/full-loading/full-loading';
  export default {
    data() {
      return {
        isLoading: true,
        hasMore: true,
        list: [],
        config: {
          userId: getUserId(),
          start: 1,
          limit: 10
        },
        start: 1,
        limit: 10
      }
    },
    created() {
      this.getAddressBookPage();
    },
    methods: {
      toAddBook() {
        this.$router.push('address-book-add');
      },
      getAddressBookPage() {
        this.config.start = this.start;
        this.config.limit = this.limit;
        getAddressBookPage(this.config).then(data => {
          console.log(data);
          data.list.map(item => {
            item.label = item.label;
            item.address = item.address;
            item.createDatetime = formatDate(item.createDatetime, 'yyyy-MM-dd hh:mm:ss');
          })
          if (data.totalPage <= this.start) {
            this.hasMore = false;
          }
          this.list = [...this.list, ...data.list];
          this.start ++;
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        });
      }
    },
    components: {
      Scroll,
      FullLoading
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
