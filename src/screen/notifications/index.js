import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopNavigationAction, Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import OneSignal from 'react-native-onesignal';

import Notifications from '../../components/notifications/index';
import NotificationsSK from '../../components/skeletons/notificationsSK';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ViewNotifications from '../../commonFunctions/viewNotifications';
import ReadNotification from '../../commonFunctions/readNotifications';
import UpdateBookingStatus from '../../commonFunctions/update-booking-status';
import SendNotification from '../../commonFunctions/sendNotification';
import SaveNotification from '../../commonFunctions/saveNotification';

const NotificationsScreen = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await ViewNotifications(props.access_token);
      setData(response.length > 0 ? response : -1);
    }
    loadData();
    OneSignal.addEventListener('opened', notificationOpen);
  }, [])

  const notificationOpen = (data) => {
    const params = data.notification.payload.additionalData;
    if (data.action.actionID === 'notify-approve' && params !== undefined && Object.keys(params).length === 5) {
      approve(params.booking_id, params.notification_id, params.user_id, params.oneSignalUserId);
    }
    else if (data.action.actionID === 'notify-cancel' && params !== undefined && Object.keys(params).length === 5) {
      cancel(params.booking_id, params.notification_id, params.user_id, params.oneSignalUserId);
    }
  }

  const approve = async (booking_id, notification_id, user_id, oneSignalUserId = '') => {
    UpdateBookingStatus({ booking_id: booking_id, status: 1 }, props.access_token);
    const status = await ReadNotification({ id: notification_id }, props.access_token);
    const heading = "Your Booking is confirmed";
    const content = "Your Booking with ID " + booking_id + " has been approved!";
    const saveNotify = await SaveNotification({ user_id: user_id, booking_id: booking_id, type: 'booking', heading: heading, content: content, notify_to: 'user' }, props.access_token);
    const notifyData = { action: 'approve', notification_id: saveNotify.data.id, booking_id: saveNotify.data.booking_id };
    SendNotification(heading, content, [], notifyData, oneSignalUserId);
    if (status) {
      reloadData();
    }
  }

  const cancel = async (booking_id, notification_id, user_id, oneSignalUserId = '') => {
    UpdateBookingStatus({ booking_id: booking_id, status: 2 }, props.access_token);
    const status = await ReadNotification({ id: notification_id }, props.access_token);
    const heading = "Your Booking is cancelled";
    const content = "Your Booking with ID " + booking_id + " has not been approved!";
    const saveNotify = await SaveNotification({ user_id: user_id, booking_id: booking_id, type: 'cancel', heading: heading, content: content, notify_to: 'user' }, props.access_token);
    const notifyData = { action: 'cancel', notification_id: saveNotify.data.id, booking_id: saveNotify.data.booking_id };
    SendNotification(heading, content, [], notifyData, oneSignalUserId);
    if (status) {
      reloadData();
    }
  }

  const reloadData = async () => {
    setData([]);
    const response = await ViewNotifications(props.access_token);
    setData(response.length > 0 ? response : -1);
  }

  const RefreshIcon = () => <Icon name='refresh-outline' fill='#FFF' />;

  const RefreshAction = () => (
    <Ripple onPress={reloadData}>
      <TopNavigationAction icon={RefreshIcon} />
    </Ripple>
  );

  const NoData = () => {
    return (
      <View style={styles.noData}>
        <Text>No notification at this time!</Text>
      </View>
    )
  }

  return (
    <View style={styles.backContainer}>
      <NavigationEvents
        onWillFocus={reloadData}
      />
      <TopNavSimple screenTitle='Notifications' backHandler={() => navigation.goBack()} rightControl={true} rightControlFun={RefreshAction} />
      <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
        {data === -1 ? <NoData /> : data.length === 0 ? <NotificationsSK /> : <Notifications data={data} token={props.access_token} reload={reloadData} approve={approve} cancel={cancel} />}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(NotificationsScreen);

const themedStyles = StyleService.create({
  backContainer: {
    backgroundColor: 'background-basic-color-1',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 10
  },
  noData: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 700,
  },
})