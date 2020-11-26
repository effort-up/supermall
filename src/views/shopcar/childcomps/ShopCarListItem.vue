<template>
  <div class="car-item">
    <checked-button class="checked" :is-checked='listItem.checked' :index='listItem.iid' @changeIsChecked='changeIsChecked'></checked-button>
    <img :src="listItem.img" alt="商品图片">
    <div class="goods-info">
      <div class="store">{{listItem.store}}</div>
      <div class="title">{{listItem.title}}</div>
      <div class="price-info">
        <span class="price">￥{{listItem.price}}</span>
        <span class="number">x{{listItem.counter}}</span>
      </div>
    </div>
  </div>
</template>
<script>

import CheckedButton from 'components/content/checkedButton/CheckedButton.vue'

export default {
  naem: 'ShopCarListItem',
  components: {
    CheckedButton
  },
  props: {
    listItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    changeIsChecked() {
      this.listItem.checked = !this.listItem.checked
    }
  }
}
</script>
<style scoped>
  .car-item{
    width: 100%; 
    height: 120px;
    display: flex;
    padding: 10px 0 10px 10px;

   box-shadow: 0 1px 2px rgba(100, 100, 100, .2);
  }
  .checked{
    position: relative;
    top: 40%;
 
  }
  .car-item img{
    height: 100px;
    border-radius: 5px;
  }
  .goods-info{
    width: 70%;
    margin-left: 10px;
  }
  .title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
    font-size: 14px;
  }
  .store{
    margin-bottom: 10px;
    font-weight: 700;
  }
  .price-info{
    position: relative;
    top: 30px;
  }
  .price{
    color: orangered;
  }
  .number{
    float: right;
  }
</style>