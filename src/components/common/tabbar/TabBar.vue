<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBar'
}
</script>
<style scoped>
  #tab-bar{
  display: flex;
  justify-content: space-around;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #f6f6f6;
  box-shadow: 0px -1px 10px rgba(0,0,0,0.2); 
}

</style>