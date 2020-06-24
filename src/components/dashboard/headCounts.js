import React from 'react';
import { View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

const HeadCount = (props) => {

  const styles = useStyleSheet(themedStyle);

  return (
    <Animatable.View style={styles.searchCard} animation="fadeInDown" direction="normal" duration={500} useNativeDriver={true} >
      <View style={styles.row}>
        <View style={styles.countContainer}>
          <Text style={styles.count}>₹{props.bookingCount !== undefined ? props.bookingCount.total_revenue : 0}</Text>
          <Text style={styles.caption}>Total Revenue</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.count}>₹{props.bookingCount !== undefined ? props.bookingCount.today_revenue : 0}</Text>
          <Text style={styles.caption}>Today Revenue</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.total_bookings : 0}</Text>
          <Text style={styles.caption}>Total Bookings</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.today_bookings : 0}</Text>
          <Text style={styles.caption}>Today Bookings</Text>
        </View>
      </View>
    </Animatable.View>
  );
}

export default HeadCount;

const themedStyle = StyleService.create({
  searchCard: {
    marginTop: -85,
    margin: '10%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'background-basic-color-1',
    borderColor: 'color-basic-400',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  count: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: 'color-primary-500',
  },
  caption: {
    color: 'color-basic-600',
    fontSize: RFPercentage(1.8)
  },
  countContainer: {
    width: '50%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});