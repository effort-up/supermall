<template>
  <div class="shopCar">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{$store.state.shopCarList.length}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <shop-car-list></shop-car-list>
    </scroll> 
    <shop-car-buy class="buy"></shop-car-buy>
  </div>
</template>
<script>
import NavBar from 'components/common/nav-bar/NavBar.vue'
import Scroll from 'components/common/better-scroll/Scroll.vue'


import ShopCarList from './childcomps/ShopCarList'
import ShopCarBuy from './childcomps/ShopCarBuy.vue'

import {mapGetters} from 'vuex'



export default {
  name: 'Shopcar',
  components: { 
    NavBar,
    ShopCarList,
    ShopCarBuy,
    Scroll
 
       
  },
  computed: {
    // length() {
    //   this.$store.getters.getCarLength
    // }  
    //vuex getters 的第一种写法
    //...mapGetters(['getCarLength','shopCarList'])
    
    //第二种写法，起一个别名
    ...mapGetters({
      length: 'getCarLength',
      shopCarList: 'shopCarList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
  .shopCar{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .buy{
    height: 40px;
    width: 100%;
    background-color: rgb(240, 240, 240);
    position: relative;
  }
</style>