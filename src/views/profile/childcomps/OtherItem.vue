<template>
  <div class="warpper">
    <div><img :src="info.img"></div>
    <div><slot class="after">{{info.title}}</slot></div>
  </div>
</template>
<script>
export default {
  name: 'OtherItem',
  data() {
    return {
       img: '~' + this.info.img
    }
  },
  props: {
    info: {
      type: Object,

    }
  }
}
</script>
<style scoped>
  .warpper{
    display: flex;
    padding: 10px 0 10px 10px;
    border-top: 1px solid rgb(226, 224, 224);
    height: 40px;
    line-height: 30px;
    font-size: 14px;
  }
  .warpper img{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
</style>