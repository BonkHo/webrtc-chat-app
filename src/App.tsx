import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";

function App() {
    // Firebase SDK Initialization
    const firebaseConfig = {
        apiKey: "AIzaSyDHXWgWx_xxTlm45736pYUvf88rThl5qbo",
        authDomain: "webrtc-chat-app-388d8.firebaseapp.com",
        projectId: "webrtc-chat-app-388d8",
        storageBucket: "webrtc-chat-app-388d8.appspot.com",
        messagingSenderId: "634150162945",
        appId: "1:634150162945:web:b15bee0c62cdac4e366600",
        measurementId: "G-52W6E51JNP",
    };

    if (!firebase.getApps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Google STUN Server
    const servers = {
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                ],
            },
        ],
        iceCandidatePoolSize: 10,
    };
    /* 
    ID LIST
    webcamButton
    webcamVideo
    callButton
    callInput
    answerButton
    remoteVideo
    hangupButton
    */
    const [pc, setPC] = useState(new RTCPeerConnection(servers));
    const [localStream, setLocalStream] = useState(new MediaStream());
    const [remoteStream, setRemoteStream] = useState(new MediaStream());

    const onWebCamButtonClick = async () => {
        let localStreamValue = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        setLocalStream(localStreamValue);

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        /* Set in the return function
        webcamVideo.srcObject = localStream;
        remoteVideo.srcObject = remoteStream; */
    };

    const onCallButtonClick = async () => {
        const callDoc = firestore.collection();
    };

    return <div className="App">${firebaseConfig.apiKey}</div>;
}

export default App;
