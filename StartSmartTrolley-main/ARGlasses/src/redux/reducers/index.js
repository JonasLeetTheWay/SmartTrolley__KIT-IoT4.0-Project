import { combineReducers } from "redux";
import {
  currentLabel,
  labelList,
  selectedLabel,
  highlightThreshold,
  overlaySt,
} from "./labels";
import {
  takeImg,
  startTraining,
  trainingFinished,
  removeLabelOnServer,
} from "./peerCommands";

const allReducers = combineReducers({
  currentLabel,
  labelList,
  selectedLabel,
  takeImg,
  startTraining,
  trainingFinished,
  removeLabelOnServer,
  highlightThreshold,
  overlaySt,
});

export default allReducers;
