<template>
  <div class="left-nav">
    <left-nav-item :item='iten' v-for="(iten,index) in list" :key="index" class="left-nav-item"></left-nav-item>
  </div> 
</template>
<script>
import LeftNavItem from './LeftNavItem'


export default {
  name: 'LeftNav',
  components: {
    LeftNavItem,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style scoped>
  .left-nav{
    width: 80px;
  
  }
</style>