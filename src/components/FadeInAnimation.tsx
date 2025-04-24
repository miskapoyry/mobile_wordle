import React, { useCallback, useEffect } from 'react'
import { FadeAnimationProps } from '../types/types'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native';

export default function FadeInAnimation({ children, duration }: FadeAnimationProps) {

    // Reanimatedin useState?
    const fade = useSharedValue(0);

    useEffect(() => {
        fade.value = 0;
        fade.value = withTiming(1, { duration });
    }, [duration])
    
      const animatedStyle = useAnimatedStyle(() => ({
        opacity: fade.value,
      }));
      
    return (
        <Animated.View style={[animatedStyle]}>
            {children}
        </Animated.View>
    )
}