import React from 'react'

const Comment = () => {

  //设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象, 用于接收参数
  const [searchParams] = React.$Router.useSearchParams()
  const [id, SetID] = React.useState(searchParams.get('id'))
  const [tel, SetTel] = React.useState('')
  const [form] = React.$Vant.Form.useForm()
  const [rate, SetRate] = React.useState(5)

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

  const comment = async (form) => {
    // 组装数据
    var data = {
      comment: form.comment,
      rate: rate,
      id: info.id
    }

    var res = await React.$API.LeaseComment(data)

    if(res.code) {
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg,
        duration: 800,
        onClose: () => {
          //跳转到订单列表
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
        <React.$Vant.Form form={form} onFinish={comment}>
          <React.$Vant.Form.Item
            name="comment"
            initialValue={info.comment}
            rules={[
              {required:true, message: '请输入订单评价'}
            ]}
          >
            <React.$Vant.Field type="textarea" rows={3} placeholder="请输入订单评价" />
          </React.$Vant.Form.Item>
          <br />
          <div style={{textAlign:'center'}}>
            <React.$Vant.Rate value={rate} onChange={SetRate} />
          </div>
          <br />

          <React.$Vant.Button nativeType="submit" block size="normal" type="primary">提交</React.$Vant.Button>
        </React.$Vant.Form>
      </div>

      <div className="rem2"></div>

    </div>
  )
}

export default Comment