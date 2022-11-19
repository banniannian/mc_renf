//引入封装的请求服务
import { POST, UPLOAD } from '@/services/request.js'

//导出接口
const base = {
  register(data = {})
  {
    return POST({
      // /api/business/base/register
      url: '/business/base/register',
      params: data
    })
  },
  login(data = {})
  {
    return POST({
      url: '/business/base/login',
      params: data
    })
  },
  check(data = {})
  {
    return POST({
      url: '/business/base/check',
      params: data
    })
  },
  email(data = {})
  {
    return POST({
      url: '/business/base/email',
      params: data
    })
  },
  profile(data = {})
  {
    return UPLOAD({
      url: '/business/base/profile',
      params: data
    })
  },
  sendems(data = {})
  {
    return POST({
      url: '/business/base/sendems',
      params: data
    })
  },
  checkems(data = {})
  {
    return POST({
      url: '/business/base/checkems',
      params: data
    })
  }
}

export default base