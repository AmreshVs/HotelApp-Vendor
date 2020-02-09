import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

const HeadCount = (props) =>{

  return(
  <View style={styles.searchCard}>
    <View style={styles.row}>
        <View style={styles.countContainer}>
            <Text style={styles.count}>₹{props.bookingCount.total_revenue}</Text>
            <Text style={styles.caption}>Total Revenue</Text>
        </View>
        <View style={styles.countContainer}>
            <Text style={styles.count}>₹{props.bookingCount.today_revenue}</Text>
            <Text style={styles.caption}>Today Revenue</Text>
        </View>
    </View>
    <View style={styles.row}>
        <View style={styles.countContainer}>
            <Text style={styles.count}>{props.bookingCount.total_bookings}</Text>
            <Text style={styles.caption}>Total Bookings</Text>
        </View>
        <View style={styles.countContainer}>
            <Text style={styles.count}>{props.bookingCount.today_bookings}</Text>
            <Text style={styles.caption}>Today Bookings</Text>
        </View>
    </View>
  </View>
  );
}

export default HeadCount;

const styles = StyleSheet.create({
    searchCard:{
        marginTop: -85,
        margin: '10%',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#EEE',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    count:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3366FF'
    },
    caption:{
        color: '#BBB',
    },
    countContainer:{
        width: '50%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});