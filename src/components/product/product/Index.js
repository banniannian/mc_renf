import React from 'react'

const Index = () => {
  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  const [searchParams] = React.$Router.useSearchParams()
  const [action, SetAction] = React.useState(searchParams.get('action'))

  // 定义一个全局变量用于合并数据
  var data = []

  // 异步数据，时效性问题
  const [list, SetList] = React.useState([]) // useState属于异步更新
  const listRef = React.useRef(null)

  //用useRef来定义分页的值 可以每次拿到最新
  let page = React.useRef(1)

  const back = () => 
  {
    navigate(-1)
  }

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

    // 上啦加载
    const load = async () => {
        ProductData()
    }

    // 获取全部租赁商品
    const ProductData = async () => {
        var res = await React.$API.ProductIndex({page: page.current})

        if(res) {
            if(res.code) {
                // 存放到全局的data变量
                data = data.concat(res.data)
                SetList(data)
                page.current = page.current + 1
            } else {
                React.$Vant.Toast.info(res.msg)
                return false
            }
        }
    }

    // 订单页选择商品
    const Selected = (product) => {
      // 组装数据
      var data = {
        id: product.id,
        name: product.name,
        rent: product.rent,
        price: product.rent_price
      }

      // 将选择的商品存起来，然后返回上一个页面
      React.$Cookie.save('product', data)
      navigate('/business/lease/add')
    }

    const Items = () => {
      // 判断是否从add页面来的
      // eslint-disable-next-line eqeqeq
      if(action == 'add') {
        return list.map((item, index) => {
          return (
            <li key={index}>
                <a onClick={Selected.bind(this, item)}>
                    <img src={item.thumbs_text} alt="" />
                    <p>{item.name}</p>
                    <span>￥{item.price}</span>
                </a>
            </li>
          )
        })
      } else {
        return list.map((item, index) => {
            return (
                <li key={index}>
                    <React.$Router.NavLink to={`/product/product/info?pid=${item.id}`}>
                        <img src={item.thumbs_text} alt=""/>
                        <p>{item.name}</p>
                        <span>￥{item.price}</span>
                    </React.$Router.NavLink>
                </li>
            )
        })
      }


    }

  return (
    <>
      {/* 导航栏 */}
      <React.$Vant.Sticky>
        <React.$Vant.NavBar
          title="商品大全"
          onClickLeft={back}
          zIndex="10"
        />
      </React.$Vant.Sticky>

      {/* 列表 */}
      <React.$Vant.PullRefresh onRefresh={refresh} onRefreshEnd={() => listRef.current?.check()}>
        <React.$Vant.List ref={listRef} onLoad={load} offset={5} autoCheck={false}>
          <div className="left_kuangs">
              <ul>
                {Items()}
              </ul>
          </div>
        </React.$Vant.List>
      </React.$Vant.PullRefresh>
    </>
  )
}

export default Index