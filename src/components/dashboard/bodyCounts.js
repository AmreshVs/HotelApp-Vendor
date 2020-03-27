import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const BodyCounts = (props) => {
    return(
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

const styles = StyleSheet.create({
    container:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countsContainer:{
        width: '40%',
        height: 100,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#EEE',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row:{
        flexDirection: 'row',
    },
    count:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3366FF'
    },
    caption:{
        color: '#BBB',
    },
    heading:{
        marginLeft: 35,
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 17,
        color: '#626262'
    }
});