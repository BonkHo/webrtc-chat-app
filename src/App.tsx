import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import firestore from "firebase/firestore";

import Interface from "./components/Interface/Interface";
import Video from "./components/Video/Video";

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

    const onCallButtonClick = async () => {
        const callDoc = firestore.collection();
    };

    return (
        <div className="App">
            <Video />
            <Interface />
        </div>
    );
}

export default App;
