import React from 'react';
import { View } from 'react-native';
import { Text, Icon, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

import ReadNotification from '../../commonFunctions/readNotifications';

const Notifications = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const navigateBookingdetail = (id, booking_id, user_type) => {
    navigation.navigate('BookingDetails', {
      id: id,
      user_type: user_type,
      notify_id: booking_id
    });
    if (user_type !== 'editor') {
      ReadNotification({ id: booking_id }, props.token);
    }
  }

  return (
    props.data.map((item, index) =>
      <Animatable.View animation="bounceInRight" direction="normal" duration={800} useNativeDriver={true} delay={index * 50}>
        <View style={styles.cardContainer} key={item.id}>
          {item.user_type === 'editor' &&
            <View style={styles.agentContainer}>
              <Icon name='person-done-outline' fill='#FFF' width={25} height={25} />
            </View>
          }
          <Ripple style={styles.contentContainer} onPress={() => navigateBookingdetail(item.booking_id, item.id, item.user_type)}>
            <View style={styles.leftContainer}>
              <View style={[{ backgroundColor: item.type === 'booking' ? '#1EA82E' : '#D8462E' }, styles.iconContainer]}>
                {item.type === 'booking' ?
                  <Icon name='checkmark-outline' fill='#FFF' width={40} height={40} />
                  :
                  <Icon name='close-outline' fill='#FFF' width={40} height={40} />
                }
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.heading} category='h6'>{item.heading}</Text>
              <Text style={styles.caption} category='p1'>{item.content}</Text>
              <Text style={styles.datetime} category='c1'>{item.created_dt}</Text>
            </View>
          </Ripple>
          {item.user_type === 'editor' &&
            <View style={styles.actions}>
              <View style={styles.actionContainer}>
                <Button style={styles.button} appearance='outline' status='danger' size='small' onPress={() => props.cancel(item.booking_id, item.id, item.user_id, item.oneSignalUserId)}>Cancel</Button>
                <Button style={styles.button} appearance='outline' status='primary' size='small' onPress={() => props.approve(item.booking_id, item.id, item.user_id, item.oneSignalUserId)}>Approve</Button>
              </View>
            </View>
          }
        </View>
      </Animatable.View>
    )
  )
}

export default Notifications;

const themedStyles = StyleService.create({
  cardContainer: {
    width: '95%',
    borderRadius: 5,
    marginTop: 10,
    padding: 13,
    backgroundColor: 'background-basic-color-1',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  leftContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightContainer: {
    width: '80%'
  },
  datetime: {
    textAlign: 'right',
    fontSize: RFPercentage(1.8)
  },
  iconContainer: {
    borderRadius: 50,
    padding: 5
  },
  agentContainer: {
    backgroundColor: 'color-warning-400',
    width: 40,
    height: 40,
    position: 'absolute',
    borderBottomRightRadius: 50,
    paddingLeft: 3,
    paddingTop: 3
  },
  contentContainer: {
    flexDirection: 'row'
  },
  actions: {
    alignItems: 'flex-end'
  },
  actionContainer: {
    width: '80%',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '45%'
  },
  heading: {
    fontSize: RFPercentage(2)
  },
  caption:{
    fontSize: RFPercentage(1.8)
  }
})