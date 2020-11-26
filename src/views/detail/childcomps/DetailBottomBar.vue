<template>
  <div class="bottom-bar">
    <div class="call">
      <img src="~assets/img/detail/call.png" alt="">
      <div>客服</div>
    </div>
    <div class="stroe">
      <img src="~assets/img/detail/stroe.png" alt="">
      <div>店铺</div>
    </div>
    <div class="collect">
      <img src="~assets/img/detail/collect.png" alt="">
      <div>收藏</div>
    </div>
    <div class="car" @click="addToCar">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>
<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCar() {
      this.$emit('addCar')
    } 
  }
}
</script>
<style scoped>
  .bottom-bar{
    height: 49px;
    width: 100%;
    position: relative;
    background-color: #fff;
    font-size: 12px;
    display: flex;
  }
  .call,.stroe,.collect{
    height: 100%;
    width: 16.5%;
    text-align: center;
  }
  .call img ,.stroe img,.collect img{
    height: 22px;
    margin: 2px 0;
  }
  .car{
    width: 25%;
    background-color: yellow;
    color: #000;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
  }
  .buy{
    width: 25%;
    background-color:rgb(240, 82, 82) ;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
    color: #fff;
  }
</style>