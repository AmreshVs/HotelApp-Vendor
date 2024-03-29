import React from 'react';
import { View } from 'react-native';
import { Card, Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

const ConfirmBlock = (props) => {

  const styles = useStyleSheet(themedStyle);
  var bgClr = '';
  if (props.status === 1 || props.status === 4 || props.status === 6 || props.status === 7) {
    bgClr = '#19b752';
  }
  if (props.status === 2) {
    bgClr = '#DB2C36';
  }
  if(props.status === 5){
    bgClr = '#AAA';
  }

  return (
    <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true}>
      <Card style={[styles.container, { backgroundColor: bgClr }]}>
        <View style={styles.bookingContainer}>
          <Icon name='checkmark-circle-outline' style={styles.checkIcon} fill={styles.iconColor.color} />
          {props.status !== 6 ?
            <Text style={styles.confirmed}>Booking is {props.status === 5 ? 'Blocked' : props.status === 7 ? 'completed' : props.status_label}!</Text>
            :
            <Text style={styles.confirmed}>{props.status === 6 ? 'Checked In' : 'Checked Out'}!</Text>
          }
          <Text style={styles.bookingCaption}>booking ID is #{props.booking_id}.</Text>
          {props.transaction_id === '' || props.transaction_id === '-' ? <Text style={styles.caption}>The booking has been made for the amount of ₹{props.total}</Text> : <Text style={styles.caption}> Your payment is successfull and Transaction ID is {props.transaction_id}. Now Check In to your rooms hassle free.</Text>}
        </View>
      </Card>
    </Animatable.View>
  )
}

export default ConfirmBlock;

const themedStyle = StyleService.create({
  container: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
  },
  bookingContainer: {
    alignItems: 'center',
  },
  confirmed: {
    color: 'background-basic-color-1',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 2,
  },
  checkIcon: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  caption: {
    paddingTop: 20,
    paddingBottom: 5,
    textAlign: 'center',
    color: 'background-basic-color-1'
  },
  bookingCaption: {
    textAlign: 'center',
    color: 'background-basic-color-1',
    fontSize: 16,
    paddingTop: 10,
  },
  iconColor: {
    color: 'color-basic-100'
  }
});