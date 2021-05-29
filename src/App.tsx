import React, { useRef, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { WebRTCPage } from "./page/WebRTCPage";
import { WebRTCStaticVideoPage } from "./page/WebRTCStaticVideoPage";

function App() {
  // const videoRefRef = useRef<HTMLVideoElement>(null);
  // const videoWebRTCRef = useRef<HTMLVideoElement>(null);
  // const videoHLSRef = useRef<HTMLVideoElement>(null);
  // const videoDASHRef = useRef<HTMLVideoElement>(null);
  // const videoSRTRef = useRef<HTMLVideoElement>(null);

  // const start = async () => {
  //   await Promise.all([startHls()]);
  // };

  // const startRef = async () => {
  //   videoRefRef.current.srcObject = await startCapture({
  //     video: true,
  //     audio: true,
  //   });
  // };

  // const startHls = async () => {
  //   var hls = new Hls({
  //     liveBackBufferLength: 0,
  //     maxBufferLength: 1,
  //     maxMaxBufferLength: 1,
  //   });
  //   hls.loadSource(`http://127.0.0.1:8887/stream.m3u8`);
  //   hls.attachMedia(videoHLSRef.current);
  // };

  // useEffect(() => {
  //   testFFmpeg();
  // }, []);

  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/dash">DASH</Link>
          </li>
          <li>
            <Link to="/hls">HLS</Link>
          </li>
          <li>
            <Link to="/srt">SRT</Link>
          </li>
          <li>
            <Link to="/webrtc">WebRTC</Link>
          </li>
          <li>
            <Link to="/webrtcStatic">WebRTC Static Video</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/webrtc" component={WebRTCPage} />
          <Route path="/webrtcStatic" component={WebRTCStaticVideoPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
