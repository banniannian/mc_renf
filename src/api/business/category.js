//引入封装的请求服务
import { GET, POST } from '@/services/request.js'

const category = {
  CategoryIndex(data = {})
  {
    return GET({
      url: '/business/category/index',
      params: data
    })
  },
  CategoryInfo(data = {})
  {
    return POST({
      url: '/business/category/info',
      params: data
    })
  },
  CollectionConfirm(data = {})
  {
    return POST({
      url: '/business/category/collection',
      params: data
    })
  },
  CollectionCancel(data = {})
  {
    return POST({
      url: '/business/category/cancel',
      params: data
    })
  },
}

export default category