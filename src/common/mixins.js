import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop.vue'

//封装 事件总线（监听图片的加载）
export  const mixin = {
  data() {
    return {
      IMGLOAD: null
    }
  },
  mounted() {
    const refresh = debounce( this.$refs.scroll && this.$refs.scroll.refresh,100)
    this.IMGLOAD = () => { refresh() }
    this.$bus.$on('itemImgLoad',this.IMGLOAD())
    //console.log('我是混入的内容')
  }
} 

//封装返回顶部
export const backTopMIxin = {
  data() {
    return {
      isShow: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    topClick() {
      //拿到scroll组件，并且调用其组件中scrollTo()方法，
      //功能放回顶部
      this.$refs.scroll.scrollTo(0,0,500)
    },
  }
}