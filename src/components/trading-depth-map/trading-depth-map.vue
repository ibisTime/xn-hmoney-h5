<template>
  <div class="map-wrapper" @click.stop>
     <div class='main'>
       深度图
     </div>
  </div>
</template>
<script>
  export default {
    props: {
    },
    computed: {
    },
    methods: {
    },
    components: {
    }
  };
</script>
<style lang="scss" scoped>
  @import "~common/scss/mixin";
  @import "~common/scss/variable";

.map-wrapper {
  width: 100%;
  background: #172143;
  font-size: .28rem;
  color: #ccc;
  line-height: .35rem;

  .main {
    width: 100%;
    padding: 0 .3rem;
  }

}
</style>
