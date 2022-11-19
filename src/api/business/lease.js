//引入封装的请求服务
import {GET, POST, UPLOAD } from '@/services/request.js'

//导出接口
const lease = {
  LeaseIndex(data = {})
  {
    return GET({
      url: '/business/lease/index',
      params: data
    })
  },
  LeaseAdd(data = {})
  {
    return UPLOAD({
      url: '/business/lease/add',
      params: data
    })
  },
  LeaseInfo(data = {})
  {
    return POST({
      url: '/business/lease/info',
      params: data
    })
  },
  LeaseExpress(data = {})
  {
    return POST({
      url: '/business/lease/express',
      params: data
    })
  },
  LeaseReceipt(data = {})
  {
    return POST({
      url: '/business/lease/receipt',
      params: data
    })
  },
  LeaseRecovery(data = {})
  {
    return POST({
      url: '/business/lease/recovery',
      params: data
    })
  },
  LeaseExplist(data = {})
  {
    return POST({
      url: '/business/lease/explist',
      params: data
    })
  },
  LeaseComment(data = {})
  {
    return POST({
      url: '/business/lease/comment',
      params: data
    })
  },
}

export default lease