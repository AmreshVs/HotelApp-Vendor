import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadVendorList from '../../redux/thunkActions/loadVendorList';

import BookingsOverviewSK from '../../components/skeletons/bookingsOverviewSK';
import AgentsList from '../../components/agents/agentsList';

const NoBookings = (props) => {

  const styles = useStyleSheet(themedStyle);

  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Bookings has been {props.txt} yet!</Text>
    </View>
  );
}

const AgentsScreen = (props) => {

  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation();
  const [data, setData] = React.useState({});

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadVendorList(props.access_token);
      setData(response);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });
  }, []);

  const reloadData = async () => {
    setData([]);
    const response = await LoadVendorList(props.access_token);
    setData(response);
  }

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Agents List' />
      {data[0] === undefined ? <BookingsOverviewSK /> : (data.length > 0 ? data.map((item, index) => (<AgentsList key={item.firstname} delay={index} firstname={item.firstname} numBookings={item.no_of_booking} blocked={item.blocked} completed={item.completed} cancelled={item.cancelled} />)) : <NoBookings txt='made' />)}
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(AgentsScreen);

const themedStyle = StyleService.create({
  bodyContainer: {
    height: '100%',
  },
  noDataContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'color-basic-700',
  },
  tabs: {
    padding: 10,
  },
});