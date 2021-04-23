import Peer from "peerjs";

export const getLocalMediaStream = async (displayMediaOptions: any) => {
  let captureStream = null;

  try {
    captureStream = await (navigator.mediaDevices as any).getDisplayMedia(
      displayMediaOptions
    );
  } catch (err) {
    console.error("Error: " + err);
  }
  return captureStream;
};

export const createPeer = (id: string) =>
  new Peer(id, { host: "localhost", port: 9000, path: "webrtc" });

export const init = (
  peer: Peer,
  localStream: MediaStream,
  setRemoteStream: (s: MediaStream) => any
) => {
  // const conn = await peer.connect(remoteId);
  peer.on("open", (id) => {
    console.log("connected to", id);
  });
  peer.on("connection", (c) => {
    console.log(c.peer, c.peerConnection);
  });
  peer.on("call", (call) => {
    console.log(call.peerConnection, call.metadata);
    // const [transciever] = call.peerConnection.getTransceivers();
    const { codecs } = RTCRtpSender.getCapabilities("video");
    console.log("CODECS:", codecs);
    // transciever.setCodecPreferences(codecs);
    call.answer(localStream);
    call.on("stream", (s) => {
      console.log("stream", s);
      setRemoteStream(s);
    });
  });
  peer.on("disconnected", function () {
    console.log("Connection lost. Please reconnect");
    peer.reconnect();
  });
  peer.on("error", (e) => console.log(e));
};

export const call = (
  peer: Peer,
  remoteId: string,
  localStream: MediaStream,
  setRemoteStream: (s: MediaStream) => any
) => {
  const call = peer.call(remoteId, localStream);
  console.log(call);
  call.on("stream", (s) => {
    console.log(s);
    console.log("ONSTREAM");
    setRemoteStream(s);
  });
  call.on("error", (e) => console.log(e));
};
