import storage from "./utils/storage";

const DEFAULT_CONFIG = {
    weibo: {auto: false},
    twitter:  {auto: false},
};
  
var Config = Object.assign({}, DEFAULT_CONFIG);

function loadConfig() {
    storage.get('config', function(resp) {
        if(resp.config) {
            Config = resp.config;
            console.log("load config from storage", Config);
        }else{
            console.log("config use default", Config);
        }
    });  
}

export function saveConfig(config) {
    Config = config;
    storage.set({config}, function(resp) {
        console.log("save config done", config);
    });  
}

export function getConfig(){
    return Config;
}

loadConfig();