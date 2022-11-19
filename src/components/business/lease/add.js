import React from 'react'

// 导入官方地区数据
import { areaList } from '@vant/area-data'

const Add = () => {

  //设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  //钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  //初始化路由参数对象
  const [searchParams] = React.$Router.useSearchParams()
  const [proid, SetPID] = React.useState(searchParams.get('proid')) // 接收的商品id(首页点击立即租赁是没有id的，商品点了是有id的)

  const [product, SetProduct] = React.useState({})

  //用钩子函数来代替生命周期
  React.useEffect(() => {
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    //设置状态数据
    SetLoginAuth(LoginAuth)

    var product = React.$Cookie.load('product') ? React.$Cookie.load('product') : {}
    SetProduct(product)

    RegionInit()

    Total()
  }, [])

  const back = () => {
    navigate(-1)
  }

  const SelectProduct = () => 
  {
    navigate('/product/product/index?action=add')
  }

  // 地区
  const [RegionShow, SetRegionShow] = React.useState(false)
  const [region, SetRegion] = React.useState('')
  const [code, SetCode] = React.useState('')

  const RegionInit = () => {
    var RegionStr = ''
    var RegionCode = ''
    if(LoginAuth.province_text)
    {
      RegionStr += LoginAuth.province_text
      RegionCode = LoginAuth.province
    }
  
    if(LoginAuth.city_text)
    {
      RegionStr += `/${LoginAuth.city_text}`
      RegionCode = LoginAuth.city
    }
  
    if(LoginAuth.district_text)
    {
      RegionStr += `/${LoginAuth.district_text}`
      RegionCode = LoginAuth.district
    }

    SetRegion(RegionStr)
    SetCode(RegionCode)
  }

  const RegionConfirm = (result) => {
    SetRegionShow(false)

    var [province, city, district] = result

    LoginAuth.province = province.code
    LoginAuth.province_text = province.name

    LoginAuth.city = city.code
    LoginAuth.city_text = city.name

    LoginAuth.district = district.code
    LoginAuth.district_text = district.name

    SetLoginAuth(LoginAuth)

    RegionInit()
  }

  // 日期
  const [DateShow, SetDateShow] = React.useState(false)

  const [end, SetEnd] = React.useState(new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)) // 10天日期
  const [day, SetDay] = React.useState(10) // 10 天
  const [endtime, SetEndTime] = React.useState(`${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate()}`)

  // 日期确认
  const DateConfirm = (date) => {
    SetDateShow(false)

    SetEndTime(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)

    SetEnd(date)

    // 日贡
    var RentPrice = product.price ? parseFloat(product.price) : 0

    // 押金
    var Rent = product.rent ? parseFloat(product.rent) : 0

    // 当前时间
    var now = new Date()

    // 相差天数
    var time = date - now
    var days = Math.ceil(time/(1000 * 60 * 60 * 24))
    SetDay(days)

    var price = parseFloat(RentPrice * days)
    price = price.toFixed(2) // 小位小数

    // 不含押金计算
    SetPrice(price)

    // 含押金计算
    var  rent = parseFloat(price) + Rent
    rent = rent.toFixed(2)
    SetRent(rent)
  }

  // 图片
  const [card, SetCard] = React.useState([])

  // 不含押金价格
  const [price, SetPrice] = React.useState(0)

  // 含押金价格
  const [rent, SetRent] = React.useState(0)

  const Total = () => {
    var product = React.$Cookie.load('product') ? React.$Cookie.load('product') : {}

    // 日贡
    var RentPrice = product.price ? parseFloat(product.price) : 0

    // 押金
    var Rent = product.rent ? parseFloat(product.rent) : 0

    // 当前时间
    var now = new Date()

    // 相差天数
    var time = end - now
    var days = Math.ceil(time/(1000 * 60 * 60 * 24))
    SetDay(days)

    var price = parseFloat(RentPrice * days)
    price = price.toFixed(2) // 小位小数

    // 不含押金计算
    SetPrice(price)

    // 含押金计算
    var rent = parseFloat(price) + Rent
    rent = rent.toFixed(2)
    SetRent(rent)
  }

  // 表单内容
  const [form] = React.$Vant.Form.useForm()

  // 提交表单
  const add = async (form) => {
    // 组装数据(从cookie中提取用户信息)
    var data = {
      busid: LoginAuth.id,
      proid: product.id,
      endtime: endtime,
      day:day,
      address: form.address,
      province: LoginAuth.province,
      city: LoginAuth.city,
      district: LoginAuth.district,
    }

    // 判断是否有头像数据，再更新
    if(form.card.length > 0 && form.card[0].file) {
      data.card = form.card[0].file
    }

    var res = await React.$API.LeaseAdd(data)

    // 判断是否成功
    if(res.code) {
      React.$Vant.Notify.show({
        type:'success',
        message: res.msg,
        duration: 800,
        onClose: () => {
          //跳转到订单列表
          navigate(res.url)
        }
      })
    }else {
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
          title="立即租赁"
          onClickLeft={back}
          zIndex="10"
        />
      </React.$Vant.Sticky>

      <div className="add">
        <React.$Vant.Form form={form} onFinish={add}>
          {/* 选择租赁商品 */}
          <React.$Vant.Form.Item
            label="租赁商品"
            onClick = {SelectProduct}
            >
              <React.$Vant.Field placeholder="租赁商品" isLink readonly value={product.name ? product.name : ''} />
          </React.$Vant.Form.Item>

          {/* 押金 */}
          <React.$Vant.Form.Item
            label="押金"
          >
            <React.$Vant.Field readonly value={product.rent ? product.rent : ''} />
          </React.$Vant.Form.Item>

          {/* 日供 */}
          <React.$Vant.Form.Item
            label="日供"
          >
            <React.$Vant.Field readonly value={product.price ? product.price : ''} />
          </React.$Vant.Form.Item>

          <br/>
          <br/>

          {/* 昵称 */}
          <React.$Vant.Form.Item
            name="nickname"
            label="昵称"
            initialValue={LoginAuth.nickname}
            rules={[
              {required: true, message: '请输入昵称'}
            ]}
          >
            <React.$Vant.Field placeholder="请输入昵称"/>
          </React.$Vant.Form.Item>

          {/* 手机 */}
          <React.$Vant.Form.Item
            label="手机号"
            name="mobile"
            initialValue={LoginAuth.mobile}
            rules={[
              {required: true, message: '请输入手机号码'},
              {pattern: /^1[3456789]{1}\d{9}$/, message: '请输入正确格式的手机号码'}
            ]}
          >
            <React.$Vant.Field placeholder="请输入手机号" />
          </React.$Vant.Form.Item>

          {/* 省市区 */}
          <React.$Vant.Form.Item
            label="地区"
            onClick={() => {SetRegionShow(true)}}
            rules={[
              {required: true, message: "请选择地区"}
            ]}
          >
            <React.$Vant.Field placeholder="请选择地区" isLink readonly value={region}/>
          </React.$Vant.Form.Item>

          {/* 地区弹出层 */}
          <React.$Vant.Popup position="bottom" round visible={RegionShow} onClose={() => {SetRegionShow(false)}}>
            <React.$Vant.Area
              title="请选择地区"
              areaList={areaList}
              value={code}
              onCancel={() => {SetRegionShow(false)}}
              onConfirm={RegionConfirm}
            />
          </React.$Vant.Popup>

          {/* 详细地址 */}
          <React.$Vant.Form.Item
            name="adresss"
            label="详细地址"
            rules={[
              {required:true, message: '请输入详细地址'}
            ]}
          >
            <React.$Vant.Field placeholder="请输入详细地址" />
          </React.$Vant.Form.Item>

          {/* 租用时间 */}
          <React.$Vant.Form.Item
            label="租用时间"
            onClick = {() => {SetDateShow(true)}}
            >
              <React.$Vant.Field isLink readonly value={endtime}/>
          </React.$Vant.Form.Item>
          
          {/* 租用时间选择 */}
          <React.$Vant.Calendar
            showConfirm={false}
            visible={DateShow}
            defaultDate={end}
            onClose={() => {SetDateShow(false)}}
            onConfirm={DateConfirm}
          />

          {/* 图片 */}
          <React.$Vant.Form.Item
            label="上传证件"
            name="card"
            rules={[
              {required:true, message: '请上传证件图片'}
            ]}
          >
            <React.$Vant.Uploader previewSize={150} maxCount={1} value={card} />
          </React.$Vant.Form.Item>


          <div className="zy_goods_foot dis_flex">
            <div className="left">
              <div>{day}天<b>￥<em>{price}</em></b></div>
              <div className="tou_d">含押金￥{rent}</div>
            </div>
            <p>
              <React.$Vant.Button nativeType="submit" block size="normal" type="primary">立即申请</React.$Vant.Button>
            </p>
          </div>
        </React.$Vant.Form>

      </div>
    </div>
  )
}

export default Add