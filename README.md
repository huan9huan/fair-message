# fair message - mask writer to make your tweet message FAIR

## Why this project?

`Message is only message, should not be changed by the writer`.  
But in twitter/weibo, by design a tweet firstly give you the writer info, which will bias your thinking for next tweet content reading.

Fair-message app is to change this: mask the writer face and name, you directly read the content. If curious enough, click and show the writer info.

## installation

1. Clone the repository  
2. Run `npm install` or `yarn install`   
3. Run `npm run build` `yarn build`

### Load the extension in Chrome & Opera
1. Open Chrome/Opera browser and navigate to `chrome://extensions`
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `extension-boilerplate/build/chrome` or (`extension-boilerplate/build/opera`)

### Load the extension in Firefox
Open Firefox browser and navigate to `about:debugging`
Click "Load Temporary Add-on" and from the file browser, choose extension-boilerplate/build/firefox

## Developing
The following tasks can be used when you want to start developing the extension and want to enable live reload 

```
npm run chrome-watch
npm run opera-watch
npm run firefox-watch
```

## Packaging
Run `npm run dist` to create a zipped, production-ready extension for each browser.

This project is licensed under the MIT license.

If you have any questions or comments, please create a new issue. I'd be happy to hear your thoughts.

Email This [hhhust](hhhust@gmail.com)