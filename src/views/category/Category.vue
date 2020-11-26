<template>
  <div class="category">
    <nav-bar class="category-nav">
       <template v-slot:center>
        <h2>商品分类</h2>
      </template>
    </nav-bar>
    <scroll class="content">
      <left-nav :list='list' class="left-nav"></left-nav>
    </scroll>
  </div>
</template>
<script>

import LeftNav from './childcomps/LeftNav'

import NavBar from 'components/common/nav-bar/NavBar'
import Scroll from 'components/common/better-scroll/Scroll.vue'

import {getCategoryData, getSubcategoryData} from 'network/category.js'



export default {
  name: 'Category',
  components: {
    NavBar,
    LeftNav,
    Scroll,
  },
  data() {
    return {
      list: [],
      maitKey: null 
    }
  },
  created() {
    getCategoryData().then(res => {
      console.log(res) 
      const data =  res.data.category 
      this.list  = data.list
      this.maitKey = data.list[0].maitKey 
      //res.data.category.list
      //res.data.category.list.title   正在流行
    })
    getSubcategoryData(this.maitKey).then(res => {
      console.log(res);
    })

    
  },
  
}
</script>
<style scoped>
    .category{
      position: relative;
      height: 100vh;
    }
   .category-nav{
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    /* height: 3000px; */
  }
  /* .left-nav{
    position: absolute;
    left: 0;
  } */

</style>