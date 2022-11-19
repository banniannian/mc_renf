// 导入组件
import login from '@/components/business/base/login'; // 登录
import register from '@/components/business/base/register'; // 注册
import index from '@/components/business/base/index';
import profile from '@/components/business/base/profile';
import ems from '@/components/business/base/ems';

// 构建子路由
const base = [
  {
    path: 'base/register',
    name: 'BaseRegister',
    component: register
  },
  {
    path: 'base/login',
    name: 'BaseLogin',
    component: login
  },
  {
    // /business/base/index
    path: 'base/index',
    name: 'BaseIndex',
    component: index,
    // 自定义一个判断是否有登录的属性
    auth: true
  },
  {
    // /business/base/index
    path: 'base/profile',
    name: 'BaseProfile',
    component: profile,
    // 自定义一个判断是否有登录的属性
    auth: true
  },
  {
    // /business/base/index
    path: 'base/ems',
    name: 'BaseEms',
    component: ems,
    // 自定义一个判断是否有登录的属性
    auth: true
  },
]

export default base