<template>
  <div>
    <other-item v-for="(item,index) in other" :key="index" :info='item'></other-item>
  </div>
</template>
<script>
import OtherItem from './OtherItem'

export default {
  name: 'Other',
  components: {
    OtherItem,
  },
  data() {
    return {
      other: [
        {title:'我的消息',img:"/img/message.9948ca06.svg"},
        {title:'积分商城',img:"/img/pointer.71eb1cd2.svg"},
        {title:'会员卡',img:"/img/vip.c9cdc9ff.svg"},
        {title:'我的购物车',img:"/img/cart.0103a021.svg"},
        {title:'下载购物APP',img:"/img/shopping.7354bae5.svg"}, // /img/shopping.7354bae5.svg
      ]
    }
  }
}
</script>
<style scoped>

</style>