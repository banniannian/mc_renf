const ModulesFile = require.context('./',true,/.js$/)

let ApiList = {}

ModulesFile.keys().reduce((modules, modulePath) => {

  //文件名部分
  const ModuleName = modulePath.replace(/^.\/(.*)\.js/,'$1')

  //不包含当前index.js 文件
  if(ModuleName !== 'index')
  {
    //请求列表取出来
    const ModuleList = ModulesFile(modulePath)


    //合并对象  循环多次合并
    ApiList = Object.assign(ApiList,ModuleList.default)
  }

  return ApiList
}, {})

//导出合并后的对象
export default ApiList