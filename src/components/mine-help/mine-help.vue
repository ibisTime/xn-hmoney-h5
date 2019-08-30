<template>
  <div class="mine_help">
    <div class="mine-box">
      <strong>.标题</strong>
      <div>
        <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
      </div>
    </div>
    <div class="mine-box">
      <strong>.标题</strong>
      <div>
        <p>1、xxxxxxxxxxxxxxxx。</p>
        <p>2、xxxxxxxxxxxxxxxx。</p>
        <p>3、xxxxxxxxxxxxxxxx。</p>
        <p>4、xxxxxxxxxxxxxxxx。</p>
        <p>5、xxxxxxxxxxxxxxxx。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  .mine_help{
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding-top:0.8rem;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    .mine-box{
      width: 100%;
      strong{
        font-size: 0.32rem;
      }
      p{
        font-size: 0.30rem;
        margin-top: 0.2rem;
      }
      div{
        word-break:break-all;
      }
    }
  }
</style>
