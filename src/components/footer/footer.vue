<template>
  <div class="foot-wrapper" @click.stop>
    <router-link tag="div" class="foot-item item-0" to="/page">
      <i></i>
      <p>{{ $t('footer.navbar.page') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-1" to="/shop">
      <i></i>
      <p>{{ $t('footer.navbar.shop') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-2" to="/trading">
      <i></i>
      <p>{{ $t('footer.navbar.trading') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-3" to="/wallet">
      <i></i>
      <p>{{ $t('footer.navbar.wallet') }}</p>
    </router-link>
    <router-link tag="div" class="foot-item item-4" to="/mine">
      <i></i>
      <p>{{ $t('footer.navbar.mine') }}</p>
    </router-link>
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

  .foot-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    height: .96rem;
    width: 100%;
    background: #fff;
    font:.22rem/.3rem PingFangSC-Regular;
    color: #B3B3B3;
    text-align: center;
    z-index: 10;

    .foot-item {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      text-align: center;

        >i {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
        }

        &.router-link-active {
            color: $primary-color;
        }

        &.item-0 {
            i {
                @include bg-image('page');
            }
            &.router-link-active {
                i {
                    @include bg-image('page2');
                }
            }
        }

        &.item-1 {
            i {
                @include bg-image('shop');
            }
            &.router-link-active {
                i {
                    @include bg-image('shop2');
                }
            }
        }

        &.item-2 {
            i {
                @include bg-image('trading');
            }
            &.router-link-active {
                i {
                    @include bg-image('trading2');
                }
            }
        }

        &.item-3 {
            i {
                @include bg-image('money');
            }
            &.router-link-active {
                i {
                    @include bg-image('money2');
                }
            }
        }

        &.item-4 {
            i {
                @include bg-image('mine');
            }
            &.router-link-active {
                i {
                    @include bg-image('mine2');
                }
            }
        }






    }

  }
</style>
