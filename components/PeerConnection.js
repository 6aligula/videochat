// PeerConnection.js
import React, { useEffect, useState } from 'react';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { sendAnswer, sendOffer, sendIceCandidate } from './SignalingService';

const PeerConnection = ({ localStream, onRemoteStream, userId, targetUserId }) => {
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const configuration = { "iceServers": [{ "urls": "stun:stun.l.google.com:19302" }] };
    const pc = new RTCPeerConnection(configuration);

    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    pc.ontrack = (event) => {
      onRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // Enviar candidato ICE al servidor de señalización
        sendIceCandidate(userId, targetUserId, event.candidate);
      }
    };

    setPeerConnection(pc);

    return () => {
      pc.close();
    };
  }, [localStream, onRemoteStream, userId, targetUserId]);

  useEffect(() => {
    if (!peerConnection) return;

    // Función para iniciar la oferta
    const createOffer = async () => {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      sendOffer(userId, targetUserId, offer);
    };

    // Función para recibir una oferta y enviar una respuesta
    const handleOffer = async (offer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendAnswer(userId, targetUserId, answer);
    };

    // Añadir aquí lógica para manejar la recepción de ofertas, respuestas y candidatos ICE
    // Esto puede requerir escuchar eventos personalizados o implementar un polling al servidor

  }, [peerConnection, userId, targetUserId]);

  return null; // Este componente no necesita renderizar nada por sí mismo
};

export default PeerConnection;
