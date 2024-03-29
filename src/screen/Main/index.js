import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { userLogin } from '../../redux/actions/commonActions';

const Main = (props) => {

  const navigation = useNavigation();

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@DarpadVendor:userData');
        if (userData !== null) {
          props.userLogin(JSON.parse(userData));
          navigation.navigate('Home');
        }
        else {
          navigation.navigate('LoginScreen');
        }
      } catch (error) {

      }
    }
    retrieveData();
    OneSignal.addEventListener('received', notificationOpen);
  }, [])

  const notificationOpen = (data) => {
    if (data.payload.additionalData !== null) {
      if (data.payload.additionalData.action === 'approve' || data.payload.additionalData.action === 'cancel') {
        navigation.navigate('NotificationsScreen');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: 'http://srjungleresort.com/images/logo.png' }} />
      <Image style={styles.img} source={{ uri: 'https://yalantis.com/uploads/ckeditor/pictures/365/content_Loading-Loop-1.gif' }} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userLogin: userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  img: {
    width: 100,
    height: 100
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  }
});