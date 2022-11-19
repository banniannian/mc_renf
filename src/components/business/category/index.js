import React from 'react';

const Index = () => {
  const navigate = React.$Router.useNavigate()

  const [list, SetList] = React.useState([])
  const [page, SetPage] = React.useState(1)
  const [loading, SetLoading] = React.useState(false)
  const [finished, SetFinished] = React.useState(false)

  // 跳转回首页
  const back = () =>{
    navigate('/')
  }

  const right = () => {
    console.log('右侧')
  }

  const ListData = async () => {
    // 组装数据
    var data = {
      page: page
    }

    var res = await React.$API.CategoryIndex(data)

    // 判断是否成功
    if(res) {
      if(res.code) {
        var arr = list.concat(res.data)
        SetList(arr)
        SetPage(page+1)

        // 当前每次请求列表时，要过100毫秒才可以进行新一轮的请求
        setTimeout(() => {
          SetLoading(false)
          SetFinished(false)
        }, 100)
      } else {
        SetFinished(true)
        React.$Vant.Toast.info(res.msg)
        return false
      }
    }
  }

  // 刷新
  const refresh = async () => {
    SetList([])
    SetPage(1)
    SetFinished(false)
    return new Promise((resolve) => {
      // 一秒后显示刷新成功
      setTimeout(() => {
        ListData()
        React.$Vant.Toast.info('刷新成功')
        resolve(true)
      }, 1000)
    })
  }

  const load = async () => {
    SetLoading(true)
    SetFinished(true)
    ListData()
  }

  const Items = () => {
    return list.map((item, index) => {
      return (
        <div className="item" key={index}>
          <React.$Router.NavLink to={`/business/category/info?id=${item.id}`}>
            <img src={item.image_text} alt="" />
            <div className="info">
              <p>{item.name}</p>
              <span>{item.createtime_text}</span>
            </div>
          </React.$Router.NavLink>
        </div>
      )
    })
  }

  return (
    <div className='category'>
      {/* 底部导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar 
          title="学术"
          zIndex="10"
          onClickLeft={back}
          conClickRight={right}
          rightText={<React.$Icon.Search fontSize={20} />}
        />
      </React.$Vant.Sticky>

      {/* 轮播图 */}
      <div className="banner_shouy">
        <React.$Vant.Swiper>
          <React.$Vant.Swiper.Item>
            <img alt="" src="/assets/images/banner.jpg" />
          </React.$Vant.Swiper.Item>
          <React.$Vant.Swiper.Item>
            <img alt="" src="/assets/images/banner1.jpg" />
          </React.$Vant.Swiper.Item>
        </React.$Vant.Swiper>
      </div>

      {/* 文章列表 */}
      <React.$Vant.PullRefresh
        onRefresh={refresh}
      >
        <React.$Vant.List className="catelist" finished={finished} onLoad={load} offset={5} loading={loading} autoCheck={false}>
            <Items />
        </React.$Vant.List>
      </React.$Vant.PullRefresh>
    </div>
  )
}

export default Index