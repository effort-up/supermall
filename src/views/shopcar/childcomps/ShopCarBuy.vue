<template>
  <div class="bottom-warpper">
    <div class="all-checked">
      <checked-button class="button" :class="{active: allSelected}" @changeIsChecked="changeSelected"></checked-button>
      <span>全选</span>
    </div>
    <div class="price">
      <div>合计: ￥{{totalPrice}}</div>
    </div>
    <div class='pay' @click="pay">结算({{number}})</div>
  </div>
</template>
<script>
import CheckedButton from 'components/content/checkedButton/CheckedButton.vue'

export default {

  naem: 'ShopCarBuy', 
  components: {
    CheckedButton 
  },
  computed: {
    totalPrice: function() {
      return this.$store.state.shopCarList.filter(n => n.checked == true)
              .reduce((preValue,n) => {
                return preValue + n.price * n.counter
              },0).toFixed(2)
    },
    number: function() {
      return this.$store.state.shopCarList.filter(n => n.checked == true).length
    },
    allSelected() {
      if(this.$store.state.shopCarList.length == 0) return false
      return !this.$store.state.shopCarList.find(item => !item.checked)
    }
  },
  methods: {
    changeSelected() {
      
        if(this.allSelected) {
          this.$store.state.shopCarList.forEach(element => {
            element.checked = false
          })
        }else{
           this.$store.state.shopCarList.forEach(element => {
            element.checked = true
          })
        }
      
    },
    pay() {
      this.$toast.show('请选择商品',2000)
    }
  }
}
</script>
<style  scoped>
  .bottom-warpper{
    height: 40px;
    display: flex;
    font-size: 14px;
  }
  .all-checked{
    display: flex;
    height: 40px;
    width: 50px;
    padding-top: 17px;
    margin-left: 10px;
    margin-right: 20px;
  }
  .price{
    height: 40px;
    padding-top: 15px;
    flex: 1;
  }
  .pay{
    height: 30px;
    width: 80px;
    background-color: orangered;
    font-size: 16px;
    color: #fff;
    margin: 5px;
    text-align: center;
    line-height: 30px;
    border: 0;
    border-radius: 20px;
    
  }
  .active{
    background-color: red;
    border: 1px solid red;
  }
</style> 