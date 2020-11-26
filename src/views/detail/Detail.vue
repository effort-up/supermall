<template>
  <div  id="detail">
    <detail-nav-bar :title="['商品','参数','评论','推荐']" class="detail-nav" 
                    @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType='3' @scroll="scrollClick">
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-store-info :shop-info='shopInfo'></detail-store-info>
      <detail-goods-info :detail-info='detailInfo' @imgLoad='imgLoad'></detail-goods-info>
      <detail-param-info :params="params" ref="params"></detail-param-info>
      <detail-comments :comments="comments" ref="comments" @commentsImgLoad='commentsImgLoad'></detail-comments>
      <goods-list :goods-list='recommend' ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCar='addToCar'></detail-bottom-bar>
    <back-top @click.native="topClick" v-show="isShow"></back-top>
  </div>
</template>
<script>
import DetailNavBar from './childcomps/DetailNavBar'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailStoreInfo from './childcomps/DetailStoreInfo'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailComments from './childcomps/DetailComments'
import DetailBottomBar from './childcomps/DetailBottomBar'


import Scroll from 'components/common/better-scroll/Scroll' 
import GoodsList from 'components/content/goods/GoodsList.vue'


import {mixin,backTopMIxin} from 'common/mixins'
import {debounce} from 'common/utils'

import {Detail,Goods,Store,Params,getRecommend} from 'network/detail.js'



export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailStoreInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComments,
    DetailBottomBar,
    Scroll,
    GoodsList,


  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      params: {},
      comments: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow: false,

    }
  },
  mixins:[mixin,backTopMIxin],
  created() {
    //console.log(this.$route.params.iid)
    //1.请求iid数据
    this.iid = this.$route.params.iid

    //2.请求详情数据
    Detail(this.iid).then(res => {
      //console.log(res)
      const data = res.result
      //顶部轮播图
      this.topImages = data.itemInfo.topImages
      //请求商品的基本信息
      this.goods = new Goods(data.columns,data.itemInfo,data.shopInfo.services)
      //请求店铺信息
      this.shopInfo = new Store(data.shopInfo)
      //下方详情图片
      this.detailInfo = data.detailInfo
      //衣服尺寸和生产地址、材料等
      this.params = new Params(data.itemParams)
      //评论信息
      if(data.rate.cRate !== 0){
        this.comments = data.rate.list[0]
      }
    })

    //3.请求推荐数据
    getRecommend().then(res => {
     // console.log(res)
     // console.log(res.data.list)
      this.recommend = res.data.list
    })

    //4.
    this.getThemeTopY = debounce(() => {
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    },300)
  },
  // destroyed() {
  //   this.$bus.$off('itemImgLoad',this.IMGLOAD)
  // },
  mounted() {
    // const refresh = debounce( this.$refs.scroll && this.$refs.scroll.refresh,100)
    // this.$bus.$on('detailImgLoad', () => {
    //   refresh()
    // })
    
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()

    /*
      当图片加载完成后，往themeTopYs数组中加对应组件的垂直偏移量
    */
    this.themeTopYs = []
    this.themeTopYs.push(0)
    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    
    //console.log(this.themeTopYs)
     
    },
    commentsImgLoad() {
     // console.log('++++')
      this.$refs.scroll.refresh()
    },
    //监听setoffTop
    titleClick(index) {
       //console.log(this.themeTopYs) 
       //console.log(index)
       this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    scrollClick(position) {
      //1.获取滚动的 y值
      const positionY = -position.y
      //2.positionY 与 themeTopYs 中的值进行比较，看看滑动到哪个区域，判断是否需要改变nav-bar的状态
      //0, 2947, 3898, 4139,
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        if((this.currentIndex != i)
         &&(
           (i< length && positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
           ||
           (i == length-1 &&  positionY >=this.themeTopYs[i])
        )){
          this.currentIndex = i
          //console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //3.返回顶部的显示
       this.isShow = (-position.y) > 2000
    },
    addToCar() {
      //1.拿到购物车所需的商品数据
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title 
      product.price = this.goods.lowNowPrice
      product.iid = this.iid
      product.store = this.shopInfo.name

      //2.把数据添加到vuex中
       //this.$store.commit('addCarList',product)
       this.$store.dispatch('addCarList',product).then(res => {
         //console.log(res)
        //  this.message = res
        //  this.toastShow = true
        //  setTimeout(() => {
        //    this.message = ''
        //    this.toastShow = false
        //  }, 2000);
        
        //console.log(this.$toast)
        this.$toast.show(res,2000)
       })
       
    }
  }
}
</script>
<style  scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>