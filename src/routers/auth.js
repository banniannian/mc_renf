import React from 'react'
import {Navigate} from 'react-router-dom'

// 根据cookie判断用户是否有登录
const AuthRouter = (props) => {
  // 根据传递来的props中的auth属性判断路由是否要进行登录
  if(props.auth) {
    // 如果没有值说明要登录

    // 获取cookie信息
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    if(!LoginAuth || JSON.stringify(LoginAuth) === "{}") {
      // 如果没cookie，要跳转到登录页面
      return (
        <Navigate to="/business/base/login" />
      )
    } else {
      // 有cookie就给当前访问的页面组件
      return (
        <>
          {props.component}
        </>
      )
    }
  } else {
    // 如果访问的路由不用登录，需要登录的路由都会被有的auth: true
    return (
      <>
        {props.component}
      </>
    )
  }
}

export default AuthRouter