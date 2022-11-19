import React from 'react';

const Ems = () => {
  // 设置状态数据
  const [LoginAuth, setLoginAuth] = React.useState(React.$LoginAuth)
  const [msg, SetMsg] = React.useState('发送验证码')
  const [disabled, SetDisabled] = React.useState(false)

  // 钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  // 使用钩子函数代替生命周期
  React.useEffect(() => {
    // 加载cookie，相当于是获取当前cookie，不存在就给空对象
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    // 设置状态数据
    setLoginAuth(LoginAuth)
  }, [])

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

  // 表单内容
  const [form] = React.$Vant.Form.useForm()

  const back = () => {
    navigate(-1)
  }

  // 发送事件
  const send = async () => {
    // 组装数据
    var  data = {
      id: LoginAuth.id
    }

    // 调用发送邮箱接口
    var res = await React.$API.sendems(data)

    // 判断是否成功
    if(res.code) {
      
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg
      })
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg
      })
    }

    // 定时器
    var sec = 60
    let T = setInterval(() => {
      // 修改按钮内容 60s
      SetMsg(`${sec} s`)
      SetDisabled(true)

      if(sec <= 0) {
        // 如果小于等于0就停止定时器并将值赋值为60
        clearInterval(T)
        sec = 60
        SetDisabled(false)
        SetMsg('重新发送验证码')
        return false
      } else {
        // 不小于0就--
        sec--
      }
    }, 10)
  }

  const ems = async (form) => {
    // 组装数据
    var data = {
      id: LoginAuth.id,
      code: form.code
    }

    // 调用邮箱验证接口
    var res = await React.$API.checkems(data)

    // 判断是否成功
    if(res.code) {
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg,
        duration: 800,
        onClose: () => {
            // 重新覆盖cookie
            React.$Cookie.save('LoginAuth', res.data)
            // 将全局$LoginAuth中的数据也覆盖为最新
            React.$LoginAuth = res.data
            navigate(-1)
        }
      })
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg
      })
    }
  }

  return (
    <div className="my_kuang">
      {/* 顶部导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar 
          title="邮箱认证"
          onClickLeft={back}
          // fixed
          zIndex="10"
        />
      </React.$Vant.Sticky>

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

      <div className="ems">
        <React.$Vant.Form form={form} onFinish={ems}>
          <React.$Vant.Form.Item 
            label="邮箱"
            name="email"
            initialValue={LoginAuth.email}
            rules={[
              {required: true, message: "请输入邮箱"}
            ]}
          >
            <React.$Vant.Field readonly/>
          </React.$Vant.Form.Item>

          {/* 验证码 */}
          <React.$Vant.Form.Item
            name="code"
            label="验证码"
            rules={[
              {required: true, message: "请输入邮箱"}
            ]}
          >
            {/* 发送验证码 */}
            <React.$Vant.Field 
              placeholder="请输入邮箱验证码"
              suffix={
                <React.$Vant.Button size="smail" type="primary" disabled={disabled} onClick={send}>发送</React.$Vant.Button>
              }
            />
          </React.$Vant.Form.Item>

          {/* 提交 */}
          <div style={{width:'40%',textAlign:'center',margin:'10px auto 0px'}}>
            <React.$Vant.Button nativeType="submit" block size="normal" type="primary" round>提交</React.$Vant.Button>
          </div>
        </React.$Vant.Form>
      </div>
    </div>
  )
}

export default Ems