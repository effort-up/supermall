import {request} from './request';

//iid
export function Detail(iid) {
  return request ({
    url: '/detail',
    params: {
      iid,
    } 
  })
}

//详情页推荐数据
export function getRecommend() {
  return request ({
    url: '/recommend'
  })
}

//商品基本数据的集合
export class Goods {
  constructor(columns,itemInfo,services) {
    this.title = itemInfo.title
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.lowNowPrice = itemInfo.lowNowPrice
    this.discountDesc = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.sales = columns[0]
    this.collect = columns[1]
    this.services = services
    this.servicesLast = services[services.length-1]

  }
}

//店铺信息的集合
export class Store{
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class Params{
  constructor(paramsInfo) {
    this.image = paramsInfo.info.images ? paramsInfo.info.images[0] : '';
    this.size = paramsInfo.rule.tables  //数组
    this.infos = paramsInfo.info.set
  }
}
