import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';

const LocalStream = ({ video = true, audio = true, onStreamReady }) => {
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await mediaDevices.getUserMedia({ video, audio });
        setStream(mediaStream);
        if (onStreamReady) {
          onStreamReady(mediaStream); // Pasar el stream al componente padre o a un contexto
        }
      } catch (error) {
        console.error('Error obtaining local stream', error);
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [video, audio, onStreamReady]);

  return (
    <View style={styles.container}>
      {stream && <RTCView streamURL={stream.toURL()} style={styles.streamView} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streamView: {
    width: '100%',
    height: '100%',
  },
});

export default LocalStream;
