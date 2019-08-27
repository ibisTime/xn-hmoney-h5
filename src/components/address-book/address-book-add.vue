<template>
  <div class="add_book">
    <div class="single_iup">
      <input type="text" placeholder="请输入地址名称">
    </div>
    <div class="single_iup">
      <select>
        <option value="-1" disabled>请选择地址类型</option>
        <option value="0">haha</option>
      </select>
    </div>
    <div class="single_iup">
      <input type="text" placeholder="请输入地址">
    </div>
    <div class="foo_btn">
      确定
    </div>
  </div>
</template>

<style scoped lang="scss">
  .add_book{
    height: 100%;
    background-color: #FFFFFF;
    padding: 0.2rem 0.3rem;
    .single_iup{
      padding: 0.34rem 0;
      font-size: 0.3rem;
      input, select{
        width: 100%;
      }
    }
    .foo_btn{
      margin-top: 2rem;
      background-color: #DA5454;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.3rem;
    }
  }
</style>
