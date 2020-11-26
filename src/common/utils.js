//防抖函数，第一个参数传入函数，第二个参数传入延时时间
export function debounce(func,delay) {
  //定义一个timer变量
  let timer = null
  //返回一个新的函数，让调用防抖函数的位置执行返回的新的函数
  //...args 当传入多个参数，而我们有不知道有多少个参数时，使用普通方法就无法设置参数的数量，让其一一对应，所以可以使用...(扩展运算符)来定义参数
  return function(...args) {
    //第一次timer为null，条件为假，则不清除定时器
    if(timer) clearTimeout(timer)
    //给timer赋值为一个定时器，，此时timer就有值了，当防抖函数再次被调用时，上面的条件判断为真，就会清除定时器
    timer = setTimeout(() => {
      func.apply(this,args)  //在延迟的时间内，如果防抖函数没有被再次调用，则执行此语句
    },delay)
  }
}



//时间格式器
/** 
 * 时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
export function formatDate(date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };

  // 遍历这个对象
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      // console.log(`${k}`)
      //console.log(RegExp.$1)
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00'+str).substr(str.length);
}
/*
  let TimeNow = 1514374627*1000
  let newTime = new Date(TimeNow)
  formatDate(newTime,'yyyy-MM-dd hh:mm')   //2017-12-27 19:37
*/