import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  formContainer: {
    width: 300,
    margin: 20,
    fontFamily: 'Arial',
  },
  body: {
    backgroundColor: Colors.white,
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 1
  },
  footer: {
    backgroundColor: Colors.lighter,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  input: {
    fontWeight: 'bold',
    color: '#27ae60',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10
  },
});
export default styles;