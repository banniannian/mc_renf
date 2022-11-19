import React from 'react';
import Menu from '@/components/Menu.js';

const Index = () => {
  // 设置状态数据
  const [LoginAuth, setLoginAuth] = React.useState(React.$LoginAuth)

  // 钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  // 使用钩子函数代替生命周期
  React.useEffect(() => {
    // 加载cookie，相当于是获取当前cookie，不存在就给空对象
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    // 设置状态数据
    setLoginAuth(LoginAuth)
  }, [])

  // 退出登录，将当前cookie移除
  const logout = () => {
    React.$Vant.Dialog.confirm({
      title: '退出提醒',
      message: "是否确认退出登录"
    }).then(() => {
      // 删除当前cookie存储, 包括全局的$LoginAuth属性，并跳转到登录页面
      React.$Cookie.remove('LoginAuth')
      React.$LoginAuth = {}

      // 跳转到登录页面
      navigate('/business/base/login')
    }).catch(() => {})
  }

  // 判断cookie中是否有头像
  const Avatar = () => {
    if(LoginAuth.avatar) {
      return (
        <img src={LoginAuth.avatar_text} alt="" />
      )
    } else {
      return (
        <img src="/assets/images/toux.jpg" alt="" />
      )
    }
  }

  // 判断cookie中是否有昵称
  const NickName = () => {
    // 是否有昵称，没有就使用手机号代替
    if(LoginAuth.nickname) {
      return (
        <h2>{LoginAuth.nickname}</h2>
      )
    } else if(LoginAuth.mobile) { // 如果连手机号都没有，意味着用户实际上是没有登录的
      return (
        <h2>{LoginAuth.mobile_text}</h2>
      )
    } else {
      return (
        <h2>请先登录</h2>
      )
    }
  }

  // 判断是否有邮箱认证过
  const Email = () => {
    // 不为1是未认证
    if(LoginAuth.status !== 1) {
      return (
        <div className="my_dind">
          <div className="bt">
            <React.$Router.NavLink to="/business/base/ems">
              <h3><img src="/assets/images/my_x_01.png" alt="" />邮箱认证</h3>
              <div className="right"> 
                <img src="/assets/images/right_jiant.png" alt="" />
              </div>
            </React.$Router.NavLink>
          </div>
        </div>
      )
    } else{
      return (
        <></>
      )
    }
  }

  return (
    <>
      <div className="my_kuang">
      <div className="bj_img">
        <img className="beij_s" src="/assets/images/my_beij.jpg" alt="" />
        <div className="nimetou_gaib">
          <div className="toux_hou">
              <Avatar />
          </div>
          <div className="mingz">
              <NickName />
          </div>
        </div>
      </div>

      <div className="div_bx_k">
      <div className="neir_Ef">
          <div className="yverjif">
            <ul>
              <li><h2>0</h2><p>收藏文章</p></li>
              <li><a href="my_cs.html"> <h2>9</h2><p>收藏商品</p></a></li>
              <li><h2>17</h2><p>订单总数</p></li>
            </ul>
          </div>

          {/* <div className="my_tik_list fenh_ziyek yuanj_sd">
            <h3>我的订单<React.$Router.NavLink to="/business/lease/index">全部订单&gt;</React.$Router.NavLink></h3>
              <ul>
                <li>
                  <a href="my_dd.html">
                    <img src="/assets/images/dind_1.png" alt="" />
                    <p>待付款</p>
                  </a>
                </li>
                <li>
                  <a href="my_dd.html">
                    <img src="/assets/images/dind_2.png" alt="" />
                    <p>待发货</p>
                  </a>
                </li>
                <li>
                  <a href="my_dd.html">
                    <img src="/assets/images/dind_3.png" alt="" />
                    <p>待收货</p>
                  </a>
                </li> 
              </ul>
          </div> */}

            {/* <div className="list_index_my  ">
              <div className="fenh_ziyek">
                <h3>我的合作 </h3>
              </div>
              <div className="niming_sq">
                <a href="index.html"> <img src="/assets/images/zhaopianpaizhao.png" alt="" />合作申请</a>
                <p>这里申请合作</p>
              </div>
            </div> */}

            <div className="list_index_my">
              <div className="fenh_ziyek">
                <h3>更多服务 </h3>
              </div>

              {/* 修改资料 */}
              <div className="my_dind">
                <div className="bt">
                  <React.$Router.NavLink to="/business/base/profile">
                    <h3><img src="/assets/images/my_x_01.png" alt="" />基本资料</h3>
                    <div className="right"> 
                      <img src="/assets/images/right_jiant.png" alt="" />
                    </div>
                  </React.$Router.NavLink>
                </div>
              </div>

              {/* 邮箱认证 */}
              <Email />

              <div className="my_dind">
                <div className="bt">
                  <React.$Router.NavLink to="/business/lease/index">
                    <h3><img src="/assets/images/my_x_02.png" alt="" />我的订单</h3>
                    <div className="right"> 
                      <img src="/assets/images/right_jiant.png" alt="" />
                    </div> 
                  </React.$Router.NavLink>
                </div>
              </div>

              <div className="my_dind">
                <div className="bt">
                  <React.$Router.NavLink to="/about">
                    <h3><img src="/assets/images/my_x_02.png" alt="" />关于我们</h3>
                    <div className="right"> 
                      <span><b>300</b>分</span>
                      <img src="/assets/images/right_jiant.png" alt="" />
                    </div> 
                  </React.$Router.NavLink>
                </div>
              </div>

              <div className="my_dind">
                <div className="bt">
                  <a onClick={logout}>
                    <h3><img src="/assets/images/my_x_02.png" alt="" />退出登录</h3>
                    <div className="right"> 
                      <img src="/assets/images/right_jiant.png" alt="" />
                    </div> 
                  </a>
                </div>
              </div>

            </div>

        </div>
      </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>

      <Menu />
    </>
  )
}

export default Index