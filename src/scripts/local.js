import storage from "./utils/storage";

var DEFAULT_CONFIG = {
    weibo: {auto: false},
    twitter:  {auto: false},
  };
  
var Config = Object.assign({}, ...DEFAULT_CONFIG);

function loadConfig() {
    storage.get('config', function(resp) {
        if(resp.config) {
            Config = resp.config;
            console.log("load config from storage", Config);
        }
    });  
}

export function saveConfig() {
    storage.set({config}, function(resp) {
        console.log("save config done", config);
    });  
}

export function getConfig(){
    return Config;
}

loadConfig();