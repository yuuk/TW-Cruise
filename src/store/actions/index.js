import actionTypes from 'store/actions/types';

export const addResource = (listId, resources) => {
  return {
    type: actionTypes.add,
    listId,
    resources,
  }
}

export const delResource = (listId, resourceId) => {
  return {
    type: actionTypes.del,
    listId,
    resourceId,
  }
}
