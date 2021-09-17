import React, { useState } from "react";

const Interface = () => {
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

    const pc = new RTCPeerConnection(servers);
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

    return (
        <div>
            <button id="webcamButton" onClick={onWebCamButtonClick}>
                Start Webcam
            </button>
            <h2>2. Create a new Call</h2>
            <button id="callButton" disabled>
                Create Call (offer)
            </button>

            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device.</p>
            <input id="callInput" />

            <button id="answerButton" disabled>
                Answer
            </button>

            <h2>4. Hangup</h2>

            <button id="hangupButton" disabled>
                Hangup
            </button>
        </div>
    );
};

export default Interface;
