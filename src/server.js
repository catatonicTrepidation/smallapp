import express from 'express';
const server = express();
import http from "http";
import easyRTC from "easyrtc";
import socketIO from "socket.io";
const port = 3000


console.log('server.js!');
// server.get('/', (req, res) => res.send('Hello World!'))

var myIceServers = [
    {"url":"stun:stun.l.google.com:19302"},
    {"url":"stun:stun1.l.google.com:19302"},
    {"url":"stun:stun2.l.google.com:19302"},
    {"url":"stun:stun3.l.google.com:19302"}
    // {
    //   "url":"turn:[ADDRESS]:[PORT]",
    //   "username":"[USERNAME]",
    //   "credential":"[CREDENTIAL]"
    // },
    // {
    //   "url":"turn:[ADDRESS]:[PORT][?transport=tcp]",
    //   "username":"[USERNAME]",
    //   "credential":"[CREDENTIAL]"
    // }
  ];

Promise.resolve().then(async function() {
    console.log('In server.js promise resolve!');
    // server.use(express.static('static'));
    // server.use(express.static('static/images'));
    server.use('/static', express.static('static'));
    // server.use('/hahaha/test', express.static('static'));
    server.use(express.static('./dist'));
    server.use('/dist', express.static('./dist'));

    var NAFServer = http.createServer(server);
    var socketServer = socketIO.listen(NAFServer, {"log level":1});

    // start RTC for NAF
    easyRTC.setOption("appIceServers", myIceServers);
    easyRTC.setOption("logLevel", "debug");
    easyRTC.setOption("demosEnable", false);

    // Overriding the default easyrtcAuth listener, only so we can directly access its callback
    easyRTC.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
        easyRTC.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
            if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
                callback(err, connectionObj);
                return;
            }

            connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

            console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

            callback(err, connectionObj);
        });
    });

    // Start EasyRTC server
    console.log("start easyrtc server");
    var rtc = easyRTC.listen(server, socketServer, null, function(err, rtcRef) {
        console.log("Initiated");

        rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
            console.log("roomCreate fired! Trying to create: " + roomName);

            appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
        });
    });

    let NAF_LISTEN_PORT = 3004
    NAFServer.listen(NAF_LISTEN_PORT, function () {
        console.log('NAFServer listening on http://localhost:' + NAF_LISTEN_PORT);
    });

    server.listen(port, () => console.log(`Example app listening on port ${port}!`));
});