import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet, View } from 'react-native';

const HeadSK = () => {
    return(
        <View style={styles.cardContainer}>
            <SkeletonContent
                containerStyle={styles.placeholderContainer}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder,
                    styles.textPlaceholder1,
                ]}
            >
            </SkeletonContent>
            <SkeletonContent
                containerStyle={styles.placeholderContainer1}
                isLoading={true}
                animationType="pulse"
                layout={[
                    styles.textPlaceholder,
                    styles.textPlaceholder1,
                ]}
            >
            </SkeletonContent>
        </View>
    )
}

export default HeadSK;

const styles = StyleSheet.create({
    cardContainer:{
        width: 330,
        height: 160,
        marginTop: -85,
        margin: '10%',
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        borderWidth: 1,
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
        justifyContent: 'center',
    },
    placeholderContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    placeholderContainer1:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textPlaceholder:{
        width: 120,
        height: 35,
        padding: 1,
        borderRadius: 10,
    },
    textPlaceholder1:{
        width: 120,
        height: 35,
        padding: 1,
        borderRadius: 10,
    },
})