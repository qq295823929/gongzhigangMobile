

var mutations = {
  updateUserInfo(state, data) {
    state.userInfo = data;
  },
  updateSchoolInfo(state,data){
    // console.log(data);
    state.schoolInfo=data;
  },
  changeTransitionName(state,name){
    state.transformName=name;
  }
};

export default mutations
