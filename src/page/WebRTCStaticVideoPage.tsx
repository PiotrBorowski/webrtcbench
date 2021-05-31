import react, { useCallback, useEffect, useRef, useState } from "react";
import { VideoComponent } from "../components/VideoComponent";
import { call, createPeer, getLocalMediaStream, init } from "../services/peer";

export const WebRTCStaticVideoPage = () => {
  const remoteRef = useRef(null);
  const localRef = useRef(null);

  const [localId, setLocalId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [peer, setPeer] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    localRef.current.src = "http://localhost:3000/testscreen.mp4";
  }, []);

  const getMediaStream = async () => {
    const stream: MediaStream = localRef.current.captureStream(60);
    await stream.getVideoTracks()[0].applyConstraints({ frameRate: 60 });
    console.log("settings", stream.getVideoTracks()[0].getCapabilities());

    setLocalStream(stream);
  };

  const connect = useCallback(async () => {
    const p = createPeer(localId);
    setPeer(p);
    await getMediaStream();
    init(p, localStream, (remoteStream) => {
      remoteRef.current.srcObject = remoteStream;
    });
  }, [remoteRef, localStream, localId]);

  const callToRemote = useCallback(() => {
    call(peer, remoteId, localStream, (remoteStream) => {
      remoteRef.current.srcObject = remoteStream;
    });
  }, [peer, remoteId, remoteRef, localStream]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div
        style={{ display: "flex", flexDirection: "column", marginRight: 20 }}
      >
        <input
          placeholder="local"
          style={{ height: 50 }}
          onChange={(e) => setLocalId(e.target.value)}
          value={localId}
        />
        <input
          placeholder="remote"
          style={{ height: 50 }}
          onChange={(e) => setRemoteId(e.target.value)}
          value={remoteId}
        />
        <button onClick={connect}>Connect</button>
        <button onClick={callToRemote}>Call</button>
      </div>

      <VideoComponent title="local" ref={localRef} />

      <VideoComponent title="remote" ref={remoteRef} />
    </div>
  );
};
