import React from 'react'

const Express = () => {
  //设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象
  const [searchParams] = React.$Router.useSearchParams()
  const [id, SetID] = React.useState(searchParams.get('id'))
  const [tel, SetTel] = React.useState('')
  const [express, SetExpress] = React.useState([])

  const [info, SetInfo] = React.useState({
    product: {},
    business: {},
    express: {},
  })

  //用钩子函数来代替生命周期
  React.useEffect(() => {
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    //设置状态数据
    SetLoginAuth(LoginAuth)

    InfoData()

    ExpressData()
  }, [])

  const back = () => {
    navigate(-1)
  }

  const InfoData = async () => {
    var res = await React.$API.LeaseInfo({id: id})

    if(res.code) {
      SetInfo(res.data.info)
      SetTel(res.data.tel)
    } else {
      React.$Vant.Notify.show({
        type: 'danger',
        message: res.msg,
        onClose: () => {
          navigate(-1)
        }
      })
    }
  }

  const ExpressData = async () => {
    var res = await React.$API.LeaseExpress({id: id})

    if(res.code) {
      SetExpress(res.data)
    } else {
      React.$Vant.Notify.show({
        type: 'danger',
        message: res.msg,
        onClose: () => {
          navigate(-1)
        }
      })
    }
  }

  const content = () => {
    React.$Vant.Dialog.confirm({
      title: "拨打电话",
      message: "是否确认拨打官方客服热线",
    }).then(() => {
      // 拨打电话
      window.location.href = `tel: ${tel}`
    }).catch(() => {})
  }

  return (
    <div>
    {/* 导航栏 */}
    <React.$Vant.Sticky>
        <React.$Vant.NavBar
            title='物流详情'
            zIndex="10"
            onClickLeft={back}
        />
    </React.$Vant.Sticky>

    <div className="zy_module_content">
          <div className="swiper-container vip_user_order">
              <div className="swiper-slide">
                  <ul>
                      <li style={{borderBottom:'none'}}>
                          <div className="vip_order_goods">
                              <h3>
                                  <React.$Router.NavLink to={`/product/product/info?pid=${info.proid}`}>
                                      <i><img src={info.product.thumbs_text} alt="" /></i>
                                      <dl>
                                          <dt>{info.product.name}</dt>
                                          <dd>
                                            <em>押金</em>
                                            <em>{info.rent}</em>
                                          </dd>
                                          <dd>
                                            <em>总价</em>
                                            <em>{info.price}</em>
                                          </dd>
                                          <dd>
                                            <em>结束时间</em>
                                            <em>{info.endtime_text}</em>
                                          </dd>
                                          <dd>
                                            <em>订单状态</em>
                                            <em>{info.status_text}</em>
                                          </dd>
                                      </dl>
                                  </React.$Router.NavLink>
                              </h3>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      <div className="lianxi_ge">
        <a onClick={content}>联系客服</a>
      </div>
      <div className="rem2"></div>

      <React.$Vant.Steps direction="vertical" action={0}>
        {/* 遍历express中的数据 */}
        {express.map((item, key) => {
          return (
            <React.$Vant.Steps.Item key={key}>
              <h3>{item.status}</h3>
              <p>{item.time}</p>
            </React.$Vant.Steps.Item>
          )
        })}
      </React.$Vant.Steps>

    </div>
  )

}

export default Express