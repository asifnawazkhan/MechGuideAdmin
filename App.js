import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Navation_screen from './Component/Navigation_screen';
import Menubar from './Component/Menubar';
function App({navigation}) {
  return (
<>  
{/* <Menubar/> */}
<Navation_screen/>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 0, // Set padding to 0
    margin: 0, // Set margin to 0
  },
});

export default App;