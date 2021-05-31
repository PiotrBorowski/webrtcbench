import Peer from "peerjs";
import { transformSdp } from "./sdpTransport";

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

export const getCamera = async (displayMediaOptions: any) => {
  let captureStream = null;

  try {
    captureStream = await (navigator.mediaDevices as any).getUserMedia(
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
    call.on("stream", (s) => {
      console.log("stream", s);
      setRemoteStream(s);
    });

    console.log(call.peerConnection, call.metadata);
    // const [transciever] = call.peerConnection.getTransceivers();
    const { codecs } = RTCRtpSender.getCapabilities("video");
    const recCodecs = RTCRtpReceiver.getCapabilities("video").codecs;
    console.log("CODECS:", codecs);
    console.log("CODECS rec:", recCodecs);

    // transciever.setCodecPreferences(codecs);
    call.answer(localStream);
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
  const call = peer.call(remoteId, localStream, { sdpTransform: transformSdp });
  console.log(call);
  call.on("stream", (s) => {
    console.log(s);
    console.log("ONSTREAM");
    setRemoteStream(s);
  });
  call.on("error", (e) => console.log(e));
};
