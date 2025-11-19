import {StudyCatState} from "../models/StudyCatState.js";
import { Mood } from "../models/Mood.js";

const DEFAULT_STUDY_CAT_STATE: StudyCatState = {
  coins: 0,
  currentMood: Mood.SLEEPY,
  blackList: [],
  elapsedTime: 0
};

export class StudyCatStorage {}