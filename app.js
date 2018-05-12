const onvif = require('node-onvif');
const interval = require('interval-promise')
const fs = require('fs')
var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');


let watsonCredentials = {
    "url": "https://gateway-a.watsonplatform.net/visual-recognition/api",
    "api_key": "4521f693efb6296db095cbb5365ef1299f533c79"
  };

const discovery = new VisualRecognitionV3({
    url: watsonCredentials.url,
    version: '2018-05-11',
    api_key: watsonCredentials.api_key,
});

let device = new onvif.OnvifDevice({
    xaddr: 'pivetta.ddns.net:8080',
    user: 'admin',
    pass: 'admin'
});

// Initialize the OnvifDevice object
device.init().then(() => {
    // Get the data of the snapshot
    console.log('fetching the data of the snapshot...');

    discovery.setAccessToken('<access-token>')


    interval(async () => {
        await device.fetchSnapshot().then( (res) => {
            fs.writeFileSync("testPhotos/"+res.headers.date.replace(/:/g,"=")+".jpeg", res.body, {encoding: 'binary'});
        }).catch((error) => {
            console.error(error);
        });
    }, 10, {iterations: 15})
    
    //return device.fetchSnapshot();
  })/*.then((res) => {
    // Save the data to a file
    fs.writeFileSync('snapshot.jpg', res.body, {encoding: 'binary'});
    console.log('Done!');
  }).catch((error) => {
    console.error(error);
  });*/