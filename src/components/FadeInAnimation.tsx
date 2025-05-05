import React, { useEffect } from 'react'
import { FadeAnimationProps } from '../types/types'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated'

export default function FadeInAnimation({ children, duration, delay = 0 }: FadeAnimationProps) {

    // Reanimatedin useState?
    const fade = useSharedValue(0);

    useEffect(() => {
        fade.value = 0;
        fade.value = withDelay(delay, withTiming(1, { duration }));
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