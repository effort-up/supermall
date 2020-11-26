<template>
  <div>
    <nav-bar>
      <div slot="left" class="nav-bar-left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center"   class="nav-bar-center">
        <div v-for="(item,index) in title" :key=index
          @click="titleClick(index)"
          :class="{titleActive: currentIndex === index}"
          class="title-item" >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/nav-bar/NavBar'
export default {
  components: { NavBar },
  name: 'DetailNavBar',
  commponents: {
    NavBar
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    back() {
      this.$router.back()
    }
  }
  
}
</script>
<style scoped>
  .nav-bar-left img{
    margin-top: 10px;
  }
  .nav-bar-center{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .titleActive{
    color: pink;
  }
</style>