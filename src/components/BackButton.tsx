import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function backButton() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
                <AntDesign name="arrowleft" size={20} color="white" />
            </View>
        </TouchableOpacity>
    )
}
