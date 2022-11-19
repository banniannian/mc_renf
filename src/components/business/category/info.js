import React, { useState } from 'react'

const Index = () => {
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象
  const [searchParams] = React.$Router.useSearchParams()
  const [id, SetID] = useState(searchParams.get('id'))

  const [info, SetInfo] = React.useState({})
  const [prev, SetPrev] = React.useState({})
  const [next, SetNext] = React.useState({})
  const [collection, SetCollection] = React.useState(false)
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  const back = () =>{
    navigate('/business/category/index')
  }

  const InfoData = async () => {
    // 组装数据
    var data = {
      id: id
    }

    if(LoginAuth.id) {
      data.busid = LoginAuth.id
    }

    // 调用查询详情
    var res = await React.$API.CategoryInfo(data)

    // 判断是否成功
    if(res.code) {
      SetInfo(res.data.info)
      SetPrev(res.data.prev)
      SetNext(res.data.next)

      if(res.data.collection) {
        SetCollection(true)
      }
    } else {
      React.$Vant.Notify.show({
        type:'danger',
        message: res.msg,
        onClose: () => {
          navigate(-1)
        }
      })
    }
  }

  // 用于在渲染时接收id
  React.useEffect(() => {
    InfoData()

    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    // 设置状态数据
    SetLoginAuth(LoginAuth)
  }, [])

  // 上一篇
  const PrevCate = () => {
    let ToPrev = () => {
      SetID(prev.id)
      navigate(`/business/category/info?id=${prev.id}`)
      navigate(0)
    }

    if(prev) {
      return (
        <p>
          下一篇：
          <a onClick={ToPrev}>{prev.name}</a>
        </p>
      )
    } else {
      return (
        <p>上一篇：已经没有更多了</p>
      )
    }
  }

  const NextCate = () => {
    let ToNext = () => {
      SetID(next.id)
      navigate(`/business/category/info?id=${next.id}`)
      navigate(0)
    }

    if(next) {
      return (
        <p>下一篇：
          <a onClick={ToNext}>{next.name}</a>
        </p>
      )
    } else {
      return (
        <p>上一篇：已经没有更多了</p>
      )
    }
  }

  // 收藏
  const Collection = () => {
    // 确认收藏
    let confirm = async () => {
      // 组装数据
      var data = {
        cateid: id,
        busid: LoginAuth.id
      }

      // 调用确认收藏接口
      var res = await React.$API.CollectionConfirm(data)

      // 判断是否收藏成功
      if(res.code) {
        React.$Vant.Notify.show({
          type: 'success',
          message: res.msg,
          duration: 800,
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
        cateid: id,
        busid: LoginAuth.id
      }

      // 调用取消收藏接口
      var res = await React.$API.CollectionCancel(data)

      // 判断是否取消收藏成功
      if(res.code) {
        React.$Vant.Notify.show({
          type: 'success',
          message: res.msg,
          duration: 800,
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

    // 判断是否有当前用户
    if(LoginAuth.id) {
      if(collection) {
        return (
          <div className="niming_sq niming_sq_xs_xq" onClick={cancel}>
            <a>
              <React.$Icon.Star />已收藏
            </a>
          </div>
        )
      } else {
        return (
          <div className="niming_sq niming_sq_xs_xq" onClick={confirm}>
            <a>
              <React.$Icon.StarO />收藏
            </a>
          </div>
        )
      }
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <div className="category">
      {/* 底部导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar 
          title={info.name}
          zIndex="10"
          onClickLeft={back}
        />
      </React.$Vant.Sticky>

      <div className="rem2"></div>
      <div className="xs_Xiangq">
        <div className="bt">
          <h2>{info.name}</h2>
          <div className="text">
            <span>{info.createtime_text}</span>
            <span>文章作者: {info.nickname}</span>
          </div>
        </div>

        <div className="wom_de" dangerouslySetInnerHTML={{__html:info.description}}></div>

        <Collection />
      </div>

      <div className="rem2"></div>
      <div className="shangxia_piab">
        {/* 上一篇 */}
        <PrevCate />

        {/* 下一篇 */}
        <NextCate />
      </div>
    </div>
  )
}

export default Index