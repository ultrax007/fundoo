export function drawer(payload) {
  return {
    type: "DRAWER_STATUS",
    value: payload
  }
};

export function typedText(payload) {
  return {
    type: "TYPED_TEXT",
    value: payload
  }
}

export function view(payload) {
  return {
    type: "VIEW_TYPE",
    value: payload
  }
}
export function cardArray(payload) {
  return {
    type: "CARD_ARRAY",
    value: payload
  }
}
// export function selected(payload) {
//   return {
//     type: "SELECTED_CARD",
//     value: payload
//   }
// }