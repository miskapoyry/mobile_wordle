import { View } from 'react-native'
import React from 'react'
import { HeaderProps } from '../types/types';
import { styles } from '../styles/styles';
import { Text } from "react-native-paper";

const PageHeader = ({ title, description, style }: HeaderProps) => {
    return (
        <View style={[style]}>
            <Text style={styles.title}>{title}</Text>
            <Text variant="titleSmall" style={styles.description}>{description}</Text>
        </View>
    );
};

export default PageHeader;