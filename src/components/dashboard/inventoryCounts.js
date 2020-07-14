import React from 'react';
import { View } from 'react-native';
import { Text, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

const InventoryCounts = (props) => {

  const styles = useStyleSheet(themedStyle);

  const renderIcon = (name, color) => <Icon name={name} width={37} height={37} fill={color}/>

  return (
    <View>
      <Text style={styles.heading}>{props.name}</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <Animatable.View style={styles.countsContainer} animation="fadeInLeft" direction="normal" duration={500} useNativeDriver={true} >
            <View style={styles.iconContainer}>
              {renderIcon('clipboard-outline', styles.icon.color3)}
            </View>
            <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.Available : 0}</Text>
            <Text style={styles.caption}>Available</Text>
          </Animatable.View>
          <Animatable.View style={styles.countsContainer} animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} >
            <View style={styles.iconContainer}>
              {renderIcon('checkmark-square-outline', styles.icon.color5)}
            </View>
            <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.Sold : 0}</Text>
            <Text style={styles.caption}>Sold</Text>
          </Animatable.View>
        </View>
        <Animatable.View style={styles.countsContainer} animation="fadeInUp" direction="normal" duration={500} useNativeDriver={true} >
          <View style={styles.iconContainer}>
            {renderIcon('close-square-outline', styles.icon.color4)}
          </View>
          <Text style={styles.count}>{props.bookingCount !== undefined ? props.bookingCount.Blocked : 0}</Text>
          <Text style={styles.caption}>Blocked</Text>
        </Animatable.View>
      </View>
    </View>
  );
}

export default InventoryCounts;

const themedStyle = StyleService.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countsContainer: {
    width: '40%',
    // height: 100,
    margin: 10,
    padding: 10,
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
    color: 'color-primary-500',
  },
  caption: {
    color: 'color-basic-600',
    fontSize: RFPercentage(1.8)
  },
  heading: {
    marginLeft: 35,
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 17,
    color: 'color-basic-700'
  },
  iconContainer:{
    backgroundColor: 'color-basic-200',
    margin: 10,
    padding: 15,
    borderRadius: 30,
  },
  icon:{
    color1: 'color-primary-500',
    color2: 'color-success-500',
    color3: 'color-info-500',
    color4: 'color-danger-500',
    color5: 'color-warning-500',
  }
});