import React from 'react';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
import { StyleSheet, View } from 'react-native';

const BookingsSK = () => {
    return(
        <View>
            <View style={styles.cards}>
                <View style={styles.cardContainer}>
                    <SkeletonContent
                        containerStyle={styles.placeholderContainer}
                        isLoading={true}
                        animationType="pulse"
                        layout={[
                            styles.textPlaceholder,
                        ]}
                    >
                    </SkeletonContent>
                </View>
                <View style={styles.cardContainer}>
                    <SkeletonContent
                        containerStyle={styles.placeholderContainer}
                        isLoading={true}
                        animationType="pulse"
                        layout={[
                            styles.textPlaceholder,
                        ]}
                    >
                    </SkeletonContent>
                </View>
            </View>
            <View style={styles.cards}>
                <View style={styles.cardContainer}>
                    <SkeletonContent
                        containerStyle={styles.placeholderContainer}
                        isLoading={true}
                        animationType="pulse"
                        layout={[
                            styles.textPlaceholder,
                        ]}
                    >
                    </SkeletonContent>
                </View>
            </View>
        </View>
    )
}

export default BookingsSK;

const styles = StyleSheet.create({
    cards:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cardContainer:{
        width: '40%',
        height: 100,
        margin: 10,
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
        alignItems: 'center',
    },
    placeholderContainer:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPlaceholder:{
        width: 120,
        height: 35,
        padding: 1,
        borderRadius: 10,
    },
})