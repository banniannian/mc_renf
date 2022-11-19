import React from 'react'

const register = () => {
    const [form] = React.$Vant.Form.useForm()

    // 使用狗仔函数初始化路由跳转对象
    const navigate = React.$Router.useNavigate()

    const finish = async (values) => {
        var res = await React.$API.register(values)
        
        // 判断是否成功
        if(res.code) {
            React.$Vant.Notify.show({
                type: 'success',
                message: res.msg,
                duration: 800,
                onClose: () => {
                    navigate('/business/base/login')
                }
            })
        } else {
            React.$Vant.Notify.show({
                type: 'danger',
                message: res.msg
            })

            return false
        }
    }

  return (
    <>
      <link rel="stylesheet" type="text/css" href="/assets/css/util.css" />
      <link rel="stylesheet" type="text/css" href="/assets/css/login.css" />

      <div className="limiter">
          <div className="container-login100">
              <div className="wrap-login100 p-t-190 p-b-30">
                  <React.$Vant.Form form={form} onFinish={finish} className="login100-form validate-form">
                      <div className="login100-form-avatar">
                          <img src="/assets/images/avatar-01.jpg" alt="AVATAR" />
                      </div>

                      <span className="login100-form-title p-t-20 p-b-45"></span>

                        {/* 手机号 */}
                        <div className="wrap-input100 validate-input m-b-10" >
                            <React.$Vant.Form.Item
                                name="mobile"
                                label="手机号"
                                rules={[
                                    {required: true, message: '请输入手机号码'},
                                    {pattern: /^1[3456789]{1}\d{9}$/, message: '请输入正确格式的手机号码'},
                                ]}
                            >
                                <React.$Vant.Field placeholder="请输入手机号码" />
                            </React.$Vant.Form.Item>
                        </div>

                        {/* 密码 */}
                        <div className="wrap-input100 validate-input m-b-10">
                            <React.$Vant.Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {required: true, message: '请输入密码'},
                                ]}
                            >
                                <React.$Vant.Field type="password" placeholder="请输入密码" />
                            </React.$Vant.Form.Item>
                        </div>

                        {/* 再次输入密码 */}
                        <div className="wrap-input100 validate-input m-b-10">
                            <React.$Vant.Form.Item
                                name="repass"
                                label="确认密码"
                                rules={[
                                    {required: true, message: '请输入确认密码'},
                                ]}
                            >
                            <React.$Vant.Field type="password" placeholder="请输入确认密码" />
                            </React.$Vant.Form.Item>
                        </div>

                      <div className="container-login100-form-btn p-t-10">
                          <React.$Vant.Button nativeType="submit" className="login100-form-btn">注册</React.$Vant.Button>
                      </div>

                      {/* 因为挂载了全局，所以可以直接通过$Router来使用里面的NavLink函数 */}
                      <div className="text-center w-full p-t-25 p-b-80">
                          <React.$Router.NavLink to='/business/base/login' className="txt1">立即登录</React.$Router.NavLink>
                          <br />
                          <br />
                          <React.$Router.NavLink to='/' className="txt1">返回首页</React.$Router.NavLink>
                      </div>
                  </React.$Vant.Form>
              </div>
          </div>
      </div>
    </>
  )
}

export default register