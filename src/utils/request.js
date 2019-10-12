import axios from 'axios';
import qs from 'qs';
// 在config.js文件中统一存放一些公共常量，方便之后维护
// import router from "../router";
//



// 自动切换环境
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/local';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://192.168.0.102:8080';
}

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(function (config) {
  // 显示loading
  // if(config.headers['Content-Type']==='multipart/form-data'){
  //
  // }
  return config;
}, function (error) {
  // 请求错误时弹框提示，或做些其他事

  return Promise.reject(error);
});


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// axios.interceptors.request.use(
//   config => {
//     // Set token here
//     // config.headers['TICKET'] = getToken()
//
//     // transform post data to queryString
//     if (config.method === 'post' && config.headers['Content-Type'] !== 'multipart/form-data') {
//       config.data = qs.stringify(config.data);
//     }
//
//     // 文件上传
//     // 只需要在Post请求时候将opts的headers属性设置为
//     // { 'Content-Type': 'multipart/form-data' }
//     // 即可。例：
//     // const uploadImage = params => request('post', '/upload', params, {
//     //   headers: {
//     //     'Content-Type': 'multipart/form-data'
//     //   }
//     // })
//     //
//     // 下面以使用FormData的file字段名来保存文件举例。
//     // 若为单图上传，则将File类型保存到字段名`file`中即可。
//     // 若为多图上传，则需将File类型的数据数组保存在`file[]`形式的字段内。
//     if (config.headers['Content-Type'] === 'multipart/form-data') {
//       const { data } = config;
//       console.log(data);
//       var fd = new FormData();
//
//       for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//           if (key.endsWith('[]')) {
//             data[key].forEach(item => {
//               fd.append(key, item);
//             });
//           } else {
//             fd.append(key, data[key]);
//           }
//         }
//       }
//       config.data = fd;
//     }
//
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );


// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
  console.log();

  // if(response.data.state!==0&&response.data.state!==1){   //说明用户信息丢失了,或者服务器报错了
  //   MessageBox.confirm('请求发送失败,登录状态已丢失', '登录过期', {
  //     confirmButtonText: '留在此页面',
  //     cancelButtonText: '返回登录',
  //     type: 'warning'
  //   }).then(() => {
  //     this.$message({
  //       type: 'success',
  //       message: '删除成功!'
  //     });
  //   }).catch(() => {
  //     this.$message({
  //       type: 'info',
  //       message: '已取消删除'
  //     });
  //   });
  //
  //
  // }





  if(response.status===206){
    // MessageBox.alert('用户信息已失效,请返回首页重新登录', '登录已过期', {
    //   confirmButtonText: '确定',
    //   callback: action => {
    //     window.location.href='/html/dist'
    //   }
    // });
  }
  return response.data;
}, function (error) {

  // MessageBox.alert('请求发送失败,有可能是服务器内部故障,', '权限获取失败', {
  //   confirmButtonText: '确定',
  //   callback: action => {
  //     next({name:'Login',replace:true})
  //   }
  // });
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response;
  } else {
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  // if (res.data.code === '000000') {
  //   alert('success');
  // console.log(res);
  return res;
  // }
}

// 封装axios--------------------------------------------------------------------------------------
export function apiAxios (options) {
  var method = options.method;
  var url = options.url;
  var params = options.params;
  var data = options.data;
  // console.log(data);
  if (data instanceof FormData) {
  } else {
    data = qs.stringify(data);
  }
  // console.log(options.data);
  // console.log('typeof data=');
  // console.log(typeof data);
 // console.log(data.get('img'));
  var httpDefault = {
    method: method,
    url: url+'?t='+new Date().getTime(),
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'get' ? params : null,
    data: method === 'post' ? data : null,
    //withCredentials: true,
    timeout: 600000
  };
  // console.log(data);
  // console.log(httpDefault);
  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault).then((res) => {
      successState(res);
      resolve(res);
    }).catch((response) => {
      errorState(response);
      reject(response);
    });
  });
}


// 输出函数getAxios、postAxios、putAxios、delectAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function (Vue) {
    Vue.prototype.axios=axios;
    console.log(axios);
    Vue.prototype.getAxios = (url, params) => apiAxios('GET', url, params);
    Vue.prototype.postAxios = (url, params) => apiAxios('POST', url, params);
    Vue.prototype.putAxios = (url, params) => apiAxios('PUT', url, params);
    Vue.prototype.delectAxios = (url, params) => apiAxios('DELECT', url, params);
  }
};
