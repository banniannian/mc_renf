import React from 'react';

// 导入react-vant的icon库, 因为react-vant挂载到了全局，可以通过React.$Vant的方式调用

// 引入路由组件中的跳转函数
import {NavLink } from 'react-router-dom'

const Menu = () => {
  const action = (value) => {
    if(value.isActive) {
      return {
        color: 'red'
      }
    }
  }

  return (
    <div className="foot_menu">
      <div className="footer">
        <NavLink className="menu" to="/" style={action}>
          <React.$Icon.WapHomeO fontSize={30}/>
          <p className='name'>首页</p>
        </NavLink>
        <NavLink className="menu" to="/profile" style={action}>
          <React.$Icon.ChatO fontSize={30}/>
          <p className='name'>咨询</p>
        </NavLink>
        <NavLink className="menu" to="/business/category/index" style={action}>
          <React.$Icon.NewO fontSize={30}/>
          <p className='name'>学术</p>
        </NavLink>
        <NavLink className="menu" to="/business/base/index" style={action}>
          <React.$Icon.ManagerO fontSize={30}/>
          <p className='name'>我的</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Menu;