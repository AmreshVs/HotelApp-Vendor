import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, KeyboardAvoidingView, Animated } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import { Icon, Input, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';
import  * as Animatable from 'react-native-animatable';

import styles from './styles';
import UserLoginAuth from '../../redux/thunkActions/userLoginAuth';
import { userLogin } from '../../redux/actions/commonActions';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const LoginScreen = (props) => {

  const navigation = useNavigation();
  const items = [
    {
      uri: "https://r-cf.bstatic.com/images/hotel/max1024x768/275/27550766.jpg",
    },
    {
      uri: "https://cache.marriott.com/marriottassets/marriott/CJBMD/cjbmd-lobby-8443-hor-feat.jpg?interpolation=progressive-bilinear&downsize=1180px:*",
    },
    {
      uri: "https://r-cf.bstatic.com/images/hotel/max1024x768/873/87363784.jpg",
    }
  ];

  const [value, setValue] = React.useState('amreshcse007@gmail.com');
  const [passValue, setPassValue] = React.useState('admin123');
  const [userId, setUserId] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [slideAnim] = React.useState(new Animated.Value(0));
  const [slideAnimOtp] = React.useState(new Animated.Value(500));
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@DarpadVendor:userData');
        if (userData !== null) {
          props.userLogin(JSON.parse(userData));
          navigation.navigate('Home');
        }
      } catch (error) {

      }
    }
    OneSignal.addEventListener('ids', onIds);
    retrieveData();
  }, [])

  // return one signal user id
  const onIds = (data) => setUserId(data.userId);

  const slideComp = () => {
    if (validateData()) {
      Animated.spring(slideAnim, {
        toValue: 200,
        useNativeDriver: true
      }).start();
      Animated.spring(slideAnimOtp, {
        toValue: 0,
        useNativeDriver: true
      }).start();
      setVisible(true);
    }
  }

  const slideBack = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true
    }).start();
    Animated.spring(slideAnimOtp, {
      toValue: 500,
      useNativeDriver: true
    }).start();
    setVisible(false);
  }

  const renderIcon = (style) => (
    <Icon {...style} name='email-outline' />
  );

  const storeAsyncData = async (userData) => {
    await AsyncStorage.setItem('@DarpadVendor:userData', userData);
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderPassIcon = (style) => (
    <Icon {...style} name={secureTextEntry ? 'eye-off' : 'eye'} />
  );

  const loginWithPass = async () => {
    if(passValue.length <= 0){
      snackbarMessage('Enter Password');
    }
    else{
      const userData = await UserLoginAuth({ username: value, password: passValue, oneSignalUserId: userId });
      if(userData.data.message){
        snackbarMessage(userData.data.message);
      }
      else{
        props.userLogin(userData.data);
        const token = userData.data.access_token;
        snackbarMessage(userData.message)
        if (token !== undefined && token !== '') {
          storeAsyncData(JSON.stringify(userData.data));
          navigation.navigate('Home');
        }
      }
    }
  }

  const validateData = () => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.length <= 0) {
      snackbarMessage('Enter a Email Address');
      return false;
    }

    if(value.match(mailformat))
    {
      return true;
    }
    else
    {
      snackbarMessage('Invalid email address!');
      return false;
    }
  }

  return (
    <View style={styles.statusBarTop} behavior="padding" enabled>
      <TimedSlideshow
        items={items}
        footerStyle={{ backgroundColor: 'transparent' }}
        showProgressBar={false}
        renderIcon={() => null}
        renderCloseIcon={() => null}
      />
      <Animated.View
        style={[styles.inputContainer, {
          visibility: visible === true ? '' : 'hidden',
          transform: [{
            translateY: slideAnim
          }]
        }]}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Animatable.View style={styles.inputs} animation="bounceInLeft" direction="normal" duration={800} useNativeDriver={true}>
            <Input
              value={value}
              style={styles.input}
              size='small'
              placeholder='Enter Email'
              icon={renderIcon}
              onChangeText={setValue}
            />
            <Button style={styles.btnInput} appearance='filled' onPress={slideComp}>Continue</Button>
          </Animatable.View>
        </KeyboardAvoidingView>
      </Animated.View>
      <Animated.View
        style={[styles.inputContainer, {
          transform: [
            {
              translateY: slideAnimOtp
            }
          ]
        }]}
      >
        <KeyboardAvoidingView style={styles.inputOtpContainer} behavior="padding" enabled>
          <Input
            value={passValue}
            size='small'
            style={styles.input}
            placeholder='********'
            icon={renderPassIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={setPassValue}
          />
          <View style={styles.btnContainer}>
            <Button style={styles.backInput} appearance='filled' status='info' onPress={slideBack}>Back</Button>
            <Button style={styles.backInput} appearance='filled' onPress={loginWithPass}>Submit</Button>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userLogin: userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);