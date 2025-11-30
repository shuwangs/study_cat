import {StudyCatState} from "../models/StudyCatState.js";
import {Mood} from "../models/Mood.js";


// TODOS:
// Set Default StudyCatState
// Load / restore from the storage
// Save and update to the storage

const DEFAULT_STATE: StudyCatState = {
  coins: 0,
  currentMood: Mood.SLEEPY,
  blackList: ["youtube.com", "twitter.com", "facebook.com", "instagram.com"],
  elapsedTime: 0,
  isStudying: false,
  targetEndTime: undefined
};

export class StudyCatStorage  {
  // load state from a stored object
  static loadState(): Promise<StudyCatState> {
    return new Promise((resolve) => {
      chrome.storage.sync.get('key').then((result) => {
        
        const stored = result["key"] as Partial<StudyCatState>;
      
        if(!stored){
          resolve(DEFAULT_STATE);
          return;
        }
        
        // Load stored studyCatState
        const state: StudyCatState = {
          coins: stored.coins ?? DEFAULT_STATE.coins,
          currentMood: stored.currentMood ?? DEFAULT_STATE.currentMood,
          blackList: stored.blackList ?? DEFAULT_STATE.blackList,
          elapsedTime: stored.elapsedTime ?? DEFAULT_STATE.elapsedTime,
          isStudying: stored.isStudying ?? DEFAULT_STATE.isStudying,
          targetEndTime: stored.targetEndTime
        };
        resolve(state);
      });

    });
  }

  // save state to a storable object
  public static saveState(state: StudyCatState): Promise<void>{
    return chrome.storage.sync.set({ key: state }).then(() => {
      console.log("Value is set");
    });

  }

  // reset state to default values
  public static resetState():  Promise<void> {
    return chrome.storage.sync.set({ key: DEFAULT_STATE }).then(() => {
      console.log("State has been reset to default");
    });
  }


  // Update state to default values
  public static async updateState(partial: Partial<StudyCatState>): Promise<void> {
    const current = await this.loadState();
    const updated = { ...current, ...partial };
  
    await this.saveState(updated);
  }
};
 