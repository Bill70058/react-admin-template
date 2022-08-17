/*
 * @Author: lzr lzr@email.com
 * @Date: 2022-08-17 20:36:17
 * @LastEditors: lzr lzr@email.com
 * @LastEditTime: 2022-08-17 21:21:26
 * @FilePath: /react-admin-demo/src/route/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import View from '../pages/View/View'
import Lin from '../pages/Lin/Lin'
import Lin1 from '../pages/Lin/Lin1'
import Lin2 from '../pages/Lin/Lin2'
import Page404 from '../pages/Page404/Page404'
interface Meta {
  needLogin?: boolean
  title: string
}
interface IRoute {
  key: string
  path: string
  meta: Meta
  exact?: boolean
  icon?: string
  needLogin?: boolean
  component: any
  children?: IRoute[]
}
const router: IRoute[] = [
  {
    key: 'home',
    path: '/home',
    meta: {
      needLogin: true,
      title: 'home',
    },
    component: <Home />,
  },
  {
    key: 'view',
    path: '/',
    exact: true,
    meta: {
      title: 'view',
    },
    component: <View />,
  },
  {
    key: 'login',
    path: '/login',
    meta: {
      title: 'login',
    },
    component: <Login />,
  },
  {
    key: 'Lin',
    path: '/lin',
    meta: {
      title: 'lin',
    },
    component: <Lin />,
    children: [
      {
        key: 'Lin1',
        path: '/lin1',
        meta: {
          title: 'lin1',
        },
        component: <Lin1 />,
      },
      {
        key: 'Lin2',
        path: '/lin2',
        meta: {
          title: 'lin2',
        },
        component: <Lin2 />,
      },
    ],
  },
  {
    key: '404',
    path: '*',
    meta: {
      title: '404',
    },
    component: <Page404 />,
  },
]
/**
 * @description: 全局路由拦截
 * @param {string} pathname 当前路由路径
 * @param {object} meta 当前路由自定义meta字段
 * @return {string} 需要跳转到其他页时，就返回一个该页的path路径，或返回resolve该路径的promise对象
 */
const onRouteBefore = ({ pathname, meta }: { pathname: string; meta: any }) => {
  // 动态修改页面title
  if (meta.title !== undefined) {
    document.title = meta.title
  }
  // 判断未登录跳转登录页
  if (meta.needLogin) {
    let token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
}
export { router, onRouteBefore }
