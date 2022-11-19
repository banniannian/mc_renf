// 引入每个目录下面的index.js文件
const ModulesFile = require.context('./',true,/.js$/)

//接口集合
var ApiList = {}

ModulesFile.keys().reduce((modules, modulePath) => {
  //去除js后缀拿到文件名
  const ModuleName = modulePath.replace(/^.\/(.*)\.js/,'$1')

  //不包含当前index.js 文件
  if(ModuleName !== 'index')
  {
    //请求列表
    const ModuleList = ModulesFile(modulePath)

    //合并对象 循环多次合并
    ApiList = Object.assign(ApiList,ModuleList.default)
  }

  return ApiList
}, {})

//导出接口集合
export default ApiList