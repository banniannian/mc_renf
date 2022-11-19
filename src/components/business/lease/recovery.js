import React from 'react'

const Recovery = () => {

  //设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象, 用于接收参数
  const [searchParams] = React.$Router.useSearchParams()
  const [id, SetID] = React.useState(searchParams.get('id'))
  const [tel, SetTel] = React.useState('')
  const [factory, SetFactory] = React.useState({})
  const [form] = React.$Vant.Form.useForm()  // 表单内容
  const [express, SetExpress] = React.useState([])
  const [expshow, SetExpshow] = React.useState(false)
  const [expname, SetExpname] = React.useState('')
  const [busexpid, SetBusexpid] = React.useState(0)
  const [buscode, SetBuscode] = React.useState('')
  const picker = React.useRef(null)


  const info = React.useRef({
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

    FactoryData()
  }, [])

  const back = () => {
    navigate(-1)
  }

  const InfoData = async () => {
    var res = await React.$API.LeaseInfo({id: id})

    if(res.code) {
      info.current = res.data.info
      SetTel(res.data.tel)
      SetBuscode(res.data.info.busexpcode)

      // 当请求完成info数据后再手动调用快递列表
      ExpressData()
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

  // 拨打电话
  const content = () => {
    React.$Vant.Dialog.confirm({
      title: "拨打电话",
      message: "是否确认拨打官方客服热线",
    }).then(() => {
      // 拨打电话
      window.location.href = `tel: ${tel}`
    }).catch(() => {})
  }

  // 查询厂家数据
  const FactoryData = async () => {
    var res = await React.$API.LeaseRecovery({action: 'factory'})
    
    SetFactory(res.data)
  }

  // 快递列表数据
  const ExpressData = async () => {
    var res = await React.$API.LeaseExplist()

    var defaultIndex = 0

    // 当前订单记录中有归还的物流id，说明之前已经有归还信息了，因为现在在编辑页面，所以肯定默认先选中之前输入的值
    if(info.current.busexpid) {
      // 更新数据中的值
      SetBusexpid(info.current.busexpid)
      SetExpname(info.current.express.name)

      // 循环判断id和busexpid是否一致
      for(var key in res.data)
      {
        if(res.data[key].values == info.current.busexpid)
        {
          defaultIndex = key
          break;
        }
      }
    } else {
      SetBusexpid(res.data[0].value)
      SetExpname(res.data[0].text)
      defaultIndex = 0

    }

    SetExpress([{
      values: res.data,
      defaultIndex: defaultIndex
    }])
  }

  const ExpressConfirm = async (value) => {
    SetExpshow(false)
    SetExpname(value[0].text)
    SetBusexpid(value[0].values)
  }

  // 表单提交
  const recovery = async (form) => {
    // 判断是否有物流单号
    if(!buscode) {
      React.$Vant.Toast.info('归还的物流单号不能为空')
      return false
    }

    // 组装数据
    var data = {
      id: info.current.id,
      busexpid: busexpid, // 归还配送方式外键id
      busexpcode: buscode, // 归还配送单号
      action: 'recovery',
    }

    var  res = await React.$API.LeaseRecovery(data)

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
          title="归还商品"
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
                                  <React.$Router.NavLink to={`/product/product/info?pid=${info.current.proid}`}>
                                      <i><img src={info.current.product.thumbs_text} alt="" /></i>
                                      <dl>
                                          <dd>
                                            <em>厂家联系人：</em>
                                            <em>{factory.contact}</em>
                                          </dd>
                                          <dd>
                                            <em>厂家联系电话：</em>
                                            <em>{factory.mobile}</em>
                                          </dd>
                                          <dd>
                                            <em>归回地址：</em>
                                            <em>{factory.address}</em>
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

      <div className="recovery">
        <React.$Vant.Form form={form} onFinish={recovery}>
          {/* 选择快递方式 */}
          <React.$Vant.Form.Item
            label="快递公司"
            onClick={() => {SetExpshow(true)}}
            rules={[
              {required: true, message: '请选择快递公司'}
            ]}
          >
            <React.$Vant.Field placeholder="快递公司" isLink readonly value={expname ? expname : ''}/>
          </React.$Vant.Form.Item>

          {/* 快递方式弹出层 */}
          <React.$Vant.Popup position="bottom" round visible={expshow} onClose={() => {SetExpshow(false)}}>
            <React.$Vant.Picker
              ref={picker}
              title="快递公司"
              columns={express}
              onConfirm={ExpressConfirm}
              onCancel={() => {SetExpshow(false)}}
            />
          </React.$Vant.Popup>

          {/* 快递单号 */}
          <React.$Vant.Form.Item
            label="快递单号"
          >
            <React.$Vant.Field placeholder="请输入快递单号" value={buscode ? buscode : ''} onChange={SetBuscode}/>
          </React.$Vant.Form.Item>


          <React.$Vant.Button nativeType="submit" block size="normal" type="primary">立即归还</React.$Vant.Button>
        </React.$Vant.Form>


      </div>
    </div>
  )
}

export default Recovery