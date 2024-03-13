import React, { useState, useCallback } from 'react';
import { Button, SafeAreaView, StatusBar, View, TextInput } from 'react-native';
import { styles } from './styles';
import LocalStream from './components/LocalStream';
import PeerConnection from './components/PeerConnection';
import { registerUser, getUser } from './components/SignalingService';

const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [userId, setUserId] = useState('');
  const [targetUserId, setTargetUserId] = useState('');

  const start = async () => {
    if (!userId) {
      alert('Por favor, introduce tu ID de usuario.');
      return;
    }
    if (!targetUserId) {
      alert('Por favor, introduce el ID del usuario objetivo.');
      return;
    }

    setIsStreaming(true);
    // Registra al usuario en el servidor de señalización
    const myPort = 12345; // Este es un valor ejemplo; deberías configurarlo según tu entorno.
    await registerUser(userId, myPort);

    // No es necesario buscar la info del targetUserId aquí si no se va a usar inmediatamente
  };

  const onStreamReady = useCallback((stream) => {
    setLocalStream(stream);
    // Inicia PeerConnection pasando localStream y los userIds
    <PeerConnection localStream={localStream} onRemoteStream={() => { }} userId={userId} targetUserId={targetUserId} />
  }, []);

  const stop = () => {
    setIsStreaming(false);
    setLocalStream(null);
    // Detén la conexión peer-to-peer adecuadamente
    //stopPeerConnection();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tu ID de usuario"
            value={userId}
            onChangeText={setUserId}
          />
          <TextInput
            style={styles.input}
            placeholder="ID del usuario objetivo"
            value={targetUserId}
            onChangeText={setTargetUserId}
          />
        </View>

        {isStreaming && <LocalStream video={true} audio={true} onStreamReady={onStreamReady} />}
        <PeerConnection localStream={localStream} onRemoteStream={() => { }} userId={userId} targetUserId={targetUserId} />
        <View style={styles.footer}>
          <Button title="Start" onPress={start} />
          <Button title="Stop" onPress={stop} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

