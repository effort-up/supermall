<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
// npm install better-scroll --save
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {  //从Home组件里获取值，来决定是否监听滚动
      type: Number,
      default: 0
    },
    pullUpLoad: { //从Home组件里获取值，来决定是否监听上拉
      type: Boolean,
      dafault: false
    }
  },
  //生命周期函数
  mounted() {
    /*
      默认情况下BScroll是不可以实时的监听滚动的位置
      probe 侦测
      0,1都是不侦测实时的位置
      2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      3：只要是滚动，都侦测
    */
   this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      probeType: this.probeType,  //动态决定是否监听滚动
      pullUpLoad: this.pullUpLoad,//动态决定是否监听上拉
    })
    // 监听事件('事件类型'，函数), 这里监听滚动事件，
    this.scroll.on('scroll',(position) => {
     // console.log(position)
      this.$emit('scroll',position)
    })

    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })

    //回到顶部
    //this.scroll.scrollTop(0,0,time)
    //结束上一次上拉加载事件，因为默认情况下，上拉加载事件只能执行一次，所以我们要把上一次结后，才能重新上拉加载
    //this.scroll.finishPullUp()
    //重新计算高度
    //this.scroll.refresh()
  },
  //把上面scroll插件本身的方法封装成组件的方法，方便Home组件使用时简便
  methods: {
    scrollTo(a,b,time=300) {
      this.scroll.scrollTo(a,b,time)
    },
    finishPullUp() {
     this.scrollTo && this.scroll.finishPullUp()
    },
    /*
      BUG：有时滑动页面，会出现卡住的现象，不能往下滑动了
      Better-Scroll在决定有多少区域可以滚动时，时根据scrollHeight属性来决定的
      scroolHeight属性是根据Better-Scroll中content中的子组件的高度决定的
      但是现实是，当Better-Scroll开始计算scroolHeight时，content中的item的p标签和span标签加载出来了，但是图片还没有加载出来(图片加载速度慢)
      所以计算高度时，只计算了由p和span标签撑起高度的item组件，如每个item组件的高度为100，30个就是3000
      过了一会，图片加载出来了，每个item组件的高度被撑起来了，为300，那么30个就是9000
      但是Better-Scroll不会重新计算高度，所以可滑动高度就为3000，但content的高度为9000，就会出现不能滑动的BUG
      解决：每次图片加载完成，都重新计算高度
    */
    refresh() {
      //console.log('---')
     this.scrollTo && this.scroll.refresh()
    },
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
  }
}
</script>
<style scoped>

</style>