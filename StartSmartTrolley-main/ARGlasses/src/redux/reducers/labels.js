// REDUCER
export const labelList = (state = [], action) => {
  switch (action.type) {
    case "ADD_LABEL":
      if (!state.some((label) => label.label === action.payload.label)) {
        return [...state, action.payload];
      } else {
        console.log(
          `AddingLabelFailed: ${action.payload.label} already exists`
        );
        return state;
      }
    case "SET_LABELLIST":
      return action.payload;
    case "REMOVE_LABEL":
      return state.filter((label) => label !== action.payload);
    case "RENAME_LABEL":
      return state.map((label) =>
        label === action.label ? { id: label.id, label: action.payload } : label
      );
    default:
      // need this for default case
      return state;
  }
};
export const currentLabel = (state = "", action) => {
  switch (action.type) {
    case "NEW_LABEL":
      return action.payload;
    default:
      // need this for default case
      return state;
  }
};
export const overlaySt = (
  state = {
    trolley: 3,
    entrys: [
      { id: 0, name: "frontplatte", currentValue: 0, value: 1 },
      { id: 1, name: "platine", currentValue: 3, value: 4 },
      { id: 2, name: "netzteil", currentValue: 2, value: 2 },
      { id: 3, name: "steuereinheit", currentValue: 4, value: 3 },
    ],
    points: [
      { label: "frontplatte", x: -30, y: -30 },
      { label: "steuereinheit", x: -30, y: -30 },
    ],
  },
  action
) => {
  switch (action.type) {
    case "NEW_ST":
      return action.payload;
    default:
      // need this for default case
      return state;
  }
};
export const selectedLabel = (state = "", action) => {
  switch (action.type) {
    case "SELECT":
      return action.payload;
    default:
      return state;
  }
};

export const highlightThreshold = (state = 0.7, action) => {
  switch (action.type) {
    case "NEW_THRESHOLD":
      return action.payload;
    default:
      return state;
  }
};
