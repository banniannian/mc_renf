import React from 'react'

// 导入底部导航栏(@在craco.config中配置的alias)
import Menu from '@/components/Menu.js'

const Home = () => {
  const [cate, SetCate] = React.useState([])
  const [hot, SetHot] = React.useState([])
  const [product, SetProduct] = React.useState([])

  const HomeData = async () => {
    var res = await React.$API.HomeIndex()
    SetCate(res.data.case)
    SetHot(res.data.hot) // 热门
    SetProduct(res.data.product)
  }

  // 因为一开始就要渲染数据，所以要加载页面时就调用HomeData中的HomeIndex接口
  React.useEffect(() => {
    HomeData()
  }, [])

  const Case = () => {
    // 不为空就输出
    if(cate) {
      return cate.map((item, index) => {
        return (
          <li key={index}>
            <img alt="" src={item.image_text} />
            <div className="right">
              <React.$Router.NavLink to={`/business/category/info?id=${item.id}`}><p>{item.name}</p></React.$Router.NavLink>
              <span>{item.createtime_text}</span>
            </div>
          </li>
        )
      })
    } else {
      return (
        <></>
      )
    }
  }

  // 头部轮播图
  const Banner = () => {
    // 不为空就输出
    if(hot) {
      return hot.map((item, index) => {
        return (
          <React.$Vant.Swiper.Item key={index}>
            <React.$Router.NavLink to={`/business/category/info?id=${item.id}`}>
              <img alt="" src={item.image_text} />
            </React.$Router.NavLink>
          </React.$Vant.Swiper.Item>
        )
      })
    }
  }

  // 商品展示,点击轮播图中的一项就去商品详情页
  const ProductCenter = () => {
    // 不为空就输出
    if(product) {
      return product.map((item, index) => {
        return (
          <React.$Vant.Swiper.Item key={index}>
            <React.$Router.NavLink to={`/product/product/info?pid=${item.id}`} className="a_blok">
              <img alt="" src={item.thumbs_text} />
              <span>查看详情</span>
            </React.$Router.NavLink>
          </React.$Vant.Swiper.Item>
        )
      })
    }
  }

  return (
    <>
      {/* banner 图片 */}
      <div className="banner_shouy">
        <React.$Vant.Swiper>
          {Banner()}
        </React.$Vant.Swiper>
      </div>

      {/* 快捷导航 */}
      <div className="shouye_kuanj">
        <div className="swiper-wrapper">
          <div className="swiper-slide" style={{width: '24vw', maxWidth: '170px'}}>
            <React.$Router.NavLink to="/business/lease/add">
              <img alt="" src="/assets/images/kj.png" />
              <p>产品租赁</p>
            </React.$Router.NavLink>
          </div>
          <div className="swiper-slide" style={{width: '24vw', maxWidth: '170px'}}>
            <React.$Router.NavLink to="/business/lease/index">
              <img alt="" src="/assets/images/kj1.png" /> 
              <p>我要归还</p>
            </React.$Router.NavLink>
          </div>
          <div className="swiper-slide" style={{width: '24vw', maxWidth: '170px'}}>
            <React.$Router.NavLink to="/product/product/index">
              <img alt="" src="/assets/images/kj2.png" /> 
              <p>商品大全</p>
            </React.$Router.NavLink>
          </div>
          <div className="swiper-slide" style={{width: '24vw', maxWidth: '170px'}}>
            <React.$Router.NavLink to="/about">
              <img src="/assets/images/kj3.png" alt="关于我们" />
              <p>关于我们</p>
            </React.$Router.NavLink>
          </div>
        </div>
      </div>

      {/* 产品中心 */}
      <div className="chan_p_center">
        <div className="shouye_biaot_k">
          <React.$Router.NavLink to="/product/product/index">
            <h2>产品中心</h2>
            <p>Product Center</p>
            <img src="/assets/images/jiant.png" alt="" />
          </React.$Router.NavLink>
        </div>

        <div className="chanp_k_sy">
          <div className="sjpiue_chanp_list">
            <React.$Vant.Swiper>
              {ProductCenter()}
            </React.$Vant.Swiper>
          </div>
        </div>


        <div className="lest_zx">
          <ul>
            <li>
              <a href="index.html">
                <img src="/assets/images/fangh.jpg" alt="" />
                <p>在线咨询</p>
              </a>
            </li>
            <li>
              <React.$Router.NavLink to="/business/category/index">
                <img alt="" src="/assets/images/fangh1.jpg" />
                <p>学术</p>
              </React.$Router.NavLink>
            </li>
          </ul>
        </div>


        {/* 列表 */}
        <div className="list_color" >
          <ul>
            <Case />
          </ul>
        </div>
      </div>
      <br/>
      <br/>
      <br/>

      {/* 底部导航栏, 使用组件标签形式 */}
      <Menu />

    </>
  )
}

export default Home