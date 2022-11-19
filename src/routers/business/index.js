// 导入模板布局组件
import {Outlet} from 'react-router-dom'

// 导入当前目录下所有js为后缀的文件
const ModulesFile = require.context('./',true,/.js$/)

// 封装路由用于得到除index外的其它路由
const RouterMap = []

// 路由循环遍历
// mod 循环的模块
// path 文件路径
ModulesFile.keys().reduce((mod, path) => {
  // 对文件路径进行正则替换
  const name = path.replace(/^.\/(.*)\.js/,'$1') // 拿到的分别是出去后缀的base和index名称

  // 不能拿index.js，因为同名相当于引入自己
  if(name !== "index") {
    // 加载模块
    const ModulesList = ModulesFile(path) // 拿到的是base中封装的路由

    // 将模块的内容追加到RouterMap数组中
    RouterMap.push(...ModulesList.default) // 如果不使用...,那么default中还会有一层
  }

  return RouterMap
}, {})

// 父组件要加载模板
const layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

// 封装business模块的路由
const RouterList = [
  {
    // 父级路由地址
    path: '/business', // 相当于在base文件中的路由路径变成了 /business/base/index
    component: layout,
    // 加载子路由(加载了base封装的路由)
    children: RouterMap
  }
]

export default RouterList