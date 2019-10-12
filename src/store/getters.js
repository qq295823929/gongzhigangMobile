const getters = {
  userInfo: (state) => state.userInfo,      //获取用户的所有信息；
  // getSchoolInfo: (state) => state.schoolInfo,  //获取学校信息
  // getOaUnread: (state) => state.oa,//获取oa未读;
  // getPerMission: (state) => state.permission.perMission,  //获取所有的功能权限
  // getAddRouters: (state) => state.permission.addRoutes,//获取所有动态添加的功能权限
  // getManageMenu: (state) => state.permission.manageMenu//获取后台管理的菜单栏
  transformName:(state)=>state.transformName,//获取路由跳转的层级关系动画;


};


export default getters
