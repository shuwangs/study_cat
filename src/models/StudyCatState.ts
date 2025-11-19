import {Mood} from "./Mood.js";

export interface StudyCatState {
  coins: number;
  currentMood: Mood;
  blackList: string[];
  elapsedTime: number;
}