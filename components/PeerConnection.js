// PeerConnection.js
import React, { useEffect } from 'react';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

const PeerConnection = ({ localStream, onRemoteStream }) => {
  useEffect(() => {
    // Define the configuration for the peer connection
    const configuration = {"iceServers": [{"urls": "stun:stun.l.google.com:19302"}]};
    const peerConnection = new RTCPeerConnection(configuration);

    localStream && peerConnection.addStream(localStream);

    peerConnection.onaddstream = (event) => {
      onRemoteStream(event.stream);
    };

    // Aquí añadirías más lógica, como el manejo de ice candidates y el intercambio de señalización.

    return () => {
      peerConnection.close();
    };
  }, [localStream, onRemoteStream]);

  return null; // Este componente no necesita renderizar nada por sí mismo
};

export default PeerConnection;
