import ext from "./utils/ext";
import { getConfig, saveConfig } from './local';

var template = (data) => {
  var json = JSON.stringify(data);
  return (`
  <div class="site-description">
    <h3 class="title">${data.count}</h3>
    <div>
      <a href="${data.url}" class="url">${data.url}</a>
      <input type="checkbox" id="auto_hide_${data.site}">Auto Hide</input>
    </div>
   </div>
  `);
}

var renderMessage = (message) => {
  var displayContainer = document.getElementById("display-container");
  displayContainer.innerHTML = `<p class='message'>${message}</p>`;
}

function withConfig(site) {
  var autoHideElement = document.querySelector(`#auto_hide_${site}`);
  if(autoHideElement){
    var config = getConfig();
    autoHideElement.checked = (config[site] || {}).auto || false;
    autoHideElement.addEventListener("click", function(e) {
      config[site].auto = !(config[site].auto);
      autoHideElement.checked = config[site].auto
      saveConfig(config);
    });
  }
}
function reanderFor(site, data) {
  renderContent(Object.assign({site}, data));
}
var renderContent = (data) => {
  var displayContainer = document.getElementById("display-container")
  if(data) {
    var tmpl = template(data);
    displayContainer.innerHTML = tmpl;  
    withConfig(data.site);
  } else {
    renderMessage("Sorry, could not connect with page")
  }
}
ext.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  var url = activeTab.url;
  if(url && url.indexOf("twitter.com")){
    chrome.tabs.sendMessage(activeTab.id, { action: 'hide-twitter' }, reanderFor.bind(this, "twitter"));
  }
  if(url && url.indexOf("weibo.com")){
    chrome.tabs.sendMessage(activeTab.id, { action: 'hide-weibo' }, reanderFor.bind(this, "weibo"));
  }
});

// popup.addEventListener("click", function(e) {
//   if(e.target && e.target.matches("#save-btn")) {
//     e.preventDefault();
//     var data = e.target.getAttribute("data-bookmark");
//     ext.runtime.sendMessage({ action: "perform-save", data: data }, function(response) {
//       if(response && response.action === "saved") {
//         renderMessage("Your bookmark was saved successfully!");
//       } else {
//         renderMessage("Sorry, there was an error while saving your bookmark.");
//       }
//     })
//   }
// });

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})
