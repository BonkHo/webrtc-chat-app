import React from "react";

const Video = () => {
    return (
        <div>
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
        </div>
    );
};

export default Video;
