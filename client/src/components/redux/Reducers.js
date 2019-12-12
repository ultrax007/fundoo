const initialState = {
  drawerData:false
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "DRAWER_STATUS": {
      console.log("in reducer drawer_status", action.value);
      return {
        ...state,
        drawerData: action.value
      }
    }
      default:return state
  }
}
export default rootReducer;