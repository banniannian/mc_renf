import React from 'react'

const Info = () => {
  // 需要钩子函数初始化路由的跳转对象
  const navigate = React.$Router.useNavigate()

  // 初始化路由参数对象
  const [searchParams] = React.$Router.useSearchParams()
  const [pid, SetPID] = React.useState(searchParams.get('pid'))
  const [product, SetProduct] = React.useState({})
  const [collection, SetCollection] = React.useState(false)
  // 设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  const back = () => 
  {
    navigate(-1)
  }

  // 获取商品详情
  const ProductData = async () => {
    var data = {
      pid: pid,
      busid: LoginAuth.id
    }

    var res = await React.$API.ProductInfo(data)

    // 判断是否查询成功
    if(res.code) {
      SetProduct(res.data)
      SetCollection(res.data.check)
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg,
        onClose: () => 
        {
            navigate(-1)
        }
      })
    }
  }

  // 一渲染页面就同时调用ProductData中的ProductInfo接口获取商品的详情
  React.useEffect(() => {
    ProductData()

    // 设置状态数据
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    // 设置状态数据
    SetLoginAuth(LoginAuth)
  }, [])

  const home = () => {

    navigate('/')
  }

  // 收藏
  const Collection = async () => {
    if(!LoginAuth || JSON.stringify(LoginAuth) === "{}") {
      React.$Vant.Toast.info('请先登录')
      return false
    }

    var data = {
      busid: LoginAuth.id,
      proid: pid
    }

    var res = await React.$API.ProductCollection(data)

    if(res.code) {
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg,
        duration: 1000,
        onClose: () => {
            SetCollection(true)
        }
      })
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg
      })
    }

  }

  // 取消收藏
  let cancel = async () => {
    // 组装数据
    var data = {
      proid: pid,
      busid: LoginAuth.id
    }

    var res = await React.$API.ProductCancel(data)

    if(res.code) {
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg,
        duration: 1000,
        onClose: () => {
          SetCollection(false)
        }
      })
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg
      })
    }
  }

  const check = () =>
  {
    if(collection)
    {
      return (
        <React.$Vant.ActionBar.Icon text="已收藏" icon={<React.$Icon.Star color="#f44336" />} onClick={cancel} />
      )
    }else
    {
      return (
        <React.$Vant.ActionBar.Icon text="收藏" icon={<React.$Icon.StarO  />} onClick={Collection} />
      )
    }
  }

  const lease = () => {
    navigate(`/business/lease/add?proid=${pid}`)
  }


  return (
    <>
      {/* 导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar
          title="商品详情"
          onClickLeft={back}
          zIndex="10"
        />
      </React.$Vant.Sticky>

      <div className="banner_shouy" style={{height:'15em'}}>
        <React.$Vant.Image fit="cover" src={product.thumbs_text} alt="" />
      </div>

      <div className='top_title'>
        <h2>{product.name}</h2>
        <div className="money">
            <h3>￥{product.rent_price}/月</h3>
            <p>押金:￥{product.rent}</p> 
        </div>

        <div className="youhuiq common">
        <div className="text">
          <h2>保障</h2>
          <div className="tb">
            <div className="tis_fuwu">
                        <ul>
                            <li className="no">保障</li>
                            <li>保障</li> 
                        </ul>
                    </div> 
          </div>
        </div>   
        </div>
        <div className="youhuiq common common_no">
        <div className="text">
          <h2>配送</h2>
          <div className="tb"> 
                    送货上门
          </div>
        </div>   
        </div>
      </div>

      <div className="xiang_qing_xp">
        <div className="proinfo" dangerouslySetInnerHTML={{__html:product.content}}></div>
      </div>

      <React.$Vant.ActionBar>
        <React.$Vant.ActionBar.Icon text="首页" icon={<React.$Icon.ShopO  />} onClick={home} />
        {check()}
        <React.$Vant.ActionBar.Button type="danger" text="立即租赁" onClick={lease}/>
      </React.$Vant.ActionBar>
    </>
  )
}

export default Info