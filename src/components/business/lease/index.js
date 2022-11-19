import React from 'react'

const Index = () => {
  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //在外部用一个全局变量 来合并数据
  var data = []

  // useState 属于异步更新 时效性的问题
  const [list, SetList] = React.useState([])
  const listRef = React.useRef(null)

  // 根据默认状态，切换tab选项卡
  const statuslist = [
    {id: 0, name: '全部'},
    {id: 1, name: '已下单'},
    {id: 2, name: '已发货'},
    {id: 3, name: '已收货'},
    {id: 4, name: '已归还'},
    {id: 5, name: '已退押金'},
    {id: 6, name: '已完成'},
  ]

  var status = React.useRef(0)

  const back = () => {
    navigate(-1)
  }

  const TabsChange = (value) => {
    status.current = value.name

    data = []
    SetList([])
    page.current = 1
    ListData()
  }

  //用ref来定义分页的值 可以每次拿到最新
  let page = React.useRef(1)

  // 下拉刷新
  const refresh = () => {
    data = []
    SetList([])
    page.current = 1
    return new Promise((resolve) => {
      setTimeout(() => {
          React.$Vant.Toast.info('刷新成功')
          resolve(true)
      }, 1000)
    })
  }

  // 上拉加载
  const load = async () => {
    ListData()
  }

  // 数据请求
  const ListData = async () => {
    // 组装数据
    var params = {
      page: page.current,
      status: status.current,
    }

    // 调用请求请求列表接口
    var res = await React.$API.LeaseIndex(params)

    if(res) {
      if(res.code) {
        data = data.concat(res.data)
        SetList(data)
        page.current = page.current + 1
      } else {
        React.$Vant.Toast.info(res.msg)
        return false
      }
    }
  }

  // 确认收货
  const ConfirmLease = async (id) => {
    React.$Vant.Dialog.confirm({
      title: '确认收货',
      message: '是否确认收货',
    }).then(async () => {
      // 调用收货接口
      var res = await React.$API.LeaseReceipt({id: id})

      if(res.code) {
        React.$Vant.Toast.info(res.msg)
        data = []
        SetList([])
        page.current = 1
        ListData()
      } else {
        React.$Vant.Toast.info(res.msg)
        return false
      }
    }).catch(() => {})
  }

  const Items = () => {
    return list.map((item, key) => {
      return (
        <li key={key}>
          <div className="vip_order_goods">
            <h3>
              <i><img src={item.product.thumbs_text} alt=""/></i>
              <dl>
                  <dt>{item.product.name}</dt>
                  <dd>
                    <em>押金</em>
                    <em>{item.rent}</em>
                  </dd>
                  <dd>
                    <em>总价</em>
                    <em>{item.price}</em>
                  </dd>
                  <dd>
                    <em>结束时间</em>
                    <em>{item.endtime_text}</em>
                  </dd>
                  <dd>
                    <em>订单状态</em>
                    <em>{item.status_text}</em>
                  </dd>
              </dl>
            </h3>
          </div>

          <div className="order_btn">
            {(item.status == 5) && <React.$Vant.Button round type="warning" size="small" onClick={() => navigate(`/business/lease/comment?id=${item.id}`)}>订单评价</React.$Vant.Button>}

            {(item.status == 3 || item.status == 4) && <React.$Vant.Button round type="danger" size="small" onClick={() => navigate(`/business/lease/recovery?id=${item.id}`)}>归还商品</React.$Vant.Button>}

            {item.status == 2 && <React.$Vant.Button round type="warning" size="smail" onClick={ConfirmLease.bind(this, item.id)} >确认收货</React.$Vant.Button>}

            {item.status >= 2 && <React.$Vant.Button round type="info" size="smail" onClick={() => navigate(`/business/lease/express?id=${item.id}`)} >查看物流</React.$Vant.Button>}

            <React.$Vant.Button round type="primary" size="smail" onClick={() => navigate(`/business/lease/info?id=${item.id}`)} >查看详情</React.$Vant.Button>
          </div>
        </li>
      )
    })
  }

  return (
    <>
      {/* 导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar
          title="订单列表"
          onClickLeft={back}
          zIndex="10"
        />
      </React.$Vant.Sticky>

      {/* 选项卡 */}
      <React.$Vant.Tabs onClickTab={TabsChange}>
        {statuslist.map((item, key) => {
          return (
            <React.$Vant.Tabs.TabPane key={item.id} title={item.name} />
          )
        })}
      </React.$Vant.Tabs>

      {/* 列表 */}
      <React.$Vant.PullRefresh onRefresh={refresh} onRefreshEnd={() => listRef.current?.check()}>
        <React.$Vant.List className="vip_user_order" ref={listRef} onLoad={load} offset={5} autoCheck={false}>
          <ul>
            {Items()}
          </ul>
        </React.$Vant.List>
      </React.$Vant.PullRefresh>


    </>
  )
}

export default Index