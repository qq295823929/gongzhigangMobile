import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Toast } from 'vant';

import {
  getSS,
} from './utils/storage';


NProgress.configure({showSpinner: false}) // NProgress Configuration

var timer=null


router.beforeEach(async (to, from, next) => {

  // alert(window.location.href)
  //与路由动画跳转相关
  let noTransformRouter = ['GetOpenId', 'Home'];
  let toName = to.name;
  // console.log(toName);
  // alert('去'+toName);
  // alert('path'+to.path)

  let toIndex = to.meta.index;
  let fromName = from.name;

  // console.log(fromName);
  // console.log(toName);
  // console.log(fromName);
  let fromIndex = from.meta.index;
  if (fromName===null||toName.indexOf(noTransformRouter) !== -1 || (fromName&&fromName.indexOf(noTransformRouter) !== -1)) { //说明不需要路由动画;
  } else {   //需要路由动画
    if(toIndex<fromIndex){    //要去的index小于来源的index;说明是返回,此时使用返回动画
      store.commit('changeTransitionName','router-back')
    }else {       //要去的index大于来源的index;说明是点击前进,此时使用前进动画;
      store.commit('changeTransitionName','router-deep')
    }
  }

  //此处进行权限判定;
  let whiteRouter=['GetOpenId','NotBind','No'];
  if(whiteRouter.indexOf(toName)!==-1){   //说明去的是白名单的路由,是不需要验证登录信息的,此时就直接跳转,
    next();
    return
  }


  if(getSS('openId')===null){     //说明没有openId
      next({name:'GetOpenId'})
  }else{  //有openid;那就要看有没有用户信息,是否已经绑定了
    if(getSS('userInfo')===null){   //说明没有用户信息
      // console.log(getSS('openId'));
      var userInfo=await store.dispatch('getUserInfo',getSS('openId'));

      if(userInfo){ //这个人登录过了,
        next()
      }else {   //这个人没有登录
        // next({name:''})
        next({name:'NotBind',replace:true})     //没有绑定过,就直接去显示未绑定的页面
      }

    }else {       //说明有用户信息,那就把sessionstorage里面的用户信息读取到vuex里面
      let userInfo=getSS('userInfo');
      store.commit('updateUserInfo',JSON.parse(userInfo))
    }
  }

  timer=setTimeout(function () {
    NProgress.start();
  },1500);
  next()
});

router.afterEach(() => {
  clearTimeout(timer);
  // console.log(router);
  NProgress.done()
});


var plusReady = function (callback) {
  if (window.plus) {
    callback();
    // alert(1)
  } else {
    // alert(2)
    document.addEventListener('plusready', callback);
  }
};

plusReady(function () {
  let firstFloorRouter=['OaWork','Contact','Mine'];



  let quitNum=0;

  plus.key.addEventListener("backbutton", function() {
    let currentRouter=router.history.current.name;
    if(firstFloorRouter.indexOf(currentRouter)!==-1){       //说明是在第一个首页了
      quitNum+=1;
      if(quitNum>1){
        plus.runtime.quit();
      }else {
        Toast({message:'再按一次退出应用',position:'bottom'});
      }
      setTimeout(function () {
        quitNum=0

      },2000)


    }else {     //说明在里层
      router.go(-1)

    }

  }); // 在这里调用plus api

  // this.prototype.plus=window.plus


})
