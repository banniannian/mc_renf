import React from 'react';

// 导入官方地区数据
import { areaList } from '@vant/area-data'

const Profile = () => {
  // 设置状态数据
  const [LoginAuth, SetLoginAuth] = React.useState(React.$LoginAuth)

  // 钩子函数初始化路由跳转对象
  const navigate = React.$Router.useNavigate()

  // 使用钩子函数代替生命周期
  React.useEffect(() => {
    // 加载cookie，相当于是获取当前cookie，不存在就给空对象
    var LoginAuth = React.$Cookie.load('LoginAuth') ? React.$Cookie.load('LoginAuth') : {}

    // 设置状态数据
    SetLoginAuth(LoginAuth)
  }, [])

  // 判断cookie中是否有头像
  const Avatar = () => {
    if(LoginAuth.avatar) {
      return (
        <img src={LoginAuth.avatar_text} alt="" />
      )
    } else {
      return (
        <img src="/assets/images/toux.jpg" alt="" />
      )
    }
  }

  // 判断cookie中是否有昵称
  const NickName = () => {
    // 是否有昵称，没有就使用手机号代替
    if(LoginAuth.nickname) {
      return (
        <h2>{LoginAuth.nickname}</h2>
      )
    } else if(LoginAuth.mobile) { // 如果连手机号都没有，意味着用户实际上是没有登录的
      return (
        <h2>{LoginAuth.mobile_text}</h2>
      )
    } else {
      return (
        <h2>请先登录</h2>
      )
    }
  }

  // 表单内容
  const [form] = React.$Vant.Form.useForm()

  // 弹出层显示和隐藏数据
  const [GenderShow, SetGenderShow] = React.useState(false)

  // 性别
  const GenderList = [
    {text: '保密', value: 0},
    {text: '男', value: 1},
    {text: '女', value: 2},
  ]

  const GenderConfirm = (gender) => {
    //隐藏picker
    SetGenderShow(false)

    LoginAuth.gender = gender.value
    LoginAuth.gender_text = gender.text

    SetLoginAuth(LoginAuth)
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

  // 头像
  const [avatar, SetAvatar] = React.useState([
    {url: LoginAuth.avatar_text}
  ])

  // 表单提交
  const profile = async (form) => {
    // 组装数据
    var data = {
      id: LoginAuth.id,
      nickname: form.nickname,
      email: form.email,
      gender: LoginAuth.gender,
      province: LoginAuth.province,
      city: LoginAuth.city,
      district: LoginAuth.district,
    }

    // 判断有填写密码才修改
    if(form.password) {
      data.password = form.password
    }

    // 判断是否有头像数据提交
    if(form.avatar.length > 0 && form.avatar[0].file) {
      data.avatar = form.avatar[0].file
    }

    // 调用接口
    var res = await React.$API.profile(data)

    // 判断是否修改成功
    if(res.code) {
      React.$Vant.Notify.show({
        type: 'success',
        message: res.msg,
        duration: 800,
        onClose: () => {

          // 将数据覆盖cookies
          React.$Cookie.save('LoginAuth', res.data)

          // 同时也将cookie信息存储到全局的$LoginAuth属性中
          React.$LoginAuth = res.data

          // 修改成功就返回上一页
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

  const back = () => {
    navigate(-1)
  }

  // React全局API的钩子函数，进来就自动渲染
  React.useEffect(() => {
    RegionInit()
  }, [])



  return (
    <div className="my_kuang">
        {/* 顶部导航栏 */}
        <React.$Vant.Sticky>
          <React.$Vant.NavBar
            title="个人资料"
            onClickLeft={back}
            // fixed
            zIndex="10"
          />
        </React.$Vant.Sticky>

      <div className="bj_img">
        <img className="beij_s" src="/assets/images/my_beij.jpg" alt="" />
        <div className="nimetou_gaib">
          <div className="toux_hou">
              <Avatar />
          </div>
          <div className="mingz">
              <NickName />
          </div>
        </div>
      </div>

        <div className='profile'>
          <React.$Vant.Form form={form} onFinish={profile}>
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

              <React.$Vant.Field disabled />
            </React.$Vant.Form.Item>

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

            {/* 邮箱 */}
            <React.$Vant.Form.Item
              name="email"
              label="邮箱"
              initialValue={LoginAuth.email}
              rules={[
                {required: true, message: "请输入邮箱"},
                {type: 'email', message: "请输入正确的邮箱格式"}
              ]}
            >
              <React.$Vant.Field placeholder="请输入邮箱" />
            </React.$Vant.Form.Item>

            {/* 密码 */}
            <React.$Vant.Form.Item
              name="password"
              label="密码"
            >
              <React.$Vant.Field placeholder="为空不修改密码"/>
            </React.$Vant.Form.Item>

            {/* 选择性别 */}
            <React.$Vant.Form.Item
              label="性别"
              onClick={() => {SetGenderShow(true)}}
            >
              <React.$Vant.Field placeholder="请选择性别" isLink readonly value={LoginAuth.gender_text} />
            </React.$Vant.Form.Item>

            {/* 选择性别的弹出层 */}
            <React.$Vant.Popup position="bottom" round visible={GenderShow} onClose={() => {SetGenderShow(false)}}>
              <React.$Vant.Picker 
                title="性别" 
                columns={GenderList} 
                defaultIndex={LoginAuth.gender}
                onConfirm={GenderConfirm} 
                onCancel={() => {SetGenderShow(false)}}
              />
            </React.$Vant.Popup>

            {/* 省市区 */}
            <React.$Vant.Form.Item
              label="地区"
              onClick={() => {SetRegionShow(true)}}
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

            {/* 头像 */}
            <React.$Vant.Form.Item
              label="头像"
              name="avatar"
              initialValue={[
                {url: LoginAuth.avatar_text}
              ]}
            >
              <React.$Vant.Uploader maxCount={1} value={avatar} />
            </React.$Vant.Form.Item>

            <div style={{width:'40%',textAlign:'center',margin:'10px auto 0px'}}>
              <React.$Vant.Button nativeType="submit" block size="normal" type="primary" round>修改资料</React.$Vant.Button>
            </div>

          </React.$Vant.Form>
        </div>
      </div>
  )
}

export default Profile