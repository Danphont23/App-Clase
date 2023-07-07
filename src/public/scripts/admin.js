// public/admin.js
"use strict";
const socket = io();
const peer = createPeer();

const video = document.getElementById("client-screen");
peer.addEventListener("track", (track) => {
  video.srcObject = track.streams[0];
});

socket.on("offer", async (clientSDP) => {
  await peer.setRemoteDescription(clientSDP);

  const sdp = await peer.createAnswer();
  await peer.setLocalDescription(sdp);
  socket.emit("answer", peer.localDescription);
});

peer.addEventListener("icecandidate", (event) => {
  if (event.candidate) {
    socket.emit("icecandidate", event.candidate);
  }
});

socket.on("icecandidate", async (candidate) => {
  await peer.addIceCandidate(new RTCIceCandidate(candidate));
});

function createPeer() {
  const peer = new RTCPeerConnection();

  peer.addEventListener("track", (track) => {
    video.srcObject = track.streams[0];
  });

  peer.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      socket.emit("icecandidate", event.candidate);
    }
  });

  return peer;
}
