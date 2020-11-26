import {request} from './request'

export function HomeMultidata() {  
  return request({
    url: '/home/multidata'
  })
}

export function HomeProductData(type,page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}