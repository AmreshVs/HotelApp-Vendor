import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Platform, KeyboardAvoidingView, Animated } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import styles from './styles';
import { Icon, Input, Button } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import UserLoginAuth from '../../redux/thunkActions/userLoginAuth';
import { userLogin } from '../../redux/actions/commonActions';
import { AsyncStorage } from 'react-native';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';
import OneSignal from 'react-native-onesignal';

const LoginScreen = (props) => {

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
  const [otpValue, setOtpValue] = React.useState('admin123');
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
          props.navigation.navigate('Home');
        }
      } catch (error) {

      }
    }
    retrieveData();
    OneSignal.addEventListener('ids', onIds);
  }, [])

  // return user id
  const onIds = data => setUserId(data.userId);

  const slideComp = () => {
    Animated.spring(slideAnim, {
      toValue: -500,
    }).start();
    Animated.spring(slideAnimOtp, {
      toValue: 0,
    }).start();
    setVisible(true);
  }

  const slideBack = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
    }).start();
    Animated.spring(slideAnimOtp, {
      toValue: 500,
    }).start();
    setVisible(false);
  }

  const renderIcon = (style) => (
    <Icon {...style} name='email-outline' />
  );

  const renderMsgIcon = (style) => (
    <Icon {...style} name='message-square-outline' />
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

  const loginWithOtp = async () => {
    const userData = await UserLoginAuth({ username: value, password: otpValue, oneSignalUserId: userId });
    props.userLogin(userData.data);
    const token = userData.data.access_token;
    snackbarMessage(userData.message)
    if (token !== undefined && token !== '') {
      storeAsyncData(JSON.stringify(userData.data));
      props.navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.statusBarTop} behavior="padding" enabled>
      <TimedSlideshow
        items={items}
        progressBarColor='#3366FF'
        progressBarDirection='fromLeft'
        renderIcon={() => null}
        renderCloseIcon={() => null}
      />
      <Animated.View
        style={[styles.inputContainer, {
          visibility: visible === true ? '' : 'hidden',
          transform: [{
            translateX: slideAnim
          }]
        }]}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Input
            value={value}
            keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            style={styles.input}
            size='small'
            placeholder='Enter Username'
            icon={renderIcon}
            onChangeText={setValue}
          />
          <Button style={styles.btnInput} appearance='filled' onPress={slideComp}>Continue</Button>
        </KeyboardAvoidingView>
      </Animated.View>
      <Animated.View
        style={[styles.inputContainer, {
          transform: [
            {
              translateX: slideAnimOtp
            }
          ]
        }]}
      >
        <KeyboardAvoidingView style={styles.inputOtpContainer} behavior="padding" enabled>
          <Input
            keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            value={otpValue}
            size='small'
            style={styles.input}
            placeholder='********'
            icon={renderPassIcon}
            secureTextEntry={secureTextEntry}
            onIconPress={onIconPress}
            onChangeText={setOtpValue}
          />
          <View style={styles.btnContainer}>
            <Button style={styles.backInput} appearance='filled' status='info' onPress={slideBack}>Back</Button>
            <Button style={styles.backInput} appearance='filled' onPress={loginWithOtp}>Submit</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen));