import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import themedStyle from './styles';
import LoadHomeData from '../../redux/thunkActions/loadHomeData';
import DashboardHead from '../../components/dashboard/head';
import HeadCounts from '../../components/dashboard/headCounts';
import BodyCounts from '../../components/dashboard/bodyCounts';
import InventoryCounts from '../../components/dashboard/inventoryCounts';

import HeadSK from '../../components/skeletons/dashboard/headSK';
import BookingsCount from '../../components/skeletons/dashboard/bookingsSK';

const HomeScreen = (props) => {

  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function loadDatas(){
      const response = await LoadHomeData(props.access_token);
      setData(response);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    })
  }, [])

  const reloadData = async () => {
    setData([]);
    const rdata = await LoadHomeData(props.access_token);
    setData(rdata);
  }

  return (
    <ScrollView style={styles.statusBarTop} showsVerticalScrollIndicator={false}>
      <DashboardHead/>
      {data.length <= 0 ? <HeadSK/> : <HeadCounts bookingCount={data.amount_based} />}
      {data.length <= 0 ? <BookingsCount/> : <InventoryCounts name="Inventory" bookingCount={data.Inventory} />}
      {data.length <= 0 ? <BookingsCount/> : <BodyCounts name="Bookings" bookingCount={data.booking_count} />}
      {data.length <= 0 ? <BookingsCount/> : <BodyCounts name="Agent Bookings" bookingCount={data.agent_booking_count} />}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(HomeScreen);
