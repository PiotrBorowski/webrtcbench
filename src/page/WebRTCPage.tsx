import react, { useCallback, useEffect, useRef, useState } from "react";
import { VideoComponent } from "../components/VideoComponent";
import { call, createPeer, getLocalMediaStream, init } from "../services/peer";

export const WebRTCPage = () => {
  const remoteRef = useRef(null);
  const localRef = useRef(null);

  const [localId, setLocalId] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [peer, setPeer] = useState(null);
  const [localStream, setLocalStream] = useState();

  const getMediaStream = async () => {
    const stream = await getLocalMediaStream({
      audio: true,
      video: true,
    });
    localRef.current.srcObject = stream;
    setLocalStream(stream);
  };

  useEffect(() => {
    getMediaStream();
    const peer = createPeer(localId);
    setPeer(peer);
  }, []);

  const connect = useCallback(async () => {
    await init(peer, remoteId, localStream, (remoteStream) => {
      remoteRef.current.srcObject = remoteStream;
    });
  }, [remoteId, remoteRef, peer]);

  const callToRemote = useCallback(async () => {
    await call(peer, remoteId, localStream, (remoteStream) => {
      remoteRef.current.srcObject = remoteStream;
    });
  }, [peer, remoteId, remoteRef]);

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
      <span>name</span>
      <input
        style={{ height: 50 }}
        onChange={(e) => setLocalId(e.target.value)}
        value={localId}
      />
      <VideoComponent title="local" ref={localRef} />
      <span>name</span>
      <input
        style={{ height: 50 }}
        onChange={(e) => setRemoteId(e.target.value)}
        value={remoteId}
      />
      <button onClick={connect}>Connect</button>
      <button onClick={callToRemote}>Call</button>
      <VideoComponent title="remote" ref={remoteRef} />
    </div>
  );
};
