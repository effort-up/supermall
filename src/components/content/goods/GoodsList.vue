<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goodsList" :key='index'
                      :goods-list-item='item' class="item">

    </goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'


export default {
  components: { GoodsListItem },
  name: 'GoodsList',
  commponnents: {
    GoodsListItem 
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style  scoped>
  .goods-list{
    display: flex;
    flex-wrap: wrap;
    flex-grow: 0;
    justify-content: space-around;
  }
  .goods-list .item{
    width: 48%;
    padding: 2px;
  }
 
</style>