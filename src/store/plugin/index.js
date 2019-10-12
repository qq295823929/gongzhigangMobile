import router from '../../router/index'
import vue from 'vue'
import {addCookie,getCookie,delCookie} from '../../utils/cookie';
const myPlugin = store => {
  // 当 store 初始化后调用
  var existCookie=getCookie('userInfo');
  if(!existCookie){ //说明是还没有登录过


  }else {
    store.commit('updateUserInfo',JSON.parse(existCookie));     //已经登录过了,将信息更新至store;
  }

  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    addCookie('userInfo',JSON.stringify(state.userInfo),0)
    // mutation 的格式为 { type, payload }
  })
}
export default myPlugin;
