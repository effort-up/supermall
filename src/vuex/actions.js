export default {
  
    addCarList(context,payload){
     return new Promise((resolve,reject) => {
      let oldProduct = null
      for(let item of context.state.shopCarList){
       if(item.iid === payload.iid){
         oldProduct = item
       }
      }
      if(oldProduct){
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量 + 1')
      }else{
        context.commit('addCar',payload)
        resolve('加入购物车成功')
      }
     })
    }
  

}