import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import firestore from "firebase/firestore";

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

    return (
        <div className="App">
            <h2>1. Start your Webcam</h2>
            <div className="videos">
                <span>
                    <h3>Local Stream</h3>
                    <video id="webcamVideo" autoPlay playsInline></video>
                </span>
                <span>
                    <h3>Remote Stream</h3>
                    <video id="remoteVideo" autoPlay playsInline></video>
                </span>
            </div>
            <button id="webcamButton">Start Webcam</button>

            <h2>2. Create a new Call</h2>
            <button id="callButton" disabled>
                Create Call (offer)
            </button>

            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device.</p>
            <input id="callInput" />
            <button id="answeButton" disabled>
                Answer
            </button>

            <h2>4. Hangup</h2>

            <button id="hangupButton" disabled>
                Hangup
            </button>
        </div>
    );
}

export default App;
