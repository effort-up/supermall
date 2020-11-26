<template>
  <div v-if="Object.keys(comments).length !== 0">
    <div class="top">
      <div class="left">用户评价</div>
      <div class="right">更多</div>
    </div>
    <div class="comments">
      <div class="user">
        <span class="head">
          <img :src="comments.user.avatar" alt="">
        </span>
        <span class="name">{{comments.user.uname}}</span>
      </div>
      <div class="comment">{{comments.content}}</div>
      <span class="date">{{comments.created | showDtae}}</span>
      <span>{{comments.style}}</span>
      <div class="comment-img">
        <img :src="item" v-for="(item,index) in comments.images" :key="index" @load="commentsImgLoad">
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from 'common/utils.js'
export default {
  name: 'DetailComments',
  props: {
    comments: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDtae(value){
      let data = new Date(value *1000)
      //2.将date格式化
      return formatDate(data,'yyyy-MM-dd')
    }
  },
  methods: {
    commentsImgLoad() {
      this.$emit('commentsImgLoad')
    }
  }
  // mounted() {
  //   setTimeout(() => {
  //     if(this.comments.created){
  //     let data = new Date(this.comments.created *1000)
  //     this.date  = formatDate(data,'yyyy-MM-dd')
  //   }
  //   },1000)
     
  // }
}
</script>
<style scoped>
  .top{
    padding-top: 20px;
    height: 80px;
    line-height: 40px;
    padding-bottom: 20px;
    /* box-shadow: 0 2px 5px rgba(100, 100, 100, .2); */
    /* margin-bottom: 10px; */
  }
  .left{
    font-size: 18px;
  }
  .comments{
    padding-bottom: 20px;
    box-shadow:0 2px 5px rgba(100, 100, 100, .2); 
  }
  .head img{
    width: 40px;
    height: 40px;
    border: 1px solid rgba(100, 100, 100, .1);
    border-radius: 50%;
    margin-right: 10px;
  }
  .name{
    position: relative;
    top: -13px;
  }
  .comment{
    margin: 15px 0;
  
  }
  .date{
    margin-right: 10px;
  }
  .comment-img{
    margin-top: 10px;
  }
  .comment-img img{
    width: 60px;
    height: 60px;
  }
</style>