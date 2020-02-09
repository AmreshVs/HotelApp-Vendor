import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import LoadVendorList from '../../redux/thunkActions/loadVendorList';
import { NavigationEvents } from 'react-navigation';

import BookingsOverviewSK from '../../components/skeletons/bookingsOverviewSK';
import AgentsList from '../../components/agents/agentsList';

const NoBookings = (props) => {
    return(
        <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No Bookings has been {props.txt} yet!</Text>
        </View>
    );
}

const AgentsScreen = (props) => {

    const [data, setData] = React.useState({});

    useEffect(() => {
      async function loadDatas(){
        const response = await LoadVendorList(props.access_token);
        setData(response);
      }
      loadDatas();
    }, []);

    const reloadData = async () => {
        setData([]);
        const response = await LoadVendorList(props.access_token);
        setData(response);
    }

    return(
        <View style={styles.bodyContainer}>
            <NavigationEvents
                onWillFocus={reloadData}
            />
            <TopNavSimple screenTitle='Agents List' backHandler={() => props.navigation.goBack()} />
            {data[0] === undefined ? <BookingsOverviewSK/> : (data.length > 0 ? data.map((item) => (<AgentsList key={item.firstname} firstname={item.firstname} numBookings={item.no_of_booking} blocked={item.blocked} completed={item.completed} cancelled={item.cancelled} />)) : <NoBookings txt='made'/>)}
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(AgentsScreen));

const styles = StyleSheet.create({
    bodyContainer:{
        backgroundColor: '#FAFAFA',
        height: '100%',
    },
    noDataContainer:{
        height: '90%',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText:{
        fontSize: 16,
        color: '#626262',
    },
    tabs:{
        padding: 10,
    },
});