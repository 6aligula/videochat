import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, View } from 'react-native';
import { styles } from './styles';
import LocalStream from './components/LocalStream';
const App = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  const start = () => {
    setIsStreaming(true); // Activar el stream
  };

  const stop = () => {
    setIsStreaming(false); // Desactivar el stream
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        {isStreaming && <LocalStream video={true} audio={true} />}
        <View style={styles.footer}>
          <Button title="Start" onPress={start} />
          <Button title="Stop" onPress={stop} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
