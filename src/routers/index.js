import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom'

//自定义封装，判断是否有登录一个组件
import AuthRouter from './auth'

// 引入首页组件
import Home from '@/components/Home'

// 引入首页组件
import About from '@/components/About'

// 引入当前目录下所有的index.js和子目录index.js文件
const ModulesFile = require.context('./',true,/index.js$/)

// 总路由集合
const RouterMap = []

// 遍历路由结构拿到除去js的文件名
ModulesFile.keys().reduce((mod, path) => {
  // 对文件名进行处理去除后缀
  const name = path.replace(/^.\/(.*)\.js/,'$1') // 拿到的是当前index和business/index

  // 不能引入相同名称index文件
  if(name !== "index") {
    // 将路径下的文件内容加载进来
    const ModuleList = ModulesFile(path)

    //将模块的内容追加
    RouterMap.push(...ModuleList.default) // 如果不使用...,那么default中还会有一层，拿到的是/business
  }

  return RouterMap
}, {})

// 封装路由组件
class RouterList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  // 通过数组类型的路由集合，将其遍历里面的路径
  render() {
    return (
      <>
        <Routes>
          {/* 默认首页 */}
          <Route path="/" element={<Home />} ></Route>

          {/* 关于我们 */}
          <Route path="/about" element={<About />} ></Route>

          {/* 一级路由 "/" */}
          <Route path="/" element={<Outlet />} >
            {
              RouterMap.map((item, index) => {
                return (
                  // 二级路由 /business, 相当于一级路由是/index, 二级路由是 /business/index
                  <Route key={index} path={item.path} element={<item.component/>} >
                    {/* 三级路由 /base/index */}
                    {
                      // son为子元素
                      item.children && 
                      item.children.map((son, idx) => 
                        // 调用AuthRouter将路由的auth传递过去到auth.js，auth对其处理查看路由是否要登录是否有cookie
                        <Route key={idx} path={son.path} element={<AuthRouter auth={son.auth} component={<son.component />} />} ></Route>
                      )
                    }

                  </Route>
                )
              })
            }
          </Route>
        </Routes>
      </>
    );
  }
}

export default RouterList