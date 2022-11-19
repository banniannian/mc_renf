import React from 'react'

const Info = () => {

  //设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象, 用于接收参数
  const [searchParams] = React.$Router.useSearchParams()
  const [id, SetID] = React.useState(searchParams.get('id'))
  const [tel, SetTel] = React.useState('')

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

  const content = () => {
    React.$Vant.Dialog.confirm({
      title: "拨打电话",
      message: "是否确认拨打官方客服热线",
    }).then(() => {
      // 拨打电话
      window.location.href = `tel: ${tel}`
    }).catch(() => {})
  }

  // 物流
  const Express = () => {
    // 如果已发货
    if(info.status >= 2) {
      return (
        <>
          <li>配送方式：<span>{info.express.name}</span></li>
          <li>配送单号：<span>{info.expcode}</span></li>
          <li className="no">配送地址：<span>{info.address}</span></li>
        </>
      )
    }
  }

  // 评论，通过判断状态输出评论内容
  const Comment = () => {
    if(info.status == 6) {
      return (
        <>
          <li>评分：<React.$Vant.Rate value={info.rate} readonly/></li>
          <li className="no">评论内容：<span>{info.comment}</span></li>
        </>
      )
    }
  }

  return (
    <div>
      {/* 顶部导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar
          title="租赁详情"
          onClickLeft={back}
          zIndex="10"
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
      <div className="xiangq_xiaox">
          <ul>
              <li>联系人：<span>{info.business.nickname}</span></li>
              <li>性别：<span>{info.business.gender_text}</span></li>
              <li>联系电话：<span>{info.business.mobile}</span></li>
              <li>下单时间：<span>{info.createtime_text}</span></li>
              <li className="no">支付方式：<span>在线支付</span></li>
              <Express />

              {/* 评论 */}
              <Comment />
          </ul>
      </div>

      <div className="rem2"></div>
      <div className="nimen_er">
          <p>证件照片</p>
          <div className='card'>
            <img src={info.card_text} alt="" />
          </div>
      </div>

      <div className="rem2"></div>
      <div className="xq_money">
          <p>押金<span className="color">￥{info.rent}</span></p>
          <p>租金<span>￥{info.price - info.rent}</span></p>
          <div>
              <p><span>合计：<b className="color">￥{info.price}</b></span></p>
          </div>
      </div>

    </div>
  )
}

export default Info