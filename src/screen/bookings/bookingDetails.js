import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TopNavigationAction, Icon, useStyleSheet, StyleService } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import ConfirmBlock from '../../components/bookingDetails/confirmBlock';
import BookedHotelDetails from '../../components/bookingDetails/BookedHotelDetails';

import ConfirmBlockSK from '../../components/skeletons/bookingDetails/confirmBlockSK';
import BookedDetailsSK from '../../components/skeletons/bookingDetails/bookedDetailsSK';
import LoadBookingDetails from '../../redux/thunkActions/loadBookingDetails';

const BookingDetails = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadBookingDetails(props.access_token, props.route.params.id);
      setData(response[0]);
    }
    loadDatas();
  }, []);

  const reloadData = async () => {
    setData([]);
    const response = await LoadBookingDetails(props.access_token, props.route.params.id);
    setData(response[0]);
  }

  const RefreshIcon = () => <Icon name='refresh-outline' fill='#FFF' />;

  const RefreshAction = () => (
    <Ripple onPress={reloadData}>
      <TopNavigationAction icon={RefreshIcon} />
    </Ripple>
  );

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Booking Details' backHandler={() => navigation.goBack()} rightControl={true} rightControlFun={RefreshAction} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {data.length !== undefined && data.length <= 0 ? <ConfirmBlockSK /> : <ConfirmBlock booking_id={data.booking_id} total={data.total} status={data.status} status_label={data.status_label} transaction_id={data.transaction_id} />}
          {data.length !== undefined && data.length <= 0 ? <BookedDetailsSK /> : <BookedHotelDetails data={data} token={props.access_token} reloadData={reloadData} user_type={props.route.params.user_type || data.user_type} notify_id={props.route.params.notify_id || data.notify_id} />}
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(BookingDetails);

const themedStyle = StyleService.create({
  bodyContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    width: '96%',
  }
});