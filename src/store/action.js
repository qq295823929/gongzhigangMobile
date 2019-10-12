// import {getWxApi} from '@/api/user/index'
import router from '../router/index'

var actions = {
  getUserInfo({commit}, openid) {        //获取用户信息
    // console.log(openid);
    let data = {
      wxOpenid: openid
    };
    return new Promise(((resolve, reject) => {
      getWxApi(data).then(res => {
        // console.log(res);
        if (res.state === 1) {
          let userInfo = res.data;
          commit("updateUserInfo", userInfo);
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

          resolve(userInfo)
        } else {
          resolve(false)
        }
      })
    }))
  },

};


export default actions
