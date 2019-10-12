import Vue from 'vue'
import Router from 'vue-router'
import NavLayout from '@/layout/NavLayout/index';
import CommonLayout from '@/layout/CommonLayout/index';
// import planRouter from './modules/planRouter'

export default new Router({
  linkActiveClass: 'active',
  mode: 'hash',  //去掉url中的#
  // base:'/mobile/oa_project/dist/',
  routes: [
    {
      path:'/',
      redirect:{name:'GetOpenId'},
      name:'HomePage'
    },
    {
      path: '/home',
      component: NavLayout,
      name:'Home',
      children: [
        {
          path: 'index',
          name: 'OaWork',
          component: () => import('@/views/DeskTop/OaWork/OaWork'),
          meta: {
            title: 'oa办公',
            index: 1
          }
        }
      ],
    },
    {
      path: '/contact',
      component: NavLayout,
      children: [
        {
          path: 'index',
          name: 'Contact',
          component: () => import('@/views/DeskTop/Contact/Contact'),
          meta: {
            title: '联系人',
            index: 2
          }
        },
      ]
    },
    {
      path: '/flowPath',
      component: NavLayout,
      children: [
        {
          path: 'index',
          name: 'FlowPath',
          component: () => import('@/views/DeskTop/FlowPath/FlowPath'),
          meta: {
            title: '流程申请',
            index: 3
          }
        },
      ]
    },
    {
      path: '/mine',
      component: NavLayout,
      children: [
        {
          path: 'index',
          name: 'Mine',
          component: () => import('@/views/DeskTop/Me/Me'),
          meta: {
            title: '我的',
            index: 4
          },
        },
      ]
    },
    {
      path:'/getOpenId',
      name:'GetOpenId',
      component:()=>import('@/views/GetOpenId/index'),
      meta:{
        title:'获取用户信息',
        index:5
      }
    },
    {
      path:'/notBind',
      name:'NotBind',
      component:()=>import('@/views/GetOpenId/NotBind'),
      meta:{
        title:'未绑定微信',
        index: 20
      }
    }
    ,
  ]
})
Vue.use(Router);
