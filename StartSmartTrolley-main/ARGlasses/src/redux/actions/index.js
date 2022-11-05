export const setCurrentLabel = (label) => {
  return {
    type: "NEW_LABEL",
    payload: label,
  };
};

export const setoverlaySt = (st) => {
  return {
    type: "NEW_ST",
    payload: st,
  };
};

export const addLabelToLabelList = (label) => {
  return {
    type: "ADD_LABEL",
    payload: label,
  };
};

export const removeLabelFromLabelList = (label) => {
  return {
    type: "REMOVE_LABEL",
    payload: label,
  };
};

export const setLabelList = (labelList) => {
  return {
    type: "SET_LABELLIST",
    payload: labelList,
  };
};
export const changeLabelName = (label, newLabelName) => {
  return {
    type: "RENAME_LABEL",
    payload: newLabelName,
    label: label,
  };
};

export const setSetlectedLabel = (label) => {
  return {
    type: "SELECT",
    payload: label,
  };
};

export const toggletakeImg = () => {
  return {
    type: "TAKE_IMG",
  };
};
export const toggleStartTraining = () => {
  return {
    type: "START_TRAINING",
  };
};
export const setTrainingFinished = (finished) => {
  return {
    type: "TRAINING_FINISHED",
    payload: finished,
  };
};
export const setRemoveLabelFromServer = (label) => {
  return {
    type: "REMOVE_LABEL_FROM_SERVER",
    payload: label,
  };
};
export const sethighlightThreshold = (threshold) => {
  return {
    type: "NEW_THRESHOLD",
    payload: threshold,
  };
};
