import { AsyncStorage } from 'react-native';
import RootNavigation from '../components/navigation/rootNavigation';

const Logout = async () => {

  const userData = await AsyncStorage.removeItem('@DarpadVendor:userData');
  if (userData === null) {
    RootNavigation.navigate('LoginScreen');
  }

}

export default Logout;