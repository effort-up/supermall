<template>
  <div class="item" @click="itemClick" :class="{active: isClick}">
    {{item.title}}
  </div>
</template>
<script>
export default {
  name: 'LeftNavItem',
  data() {
    return {
      isClick: false
    }
  },
  props: {
    item: Object,
    default() {
      return {}
    }
  },
  methods: {
    itemClick() {
      this.isClick = true
      this.$router.push('/subcategory/' + this.item.maitKey)
    }
  }
}
</script>
<style scoped>
  .item{
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
    color: #000;
  }
</style>