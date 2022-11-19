// 导入封装的请求服务
import {POST, UPLOAD} from '@/services/request.js'

// 导出后台接口
const base = {
  HomeIndex(data = {}) {
    return POST({
      url: '/index/index',
      params: data
    })
  },
  HomeAbout(data = {}) {
    return POST({
      url: '/index/about',
      params: data
    })
  }
}

export default base