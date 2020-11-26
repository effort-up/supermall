
<template>
  <div class="profile">
    <scroll class="content">
      <user-info><div>我的档案</div></user-info>
      <info></info>
      <other></other>
      <div class="none">
        <img src="~assets/img/profile/message.svg" alt="">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <img src="~assets/img/profile/vip.svg" alt="">
        <img src="~assets/img/profile/cart.svg" alt="">
        <img src="~assets/img/profile/shopping.svg" alt="">
      </div>
    </scroll>
  </div>
</template>
<script>

import UserInfo from './childcomps/UserInfo'
import Info from './childcomps/Info'
import Other from './childcomps/Other'
import Scroll from 'components/common/better-scroll/Scroll.vue'


export default {
  name: 'Profile',
  components: {
    UserInfo,
    Info,
    Other,
    Scroll

  }
}
</script>
<style  scoped>
  .profile{
    height: 100vh;
  }
  .content{
    height: calc(100% - 49px);
    overflow: hidden;
  }
  .content img {
    width: 20px;
    height: 20px;
  }
  .none{
    display: none;
  }
</style>