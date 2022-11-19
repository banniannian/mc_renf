import React from 'react';
import ReactDOM from 'react-dom/client'; // 渲染插件
import './index.css'; // 全局css文件
import App from './App';
import reportWebVitals from './reportWebVitals'; // 检测工具

// 导入cookies模块
import cookie from 'react-cookies';

// 导入接口
import API from './api/index'

// 导入vant框架
import * as Vant from 'react-vant'
import * as Router from 'react-router-dom'
import * as icon from '@react-vant/icons'

//挂载全局自定义属性
React.$Vant = Vant
React.$Icon = icon
React.$Router = Router
React.$API = API
React.$Cookie = cookie

// 将登录信息作为一个react全局属性，没登录情况下就给空对象，登录了就给cookie信息
React.$LoginAuth = cookie.load('LoginAuth') ? cookie.load('LoginAuth') : {}

// 用于绑定页面id的根元素
const root = ReactDOM.createRoot(document.getElementById('root'));

// 配置了严格模式（当运行时会有警告，警告来自因为配置了严格模式，所以img标签要有alt属性）
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
