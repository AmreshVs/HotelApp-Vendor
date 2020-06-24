import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import themedStyle from './styles';
import LoadHomeData from '../../redux/thunkActions/loadHomeData';
import DashboardHead from '../../components/dashboard/head';
import HeadCounts from '../../components/dashboard/headCounts';
import BodyCounts from '../../components/dashboard/bodyCounts';
import InventoryCounts from '../../components/dashboard/inventoryCounts';
import Loader from '../../components/loader';

const HomeScreen = (props) => {

  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function loadDatas(){
      const response = await LoadHomeData(props.access_token);
      setData(response);
      setLoading(false);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    })
  }, [])

  const reloadData = async () => {
    setRefresh(true);
    const rdata = await LoadHomeData(props.access_token);
    setData(rdata);
    setRefresh(false);
  }

  return (
    loading === true ? 
    <Loader />
    :
    <ScrollView style={styles.statusBarTop} showsVerticalScrollIndicator={false}
      RefreshControl={
        <RefreshControl 
          refreshing={refresh}
          onRefresh={reloadData}
        />
      }
    >
      <DashboardHead/>
      <HeadCounts bookingCount={data.amount_based} />
      <InventoryCounts name="Inventory" bookingCount={data.Inventory} />
      <BodyCounts name="Bookings" type="" bookingCount={data.booking_count} />
      <BodyCounts name="Agent Bookings" type="agent" bookingCount={data.agent_booking_count} />
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(HomeScreen);
