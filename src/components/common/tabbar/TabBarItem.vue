<template>
  <!-- 在TabBaritem 里添加属性和监听，只需要添加一次， -->
  <div class="tab-bar-item" @click="itemClick">
    <!-- 在插槽的外围添加div包裹插槽，在外围div里添加属性和监听
          因为插槽在渲染时，会被替换掉，如果直接在插槽中添加属性或监听，可能直接被替换掉，
     -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
      
    }
  },
  // props 从父组件那里传递来的数据
  props: {
    // 动态求得地址
    path: {
      type: String
    },
    // 动态求得活跃颜色
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  },
  computed: {
    isActive() {
      // 判断当前活跃路由的导航是否包含父组件中传来的导航，不包含则结果为-1，
     return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>
<style scoped>
  .tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.tab-bar-item{
   flex: 1;
   font-size: 14px;
}
/* .active{
  color: red;
} */
</style>