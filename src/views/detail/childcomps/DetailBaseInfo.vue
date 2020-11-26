<template>
  <div v-if="Object.keys(goods).length !== 0">
    <div class="top">
      <div class="top-title">{{goods.title}}</div>
      <div class="top-price">
        <span class="newPrice">{{goods.newPrice}}</span>
        <span class="oldPrice">{{goods.oldPrice}}</span>
        <span class="discount">{{goods.discountDesc}}</span> 
      </div>
    </div>
    <div class="center" >
      <span>{{goods.sales}}</span>
      <span class="collect">{{goods.collect}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="bottom">
      <span v-for='index in goods.services.length-1' :key='index'>
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .top{
    padding-bottom: 20px;
  }
  .top-title {
    margin: 10px 0 12px;
    font-size: 18px;
    font-weight: bolder;
    color: #000;
    /* padding-bottom: 20px; */
  }
  .newPrice{
    font-size:18px;
    color: var(--color-high-text);
  }
  .oldPrice{
    margin: 0 8px;
    font-size: 11px;
    text-decoration: line-through;
  }
  .discount{
    background-color:red ;
    color: #fff;
    font-size: 10px;
    border: 1px solid red;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .center{
    padding-bottom: 5px;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .center span{
    padding: 0 5px;
    font-size: 13px;
    color: #999;
  }
  .center .collect{
    padding: 0 80px;
  }
  .bottom{
    display: flex;
    padding: 15px 5px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, .1);
  }
  .bottom span{
    flex: 1;
  }
  .bottom span img{
    width: 10px;
    height: 10px;
  }
</style>