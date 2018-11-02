import { combineReducers } from 'redux';
import actionTypes from 'store/actions/types';

function lists(state = [], action) {
  if ([actionTypes.add, actionTypes.del].includes(action.type)) {
    const item = state.find(obj => obj.get('id') === action.listId); // 找到当前操作项
    const itemIndex = state.findIndex(obj => obj.get('id') === action.listId); // 找到当前操作项的索引值
    const resoruceList = item.get('resources'); // 找到当前操作的 resources
    let newResoruceList;
    if (action.type === actionTypes.add) { // add
      newResoruceList = resoruceList.concat(action.resources); // 添加 resource
    } else if (action.type === actionTypes.del) { // delete
      const resoruce = resoruceList.find(obj => obj.get('id') === action.resourceId); // 找到当前操作的 resource
      const resoruceIndex = resoruceList.findIndex(obj => obj.get('id') === resoruce.get('id')); // 找到当前操作的 resource 的索引值
      newResoruceList = resoruceList.delete(resoruceIndex); // 删除 resource
    } else {
      return state;
    }
    const newItem = item.set('resources', newResoruceList); // 更新当前操作项
    const newState = state.set(itemIndex, newItem);
    return newState;
  } else {
    return state;
  }
}

export default combineReducers({
  lists,
});
