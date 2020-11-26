import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './vuex/index'

//导入解决在移动端300ms延迟的插件
import FastClick from 'fastclick'

//导入图片懒加载的插件
import VueLazyload from 'vue-lazyload'

//自己创建的toast插件
import toast from 'components/common/toast'

//阻止启动生产消息，常用作指令。
Vue.config.productionTip = false
Vue.use(toast)
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/lazyload.png')
})


FastClick.attach(document.body)

/*
  默认 $bus是空的，所以不能用来做事件总线，但是我们可以往vue的原型中加一个$bus，并且赋值为vue实例
  往vue的原型中加$bus,那么所有的组件都可以使用$bus
  而赋值为vue实例，那么$bus就可以监听事件
*/
Vue.prototype.$bus = new Vue()   

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
