import React from 'react'

const About = () => {
  
  const navigate = React.$Router.useNavigate()

  const [about, SetAbout] = React.useState({})

  const back = () =>{
    navigate(-1)
  }

  const AboutData = async () => {
    var res = await React.$API.HomeAbout()

    SetAbout(res.data)

  }

  // 在渲染页面时就调用AboutData方法调用接口请求数据
  React.useEffect(() => {
    AboutData()
  }, [])

  const Content = () => {
    // 判断有没有关于我们的文章
    if(about.about) {
      return (
        <div dangerouslySetInnerHTML={{__html:about.about.description}}></div>
      )
    }
  }

  return (
    <>
      {/* 底部导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar 
          title= "关于我们"
          onClickLeft={back}
          zIndex="10"
        />
      </React.$Vant.Sticky>

      <div className="jianjie_k">
          <h2>{about.SiteName}</h2>
          <p style={{textAlign:'center'}}>官方客服电话：{about.SiteTel}</p>
          {Content()}
      </div>

      {/* 嵌入百度地图 */}


      <div className="footer_jianj">
          <p>{about.SiteBeian}</p>
      </div>

    </>
  )
}

export default About