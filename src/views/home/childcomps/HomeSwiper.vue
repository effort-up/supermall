<template>
  <swiper ref="swiper" v-if="banners.length">
    <!-- 下面有个index被删除了，记得加上 -->
    <swiper-item v-for="(item,index) in banners" v-bind:key="index" >   
      <a :href="item.link">
        <!-- @load当图片加载出来后，才会触发 -->
        <img :src="item.image" @load="swiperImgLoad" >
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
    	return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
     swiperImgLoad() {
       //只发射一次图片加载完成事件
       if(!this.isLoad){
         this.$emit('swiperImgLoad')
         this.isLoad = true
       }
       
     }
    }
  }
</script>

<style scoped>

</style>