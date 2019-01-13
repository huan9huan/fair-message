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

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    sendResponse(extractTags())
  }
  if(request.action === "hide-weibo") {
    hideWeibo();
  }
}

function hideWeibo() {
  var details = document.querySelectorAll(".WB_feed_detail");
  [].forEach.call(details, detail => {
      var face = detail.querySelector(".WB_face");
      var info = detail.querySelector(".WB_info");
      if(face){
          face.style.display = "none";
      }
      if(info){
          info.style.display = "none";
      }
      detail.addEventListener('click', () => {
          if(face) face.style.display = "block";
          if(info) info.style.display = "block";
      });
  });
}

hideWeibo();

ext.runtime.onMessage.addListener(onRequest);