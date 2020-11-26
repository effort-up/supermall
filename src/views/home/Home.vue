<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <h2>购物街</h2>
      </template>
      </nav-bar>
      <tab-control :title="['流行','新款','精选']" class="tabControl"
                      @tabBtn='tabBtn' ref="tabControl1"
                      v-show="isShowTabControl">
                      </tab-control>
      <!-- 设置ref属性，可以让下面通过$refs拿到对应的组件拿到 -->
      <scroll class="content" ref="scroll" 
              :probe-type='3' @scroll="scrollClick"
              :pull-up-load='true' @pullingUp='moreUp' > 
        <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad' ></home-swiper>
        
        <recommends-view :recommends='recommends' @RecommendsImgLoad='RecommendsImgLoad'></recommends-view>
        <feature-view></feature-view>
        <tab-control :title="['流行','新款','精选']" 
                      @tabBtn='tabBtn' ref="tabControl2"
                      >
                      </tab-control>
        <goods-list :goods-list="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="topClick" v-show="isShow"></back-top>
  </div>
</template>
<script>
import NavBar from 'components/common/nav-bar/NavBar'
import Scroll from 'components/common/better-scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'



import {mixin,backTopMIxin} from 'common/mixins'


import HomeSwiper from './childcomps/HomeSwiper'
import RecommendsView from './childcomps/RecommendsView'
import FeatureView from './childcomps/FeatureView.vue'


import {HomeMultidata, HomeProductData} from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendsView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      //result: null,
     banners: [],
     recommends: [],
     goods: {
       'pop': {page: 0, list: []},
       'new': {page: 0, list: []},
       'sell': {page: 0, list: []}
     },
     //代表当前tabControl的显示页面
     currentType: 'pop',
     //返回顶部的显示和隐藏
     
     isShowTabControl: false,
     offsetTop: 0,
     saveY: 0,
    }
  },
  mixins:[mixin,backTopMIxin],
  computed: {
    showGoods: function() {
      return this.goods[this.currentType].list
    }
  },
  // activated() {
  //   this.$refs.scroll.scrollTo(0,-1000,0)
  //   this.$refs.scroll.refresh()
  // },
  //当前页面被销毁时调用
  destroyed() {
       this.$bus.$off('itemImgLoad')  //销毁事件总线
    },
    //当前路由活跃时调用
  activated() {
    //console.log('activated')
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
       this.$refs.scroll.refresh()
    },
    //当前路由不活跃时调用
    deactivated() {
     // console.log('deactivated')
      this.saveY = this.$refs.scroll.getScrollY()
    },
  created() {  //生命周期函数
    //1.请求多个数据
    this.HomeMultidata()
    //2.请求商品信息
    this.HomeProductData('pop')
    this.HomeProductData('new')
    this.HomeProductData('sell')
  },
  mounted() {
     /*
      事件总线 $bus
        当某一个组件中某事件发生时，使用 this.$bus.$emit('aaa'，参数) 发射一个事件
        在另一个组件中使用 this.$bus.$on('aaa',回调函数(参数))，
        这样当第一个组件事件发生时，它通过事件总线发射了事件，在另一个组件中通过事件总线收到了要监听的事件已经发生了，然后进行处理
        这里要监听的组件是 Home -> GoodsList -> GoodsListItem 中每张图片加载完成的事件
        需要进行处理的组件是 Home -> better-scroll 使用this.$refs.scroll.refresh()重新计算高度
        但是 GoodsListItem 和 better-scroll 组件之间无法通信，我们通过Home来中转
        Home接收图片加载完成事件，Home通过this.$refs.scroll拿到better-scroll组件，调用其方法
    */
    //把防抖函数赋值给refresh
    //const refresh = debounce( this.$refs.scroll && this.$refs.scroll.refresh,100)
    //设置防抖函数的原因是因为每次图片加载完都会调用refresh()函数，图片加载的速度又很快，就会导致refresh()函数调用频繁，性能不好
    //this.imgLoad = () => { refresh() }
   //this.$bus.$on('homeImgLoad',itemImgLoad())
  // this.$bus.$on('itemImgLoad',this.imgLoad())
      //console.log(this.$refs.scroll)
    // this.$refs.scroll && this.$refs.scroll.refresh()
    /*
      这里调用防抖函数，每次图片加载完成后，都会调用这个函数，也就相当于调用防抖函数
      我们来到防抖函数内部，第一次图片加载完成后调用防抖函数，然后条件为假，进入了定时器环节
      当定时器执行的时间还没到时，第二次图片加载完成了，第二次调用了防抖函数，条件判断为真，清除了上次的定时器，然后定时器里未执行的语句也就不可能执行了
      重新给timer赋值了一个新的定时器，如果第三次图片加载的时间依旧小于定时器的时间，那么第二次的定时器也会被清除，如果图片加载时间大于定时器时间
      那么定时器里的语句就可以顺利执行，第三次图片加载完成后，调用的防抖函数里的timer是重新赋值为null的
      为什么加载时间小于延时，重新调用防抖函数时，timer不会被重新赋值？
        因为有定时器在引用timer，产生了闭包，timer的生命周期得到了延长，可以保留原值。而当定时器执行完后，timer失去去了引用，内存中timer的原有值就会被清除
    */
     
    
    //获取tabControl的offsetTop
    //所有组件都有一个属性$el，用于获取组件中的元素
    //offsetTop获取元素相对于其定位父元素的垂直偏移量
   // console.log(this.$refs.tabControl.$el.offsetTop)
  },
  
  methods: {
    /*
    *   事件触发的方法
    */
   //tabControl点击事件
    tabBtn(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break 
        case 2:
          this.currentType = 'sell'
          break    
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index  
    },
    
    //计算当scroll滚动大于2000时，让isShow为true
    scrollClick(position) {
      this.isShow = (-position.y) > 2000
      this.isShowTabControl = (-position.y) > this.offsetTop
      // this.$refs.scroll.refresh()
    },
    moreUp() {
      //请求下一页数据
      this.HomeProductData(this.currentType)
      //在数据请求完成后，调用完成上拉加载函数
      this.$refs.scroll.finishPullUp()
    },
    swiperImgLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    RecommendsImgLoad() {
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // isShowTabControl() {
    //   if(this.isShowTabControl <500){
    //     this.isShowTabControl = false
    //   }
    //},

    

    /*
    *   网络请求的方法
    */
    HomeMultidata() {
      HomeMultidata().then(res => {
      //console.log(res)
      //this.result = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      
    })
    },
    //请求页面商品数据
    HomeProductData(type) {
      const page = this.goods[type].page + 1  //为变量时，用[]的方式
       HomeProductData(type,page).then(res => {
         //console.log(res)
         this.goods[type].list.push(...res.data.list)
         this.goods[type].page += 1
    })
    }
  }
}
</script>
<style  scoped>
  #home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
 
  }
  .home-nav{
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
    /* position: fixed;
    left: 0; 
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .tabControl{
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    /* height: calc(100% - 49px - 44px);
    overflow: hidden; */
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
   
  }
</style>