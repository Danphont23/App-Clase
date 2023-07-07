// public/client.js
"use strict";

var getScreenMedia = require("getscreenmedia");

const socket = io();
const peer = new RTCPeerConnection();

const helpButton = document.getElementById("need-help");

helpButton.addEventListener("click", async () => {
  try {
    let stream;
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      stream = await getScreenMedia((err, stream) => {
        return stream;
      });
    } else {
      stream = await getScreenMedia((err, stream) => {
        return stream;
      });
    }

    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("offer", peer.localDescription);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

socket.on("answer", async (adminSDP) => {
  await peer.setRemoteDescription(adminSDP);
});

peer.addEventListener("icecandidate", (event) => {
  if (event.candidate) {
    socket.emit("icecandidate", event.candidate);
  }
});

socket.on("icecandidate", async (candidate) => {
  try {
    await peer.addIceCandidate(candidate);
  } catch (error) {
    console.error("Error adding ice candidate:", error);
  }
});
