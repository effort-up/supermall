export default {
  //官方推荐我们在mutations中的函数只做单一的功能
    // addCarList(state,payload){
    //   let oldProduct = null
    //   for(let item of state.shopCarList){
    //    if(item.iid === payload.iid){
    //      oldProduct = item
    //    }
    //  }
    //   //通过oldProduct是否有值来判断是否添加的是重复的商品，并做出不同的处理
    //   //这里做了两种操作，一个是加一，一个是添加商品到数组
    //   if(oldProduct){
    //     oldProduct.counter += 1
    //   }else{
    //     payload.counter = 1
    //     state.shopCarList.push(payload)
    //   }
       
    // }
    //重复商品数量加一
    addCounter(state,payload){
      payload.counter += 1
    },
    //新商品添加到购物车数组中去
    addCar(state,payload){
      payload.checked = true
      payload.counter = 1
      state.shopCarList.push(payload)
    },
}