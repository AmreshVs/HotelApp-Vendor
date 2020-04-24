import React from 'react';
import { View } from 'react-native';
import { Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';

const AgentsList = (props) => {

  const styles = useStyleSheet(themedStyle);

  return (
    <Animatable.View style={styles.container}  animation="bounceInLeft" direction="normal" duration={800} useNativeDriver={true} delay={props.delay * 20}>
      <View style={styles.nameContainer}>
        <View style={styles.leftText}>
          <Icon width={32} height={32} name="person-done-outline" fill='#3366FF' />
          <Text style={styles.heading}>{props.firstname}</Text>
        </View>
        <View style={styles.rightText}>
          <Text style={styles.heading}>Bookings : </Text>
          <Text style={styles.heading}>{props.numBookings}</Text>
        </View>
      </View>
      <View>
        <View style={styles.row}>
          <View style={styles.countContainer}>
            <Text style={[styles.count, styles.color1]}>{props.blocked}</Text>
            <Text style={styles.caption}>Blocked</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={[styles.count, styles.color2]}>{props.completed}</Text>
            <Text style={styles.caption}>Completed</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={[styles.count, styles.color3]}>{props.cancelled}</Text>
            <Text style={styles.caption}>Cancelled</Text>
          </View>
        </View>
      </View>
    </Animatable.View>
  )
}

export default AgentsList;

const themedStyle = StyleService.create({
  container: {
    width: '95%',
    height: 150,
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: 'background-basic-color-1',
    borderColor: 'color-basic-300',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'color-basic-700',
    paddingTop: 5,
    paddingLeft: 5,
  },
  caption: {
    color: 'color-basic-600'
  },
  color1: {
    color: 'color-primary-500'
  },
  color2: {
    color: 'color-success-500'
  },
  color3: {
    color: 'color-danger-500'
  },
  leftText: {
    flexDirection: 'row',
  },
  rightText: {
    flexDirection: 'row',
  },
  nameContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countContainer: {
    width: '30%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-basic-200',
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});