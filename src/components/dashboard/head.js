import React from 'react';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from "react-native-responsive-fontsize";

const DashboardHead = () => {

  const styles = useStyleSheet(themedStyle);

  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1947eb', '#006df7', '#0059e2']} style={styles.headerGradient}>
      <Text style={styles.title}>Welcome Admin!</Text>
      <Text style={styles.Hoteltitle}>Hotel New Delhi</Text>
    </LinearGradient>
  )
}

export default DashboardHead;

const themedStyle = StyleService.create({
  headerGradient: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: RFPercentage(1.8),
    fontWeight: 'bold',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    color: 'color-basic-100',
    textAlign: 'center',
    paddingTop: 20,
  },
  Hoteltitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    color: 'color-basic-100',
    textAlign: 'center',
    paddingTop: 20,
  }
})