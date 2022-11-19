//引入封装的请求服务
import { GET, POST } from '@/services/request.js'

const product = {
  ProductIndex(data = {})
  {
    return GET({
      url: '/product/product/index',
      params: data
    })
  },
  ProductInfo(data = {})
  {
    return POST({
      url: '/product/product/info',
      params: data
    })
  },
  ProductCollection(data = {})
  {
    return POST({
      url: '/product/product/collection',
      params: data
    })
  },
  ProductCancel(data = {})
  {
    return POST({
      url: '/product/product/cencel',
      params: data
    })
  },
}

export default product