<template>
  <div class="params-warpper">
    <table v-for="(table,inde) in params.size" :key="inde" class="table">
      <tr v-for="(tr,index) in table" :key='index'>
        <td v-for="(item,indey) in tr" :key="indey">{{item}}</td>
      </tr>
    </table>
    <table class="table infos">
      <tr v-for="(tr,index) in params.infos" :key="index">
        <td class="key">{{tr.key}}</td>
        <td class="value">{{tr.value}}</td>
      </tr>
    </table>
  </div> 
</template>
<script>
export default {
  name: 'DetailParamInfo',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  .params-warpper{
    margin-top: 20px;
    padding: 0 15px;
    padding-bottom: 20px;
    box-shadow: 0 3px 5px rgba(100, 100, 100, .2);
  }
  .table{
    width: 100%;
    border-collapse: collapse;
   
  }
  .table tr{
    height: 50px;
    line-height: 50px;
  }
  .table td{
     border-bottom: 1px solid rgba(100, 100, 100, .2);
  }
  .infos tr{
    height: 30px;
    line-height: 30px;
  }
  .key{
    width: 40px;
  }
  .value{
    color: var(--color-high-text);
    padding-left: 40px;
  }
</style>