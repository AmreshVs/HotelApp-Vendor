import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { withNavigation } from 'react-navigation';

const Notifications = (props) => {

  const navigateBookingdetail = (id) => {
    props.navigation.navigate('BookingDetails',{
      id: id
    });
  }

  return (
    props.data.map((item) => 
      <Ripple style={styles.cardContainer} key={item.id} onPress={() => navigateBookingdetail(item.booking_id)}>
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
    flexDirection: 'row'
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
  }
})