<template>
  <div class="goods-list-item" @click="toDetail">
    <!-- 监听图片加载完成  v-lazy 懒加载-->
    <img v-lazy="showImg" @load="imgLoad">
    <div class="item-info">
      <p>{{goodsListItem.title}}</p>
      <span class="item-price">{{goodsListItem.orgPrice}}</span>
      <span class="item-cfav">{{goodsListItem.cfav}}</span>
      <span>人付款</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsListItem: {
      type: Object
    }
  },
  computed: {
    showImg() {
      return this.goodsListItem.image ||  this.goodsListItem.show.img
    }
  },
  methods: {
    imgLoad() {
      //GoodsListItem的图片监听在home和detail中都有用到，而且不希望detail中的图片加载完成后给home发射事件，
      //第一种方法，设置不同的路由条件，执行不同的事件
      // if(this.$route.path == '/home'){
      //   console.log('---')
      //   //事件总线 $bus
      //   this.$bus.$emit('homeImgLoad')
      // }else if (this.$route.path == '/detail/' + this.$route.params.iid){
      //   //console.log('detail')
      //   this.$bus.$emit('detailImgLoad')
      // }

      //第二种方法： mixins(混入)
      this.$bus.$emit('IMGLOAD')
      
    },
    toDetail() {
      this.$router.push('/detail/' + this.goodsListItem.iid)
    }
  }
}
</script>
<style  scoped>
  .goods-list-item{
    position: relative;
    padding-bottom: 40px;
    margin-bottom: 5px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .5);
    border-radius: 5px;
  }
  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }
  .item-info p{
    /* height: 40px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
    padding-bottom: 3px;
  }
  .item-price{
    color: var(--color-tint);
    margin-right: 5px;
  }
  .item-cfav{
    position: relative;
    padding-left: 15px;
  }
   
  /* .item-cfav::before{
    content: ' ';
    position:absolute;
    left: 0px;
    top: 0px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }  */
  /* .item-cfav::after{
    content: '人';
    position:absolute;
    display: flex;
    left: 30px;
    top: 0px;
    height: 14px;
    font-size: 14px;
    
  }  */
</style>