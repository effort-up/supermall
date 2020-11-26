<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="desc-info">
      <div class="before"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="after"></div>
    </div>
    <div class="detailImg-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="img-warpper">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" class="detail-img" @load="imgLoad">
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailGoodsInfo',
  data() {
    return {
      counter: 0,
      imgLength: 0
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
    //  this.$emit('imgLoad')
     this.counter += 1
      if(this.counter == this.imgLength-1){
        this.$emit('imgLoad')
      }
    }
  },
  //监听
  watch: {
    //监听props中的detailInfo对象
     detailInfo() {
      this.imgLength = this.detailInfo.detailImage[0].list.length
      //this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>
<style scoped>
  .goods-info{
    padding-bottom: 30px;
    box-shadow: 0 2px 2px rgba(100, 100, 100, .2);
  }
  .desc-info{
    padding: 20px 10px;
  }
  .before , .after{
    height: 1px;
    width: 90px;
    background-color:  #999;
    margin: 10px 0;
    position: relative;
  }
  .after{
    height: 2px;
    float: right;
  }
  .before::before , .after::after{
    content: ' ';
    width: 5px;
    height: 5px;
    background-color: #333;
    position: absolute;
    bottom: 0;
  }
  .after::after{
     content: ' ';
    width: 5px;
    height: 5px;
    background-color: #333;
    position: absolute;
    bottom: 0;
    left: 90px;
  }
  .desc{
    padding: 0 5px;
    font-size: 14px;
  }
  .img-warpper{
    margin-top: 20px;
  }
  .detail-img{
    width: 100%;

  }
</style>