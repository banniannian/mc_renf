const path = require('path')

module.exports = {
  webpack: {
    // 别名
    alias: {
      "@": path.resolve("src"),
    }
  },
  //配置反向代理解决跨域
  devServer: {
    proxy: {
        "/mc_rent": {
            target: "http://www.projects.com/index.php/mc_rent",
            changeOrigin: true,
            pathRewrite: {
                "^/mc_rent": ""
            }
        }
    }
  }
}




