// src/content.ts
console.log("StudyCat Content Script loaded!");

// listening from the monitor worker
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "STUDYCAT_PENALTY") {
    alert("😾 StudyCat: GoBack to Study！");
    // here can adda cat image later
  }
});