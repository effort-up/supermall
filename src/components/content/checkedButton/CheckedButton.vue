<template>
  <div class="button" :class="{check:isChecked}" @click="checkClick" >
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>
<script>
export default {
  name: 'CheckedButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
    index: {
      type: String
    }
  },
  methods: {
    checkClick() {
   ///this.isChecked = !this.isChecked   //直接改变props中的内容  虽然能够改变勾选的状态，但浏览器会报错
    this.$emit('changeIsChecked')
      
    }
  }
}
</script>
<style scoped>
  .button{
    width: 15px;
    height: 15px;
    margin-right: 5px;
    border-radius: 50%;
    border: 1px solid #aaa;
  }
  .button img{
    width: 100%;
    height: 100%;
  }
  .check{
    background-color: red;
    border: 1px solid red;
  }
</style>