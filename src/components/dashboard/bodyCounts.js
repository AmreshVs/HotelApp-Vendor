import React from 'react';
import { View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const BodyCounts = (props) => {

  const styles = useStyleSheet(themedStyle);

  return (
    <View>
      <Text style={styles.heading}>{props.name}</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.countsContainer}>
            <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.upcoming : 0}</Text>
            <Text style={styles.caption}>Upcoming</Text>
          </View>
          <View style={styles.countsContainer}>
            <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.complete : 0}</Text>
            <Text style={styles.caption}>Complete</Text>
          </View>
        </View>
        <View style={styles.countsContainer}>
          <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.cancel : 0}</Text>
          <Text style={styles.caption}>Cancel</Text>
        </View>
      </View>
    </View>
  );
}

export default BodyCounts;

const themedStyle = StyleService.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countsContainer: {
    width: '40%',
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
  row: {
    flexDirection: 'row',
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'color-primary-500'
  },
  caption: {
    color: 'color-basic-600',
  },
  heading: {
    marginLeft: 35,
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'color-basic-700'
  }
});