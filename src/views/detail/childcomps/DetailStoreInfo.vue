<template>
  <div class="store">
    <div class="top">
      <img :src="shopInfo.shopLogo" >
      <h3>{{shopInfo.name}}</h3>
    </div>
    <div class="left">
      <div class="cSells">
        <div>{{shopInfo.cSells | cSellsFilters}}</div>
        <p>总销量</p>
      </div>
      <div class="cGoods">  
        <div>{{shopInfo.cGoods}}</div>
        <p>全部宝贝</p>
      </div>
    </div>
    <div class="right">
        <table>
          <tr v-for="(item,index) in this.shopInfo.score" :key='index'>
            <td>{{item.name}}</td>
            <td class="score-inactive" :class="{'score-active': item.isBetter}" >{{item.score}}</td>
            <td class="better-inactive" :class="{'better-active':item.isBetter}" ><span>{{item.isBetter ? "高" : "低"}}</span></td>
          </tr>
        </table>    
    </div>
    <div class="shop-bottom">
      <div>进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailStoreInfo',
  props:{
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
 filters: {
   cSellsFilters(value){
     if(value < 10000) {
      return value
     }else{
       return (value/10000).toFixed(1) + '万'
     }
   }
 }
}
</script>
<style  scoped>
  .store{
    padding-bottom: 20px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, .1);
  }
  .top{
    display: flex;
    padding: 30px 0 20px;

  }
  .top img {
    width: 60px;
    height: 60px;
    border: 1px solid #999;
    border-radius: 50%;
  }
  .top h3 {
    font-size: 18px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .left{
    width: 50%;
    display: flex;
    justify-content: space-around;
    color: #000;
    margin-bottom: 30px;
    border-right: 1px solid rgba(182, 179, 179,0.5);
    margin-top: 25px;
  }
  .cSells{
    text-align: center;
  }
  .cSells div{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    
  }
  .cGoods{
    text-align: center;
  }
  .cGoods div{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .right{
    display: flex;
    width: 50%;
    text-align: center;
    padding-left: 25px;
  }
  .right tr td{
    height: 20px;
    line-height: 30px;
    padding: 0 5px;
  }
  .score-inactive{
    color: green;
  }
  .score-active{
    color: red;
  }
  .better-inactive span{
    background-color: green;
    color: #fff;
  }
  .better-active span{
    background-color: red;
    color: #fff;
  }
  .shop-bottom{
    /* text-align: center; */
    margin-top:110px;
    /* position: relative; */
    padding: 0 30%;
    height: 30px;
  }
  .shop-bottom div{
    /* position: absolute;
    left: 40%;
    right: 40%;
    top: 0;
    bottom: 0; */
    height: 100%;
    text-align: center;
    color: #000;
    background-color: rgba(182, 179, 179,0.3);
    border-radius: 10px;
    padding: 5px 0;
    text-align: center;
  }  
</style>