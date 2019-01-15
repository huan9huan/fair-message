import ext from "./utils/ext";

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log(activeInfo.tabId);
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    var url = tab.url;
    if(url && url.indexOf("twitter.com")){
      console.log("bg: sending to twitter info");
      chrome.tabs.sendMessage(tab.id, { action: 'hide-twitter' });
    }
    if(url && url.indexOf("weibo.com")){
      console.log("bg: sending to weibo info");
      chrome.tabs.sendMessage(tab.id, { action: 'hide-weibo' });
    }
  });
});