import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { TopNavigationAction, Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import Notifications from '../../components/notifications/index';
import NotificationsSK from '../../components/skeletons/notificationsSK';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ViewNotifications from '../../commonFunctions/viewNotifications';

const NotificationsScreen = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData(){
      const response = await ViewNotifications(props.access_token);
      setData(response);
    }
    loadData();
  }, [])

  const reloadData = async () => {
    setData([]);
    const response = await ViewNotifications(props.access_token);
    setData(response);
  }

  const RefreshIcon = () => <Icon name='refresh-outline' fill='#FFF' />;

  const RefreshAction = () => (
    <Ripple onPress={reloadData}>
      <TopNavigationAction icon={RefreshIcon} />
    </Ripple>
  );

  return (
    <View style={styles.backContainer}>
      <NavigationEvents
        onWillFocus={reloadData}
      />
      <TopNavSimple screenTitle='Notifications' backHandler={() => props.navigation.goBack()} rightControl={true} rightControlFun={RefreshAction} />
      <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
        {data.length <= 0 ? <NotificationsSK/> : <Notifications data={data} />}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(NotificationsScreen));

const styles = StyleSheet.create({
  backContainer:{
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  container:{
    alignItems: 'center',
    paddingBottom: 10
  }
})