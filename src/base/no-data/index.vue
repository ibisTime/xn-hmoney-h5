<template>
  <div class="no_data">
    {{title}}
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="scss">
  .no_data{
    background-color: #fff;
    padding-top: 3rem;
    text-align: center;
    font-size: 0.36rem;
    color: #333;
  }
</style>
