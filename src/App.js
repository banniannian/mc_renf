import './App.css';

// 引入路由插件
import { BrowserRouter } from 'react-router-dom'

// 导入路由
import RouterList from '@/routers/index.js'
// console.log(RouterList); // 去到routers下的index.js

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouterList />
      </BrowserRouter>
    </>
  )
}

export default App;
