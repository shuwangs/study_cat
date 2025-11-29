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
chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSdfXXCiNYqTCt7iCdBHhkNddl67pSiVpF3EDWimVQCaJu-CYw/viewform");

// Monitor the blackList

chrome.tabs.onUpdated.addListener(async(tabId, changeInfo,tab) => {
  console.log(tabId);
  if (changeInfo.status === "complete" && tab.url) {
    const myState = await StudyCatStorage.loadState();
    if(!myState.isStudying) {
      return;
    }

    const isBlacklisted = myState.blackList.some(badSite => tab.url!.includes(badSite));

    if (isBlacklisted) {
      console.log(`You are visiting blacklisted website ${tab.url}`);

      const newCoins = Math.max(0, myState.coins - 10);

      await StudyCatStorage.updateState({
        coins: newCoins, 
        currentMood: Mood.ANGRY,
        isStudying: false
      });

      /**
       * For cat to pop out
      */ 

      // chrome.tabs.sendMessage(tabId, {
      //   type: "SHOW_CAT_WARNING",
      //   url: tab.url
      // });
      chrome.action.setBadgeText({ text: "!" });
      chrome.action.setBadgeBackgroundColor({ color: "#FF0000" });
      
      setTimeout(() => {
        chrome.action.setBadgeText({ text: "" });
      }, 3000);

    }
  }

})