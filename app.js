Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
    wsPort: 9999
});

Websocket = require('ws');
jsmpeg = require('jsmpeg');



client = new Websocket('ws://localhost:9999');
player = new jsmpeg(client, {
    canvas: canvas // Canvas should be a canvas DOM element
});

console.log(stream);