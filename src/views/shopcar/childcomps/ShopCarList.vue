<template>
  <div class="car-list">
    <shop-car-list-item v-for="(item,index) in shopCarList" :key="index"
                      :list-item='item'></shop-car-list-item>
  </div>
</template>
<script>

import ShopCarListItem from './ShopCarListItem.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'ShopCarList',
  components: {
    ShopCarListItem 
  },
  computed: {
    ...mapGetters({
      shopCarList: 'shopCarList'      
    })
  }
}
</script>
<style scoped>

</style>