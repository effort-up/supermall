<template>
  <div class="recommends">
    <div class="recommends-item" v-for="(item,index) in recommends" v-bind:key="index">
      <a :href="item.link">
        <img :src="item.image" @load="RecommendsImgLoad">
        {{item.title}}
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Recommends',
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    RecommendsImgLoad() {
      if(!this.isLoad) {
        this.$emit('RecommendsImgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
<style  scoped>
  .recommends{
    display: flex;
    width: 100%;
    padding: 10px 0 15px;
    text-align: center;
    border-bottom: 10px solid rgb(245, 243, 243);
  }
  .recommends-item{
    flex: auto;
    overflow: hidden;
   
  }
  .recommends-item img{
    width: 80%;
    margin-bottom: 5px;
  }
</style>