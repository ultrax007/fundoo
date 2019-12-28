const initialState = {
  drawerData: false,
  typedData: "",
  viewData:false
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
    case "TYPED_TEXT": {
      console.log("in reducer typed_text", action.value);
      return {
        ...state,
        typedData: action.value
      }
    }
    case "VIEW_TYPE": {
      console.log("in reducer view_type", action.value);
      return {
        ...state,
        viewData:action.value
      }
    }
      default:return state
  }
}
export default rootReducer;