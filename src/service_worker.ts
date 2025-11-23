import {StudyCatStorage} from "./storage/StudyCatStorage.js";
import {Mood} from "./models/Mood.js";

console.log("StudyCat Background Service Worker running...");

/**
 * The functions of the ServiceWorker
 * 1. Watch the Screen, even when the popup UI is closed
 * 2. Judge if the user is studying by checking state.isStudying and isBlacklisted
 * 3. Update the panelty  by decrease the coins  and update currentMood to angry
 *
*/ 

/**
 * Three events in order: install, onInstall, and activate
*/

chrome.runtime.onInstalled.addListener(async(details) => {
  if(details.reason === "install") {
    console.log("🎉 StudyCat is installed, initializing...");
    await StudyCatStorage.resetState();
  } 
  else if (details.reason  == "update") {
    console.log("StudyCat has a new version!");
  }
})

// Request feedback form the user if uninstalled
https://docs.google.com/forms/d/e/1FAIpQLSdfXXCiNYqTCt7iCdBHhkNddl67pSiVpF3EDWimVQCaJu-CYw/viewform?usp=dialog