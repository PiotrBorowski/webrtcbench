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

export const init = async (
  peer: Peer,
  remoteId: string,
  localStream: MediaStream,
  setRemoteStream: (s: MediaStream) => any
) => {
  const conn = await peer.connect(remoteId);
  conn.on("open", () => {
    console.log("connected");
  });
  peer.on("call", (call) => {
    call.answer(localStream);
    call.on("stream", setRemoteStream);
  });
};

export const call = async (
  peer: Peer,
  remoteId: string,
  localStream: MediaStream,
  setRemoteStream: (s: MediaStream) => any
) => {
  const call = peer.call(remoteId, localStream);
  call.on("stream", setRemoteStream);
};
