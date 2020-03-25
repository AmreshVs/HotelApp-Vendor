import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Button } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { withNavigation } from 'react-navigation';
import ReadNotification from '../../commonFunctions/readNotifications';

const Notifications = (props) => {

  const navigateBookingdetail = (id, booking_id, user_type) => {
    props.navigation.navigate('BookingDetails',{
      id: id,
      user_type: user_type,
      notify_id: booking_id
    });
    if(user_type !== 'editor'){
      ReadNotification({id: booking_id}, props.token);
    }
  }

  return (
    props.data.map((item) => 
      <View style={styles.cardContainer} key={item.id}>
        {item.user_type === 'editor' && 
          <View style={styles.agentContainer}>
            <Icon name='person-done-outline' fill='#FFF' width={25} height={25} />
          </View>
        }
        <Ripple style={styles.contentContainer} onPress={() => navigateBookingdetail(item.booking_id, item.id, item.user_type)}>
          <View style={styles.leftContainer}>
            <View style={[{backgroundColor: item.type === 'booking' ? '#1EA82E' : '#D8462E'},styles.iconContainer]}>
              {item.type === 'booking' ? 
                <Icon name='checkmark-outline' fill='#FFF' width={40} height={40} />
                :
                <Icon name='close-outline' fill='#FFF' width={40} height={40} />
              }
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text category='h6'>{item.heading}</Text>
            <Text category='p1'>{item.content}</Text>
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
    )
  )
}

export default withNavigation(Notifications);

const styles = StyleSheet.create({
  cardContainer:{
    width: '95%',
    borderRadius: 5,
    marginTop: 10,
    padding: 13,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  leftContainer:{
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightContainer:{
    width: '80%'
  },
  datetime:{
    textAlign: 'right'
  },
  iconContainer:{
    borderRadius: 50,
    padding: 5
  },
  agentContainer:{
    backgroundColor: '#FFCB3D',
    width: 40,
    height: 40,
    position: 'absolute',
    borderBottomRightRadius: 50,
    paddingLeft: 3,
    paddingTop: 3
  },
  contentContainer:{
    flexDirection: 'row'
  },
  actions:{
    alignItems: 'flex-end'
  },
  actionContainer:{
    width: '80%',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button:{
    width: '45%'
  }
})