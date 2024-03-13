// SignalingService.js
import { Platform } from 'react-native';

const SERVER_URL = 'http://188.132.129.3:5000';

// Registra la información del usuario en el servidor
const registerUser = async (userId, port) => {
  try {
    const response = await fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        port: port,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

// Recupera la información del usuario objetivo del servidor
const getUser = async (userId) => {
  try {
    const response = await fetch(`${SERVER_URL}/get_user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('User not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

// Envía una oferta al servidor, que la reenviará al usuario objetivo
const sendOffer = async (userId, targetUserId, offer) => {
  try {
    const response = await fetch(`${SERVER_URL}/send_offer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: userId,
        to: targetUserId,
        offer,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to send offer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending offer:', error);
  }
};

// Envía una respuesta al servidor, que la enviará al usuario inicial
const sendAnswer = async (userId, targetUserId, answer) => {
  try {
    const response = await fetch(`${SERVER_URL}/send_answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: userId,
        to: targetUserId,
        answer,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to send answer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending answer:', error);
  }
};

// Envía un candidato ICE al servidor, que lo reenviará al otro usuario
const sendIceCandidate = async (userId, targetUserId, candidate) => {
  try {
    const response = await fetch(`${SERVER_URL}/send_candidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: userId,
        to: targetUserId,
        candidate,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to send ICE candidate');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending ICE candidate:', error);
  }
};

export { registerUser, getUser, sendOffer, sendAnswer, sendIceCandidate };
