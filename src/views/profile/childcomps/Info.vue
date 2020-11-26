<template>
  <div class="info">
    <div>
      <span class="number">{{money}}</span>
      <span>元</span>
      <div>我的余额</div>
    </div>
    <div class="border">
      <span class="number">{{number}}</span>
      <span>个</span>
      <div >我的优惠</div>
    </div>
    <div>
      <span class="number">{{integral}}</span>
      <span>分</span>
      <div>我的积分</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Info',
  props: {
    money: {
      type: Number,
      default: 0.00
    },
    number: {
      type: Number,
      default: 0
    },
    integral: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style scoped>
  .info{
    width: 100%;
    height: 70px;
    display: flex;
    box-shadow: 0 1px 3px rgba(145, 144, 144, 0.1);
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
    margin-bottom: 20px;

  }
  .info>div {
    flex: 1;
  }
  .info>div>div{
    margin-top: 5px;
  }
  .number{
    color: orangered;
    font-size: 20px;
  }
  .border{
    border-left: 1px solid rgb(214, 213, 213);
    border-right: 1px solid rgb(214, 213, 213);
  }
</style>