

export function getTreeDataFormat(list) {
  // console.log(list);
  var result = [];
  for (var i = 0; i < list.length; i++) {
    list[i].lable=list[i].label;
    list[i].children = [];
    for (var j = 0; j < list.length; j++) {
      // console.log(list[j].parentId+'-----'+list[i].id);
      if (list[j].parentId == list[i].id) {
        // console.log(list[j]);
        // console.log(list[j].funName+'是'+list[i].funName+'的子节点');
        list[i].children.push(list[j]);
        list[j].hasParent = true;
      }
    }
  }
  for (var a = 0; a < list.length; a++) {
    if(list[a].hasParent!=true&&list[a].state!==1){
      result.push(list[a])
    }
  }
  // console.log(result);
  return result
}
