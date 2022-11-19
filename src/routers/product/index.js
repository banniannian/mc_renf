// 引入路由的模板布局组件
import { Outlet } from 'react-router-dom'

//引入进来当前目录下所有的文件
const ModulesFile = require.context('./',true,/.js$/)

//封装路由
const RouterMap = []

// 路由循环遍历
// mod 循环的模块
// path 文件的路径
ModulesFile.keys().reduce((mod, path) => {
    //对文件路径进行优化，只拿文件名部分
    const name = path.replace(/^.\/(.*)\.js/,'$1')

    //不能包含当前的index.js 自己引入自己
    if(name !== "index")
    {
        //获取模块内容
        const ModuleList = ModulesFile(path)

        //将模块的内容追加到数组中
        RouterMap.push(...ModuleList.default)
    }

    return RouterMap
},{})


// 父组件 要 加载模板布局
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
        //父级路由的地址
        path:'/product',
        component:layout,
        //加载子路由
        children: RouterMap
    }
]

export default RouterList