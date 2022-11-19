// 导入组件
import index from '@/components/business/category/index'
import info from '@/components/business/category/info'

// 构建子路由
const Category = [
  {
    path: 'category/index',
    name: 'CategoryIndex',
    component: index
  },
  {
    path: 'category/info',
    name: 'CategoryInfo',
    component: info
  },
]

export default Category