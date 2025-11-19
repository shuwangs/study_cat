import {StudyCatState} from "../models/StudyCatState.js";
import { Mood } from "../models/Mood.js";

// TODOS:
// Set Default StudyCatState
// Load / restore from the storage
// Save and update to the storage

const DEFAULT_STUDY_CAT_STATE: StudyCatState = {
  coins: 0,
  currentMood: Mood.SLEEPY,
  blackList: [],
  elapsedTime: 0
};

export class StudyCatStorage {}