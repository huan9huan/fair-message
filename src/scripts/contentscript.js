import ext from "./utils/ext";

var extractTags = () => {
  var url = document.location.href;
  if(!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href
  }

  var ogTitle = document.querySelector("meta[property='og:title']");
  if(ogTitle) {
    data.title = ogTitle.getAttribute("content")
  } else {
    data.title = document.title
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']")
  if(descriptionTag) {
    data.description = descriptionTag.getAttribute("content")
  }

  return data;
}

const INTERVAL = 10 * 1000;

var gConfig = {hide: false};

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    sendResponse(extractTags());
  }
  if(request.action === "hide-weibo") {
    gConfig.hide = request.hide;
    var resp = executeWeibo();
    sendResponse(resp);
  }
  if(request.action === "hide-twitter") {
    gConfig.hide = request.hide;
    var resp = executeTwitter();
    sendResponse(resp);
  }
}

function executeWeibo() {
  var details = document.querySelectorAll(".WB_feed_detail");
  var cnt = 0;
  [].forEach.call(details, detail => {
      var face = detail.querySelector(".WB_face");
      var info = detail.querySelector(".WB_info");
      if(face){
          face.style.display = "none";
      }
      if(info){
          info.style.display = "none";
          cnt += 1;
      }
      detail.addEventListener('click', () => {
          if(face) face.style.display = "block";
          if(info) info.style.display = "block";
      });
  });
  setInterval(function(){
    var newDetails = document.querySelectorAll(".WB_feed_detail");
    if(newDetails.length !== details.length){
      executeWeibo();
    }
  } ,INTERVAL);
  return {count: cnt, url: window.location.toString()}
}

function executeTwitter() {
  var contents = document.querySelectorAll(".content");
  var cnt = 0;
  [].forEach.call(contents, content => {
    var header = content.querySelector(".stream-item-header");
    if(header){
      header.style.display = "none";
      cnt += 1;
    }
    content.addEventListener('click', (e) => {
        if(header && header.style.display === "none") {
          header.style.display = "block";
          e.stopPropagation();
        }
    });
  });

  setInterval(function(){
    var newDetails = document.querySelectorAll(".content");
    if(newDetails.length !== details.length){
      executeTwitter();
    }
  } ,INTERVAL);
  return {count:cnt, url: window.location.toString()}
}

ext.runtime.onMessage.addListener(onRequest);