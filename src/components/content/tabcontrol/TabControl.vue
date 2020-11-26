<template>
  <div class="tab-control">
    <div class="tab-control-item" 
          v-for="(item,index) in title " :key="index"
          :class="{active: index === currentIndex}"
          @click='itemClick(index)' >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabControl',
  data() {   
    return {
      currentIndex: 0   //定义一个变量，来存储动态的tabControl的下标
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabBtn',index)
    }
  }
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item{
    flex: auto;
  }
  .active{
    color: var(--color-tint);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
    padding-bottom: 2px;
  }
</style>