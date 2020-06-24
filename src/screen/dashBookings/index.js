import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, Tab, TabView, StyleService, useStyleSheet } from '@ui-kitten/components';
import { connect } from 'react-redux';

import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadBookingHistory from '../../redux/thunkActions/loadBookingsHistory';
import LoadAgentBookingHistory from '../../redux/thunkActions/loadAgentHistory';
import BookingsOverview from '../../components/bookings/index';
import Loader from '../../components/loader';

const NoBookings = (props) => {

  const styles = useStyleSheet(style);

  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Bookings has been {props.txt} yet!</Text>
    </View>
  );
}

const DashBookingScreen = (props) => {
  
  const styles = useStyleSheet(style);
  const shouldLoadComponent = (index) => index === selectedIndex;
  const [data, setData] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState(props.route.params.index || 0);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  let user_id = props.route.params.user_id || '';
  let type = props.route.params.type || '';

  useEffect(() => {
    async function loadDatas() {
      var response = '';
      if(type === 'specific'){
        response = await LoadAgentBookingHistory(props.userData.access_token, user_id);
      }
      else if(type === 'all'){
        response = await LoadAgentBookingHistory(props.userData.access_token);
      }
      else{
        response = await LoadBookingHistory(props.userData.access_token);
      }
      setData(response);
      setLoading(false);
    }
    loadDatas();
  }, []);

  const reloadData = async () => {
    setRefresh(true);
    var response = '';
    if(type === 'specific'){
      response = await LoadAgentBookingHistory(user_id, props.userData.access_token);
    }
    else if(type === 'all'){
      response = await LoadAgentBookingHistory(props.userData.access_token);
    }
    else{
      response = await LoadBookingHistory(props.userData.access_token);
    }
    setData(response);
    setRefresh(false);
  }

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Your Bookings' />
      <TabView
        selectedIndex={selectedIndex}
        shouldLoadComponent={shouldLoadComponent}
        onSelect={setSelectedIndex}>
        <Tab style={styles.tabs} title='Upcoming'>
          {loading === true ? <Loader topBottom={true} /> : (data.upcoming.length > 0 ? <BookingsOverview data={data.upcoming} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='made' />)}
        </Tab>
        <Tab style={styles.tabs} title='Completed'>
          {loading === true ? <Loader topBottom={true} /> : (data.complete.length > 0 ? <BookingsOverview data={data.complete} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='completed' />)}
        </Tab>
        <Tab style={styles.tabs} title='Cancelled'>
          {loading === true ? <Loader topBottom={true} /> : (data.cancelled.length > 0 ? <BookingsOverview data={data.cancelled} refresh={refresh} reloadData={reloadData} /> : <NoBookings txt='cancelled' />)}
        </Tab>
      </TabView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(DashBookingScreen);

const style = StyleService.create({
  bodyContainer: {
    backgroundColor: 'background-basic-color-2',
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