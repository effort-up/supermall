<template>
  <div class="nav">
    <div class="top"><slot></slot></div>
    <div class="user">
      <div class="photo">
        <img src="~assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="register">
        <div class="name" @click="registerClick">{{name}}</div>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg" alt="">
          <span>暂无绑定手机号</span>
        </div>
      </div>
      <div class="left">
        <img src="~assets/img/profile/left.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  props: {
    name: {
      type: String,
      default: '登录/注册'
    }
  },
  methods: {
    registerClick() {

    }
  }
}
</script>
<style scoped>
  .nav{
    background-color: var(--color-tint);
    color:#fff;
    height: 100px;
    position: relative;
  }
  .top{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
  }
  .user{
    display: flex;
    position: absolute;
    bottom: 6%;
    margin-left: 20px;
    width: 100%;

  }
  .photo img{
    width: 60px;
    height: 60px;
  }
  .register{
    margin-top: 15px;
    margin-left: 15px;
  }
  .phone {
    font-size: 12px;
    margin-top: 5px;
  }
  .phone img{
    width: 15px;
    height: 15px;
  }
  .phone span {
    position: relative;
    top: -3px;
  }
  .left{
    position: absolute;
    right: 30px;
    bottom: 20%;
  }
  .left img{
    width: 25px;
    height: 25px;
  }
</style>