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