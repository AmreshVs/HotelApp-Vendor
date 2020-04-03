import React from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import SnackBar from 'react-native-snackbar-component';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, isMountedRef } from '../navigation/rootNavigation';
import TabNavigator from '../navigation/index';

const Main = (props) => {

  const styles = useStyleSheet(themedStyle);

  // Handling Reference Mount
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <View style={styles.mainView}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.statusBar} />
        <TabNavigator/>
        <SnackBar style={styles.snack} visible={props.visible} textMessage={props.message} backgroundColor={props.backgroundColor} actionText="Ok" />
      </NavigationContainer>
    </View>
  )
}

const mapStateToProps = (state) => {
  return state.common.snackbar;
}

export default connect(mapStateToProps)(Main);

const themedStyle = StyleService.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'background-basic-color-1'
  },
  statusBar: {
    backgroundColor: 'color-primary-600',
    height: StatusBar.currentHeight,
  },
  snack: {
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10,
  }
});