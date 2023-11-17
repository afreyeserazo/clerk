import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ModalsLayout = () => {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name='login'
                options={{
                    presentation: 'modal',
                    title: 'Login',
                    headerTitleStyle: { fontFamily: 'mon-sb' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='close-outline' size={28}/>
                        </TouchableOpacity>
                    )
                }}
            />

            <Stack.Screen
                name='register'
                options={{
                    presentation: 'modal',
                    title: 'Register',
                    headerTitleStyle: { fontFamily: 'mon-sb' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='close-outline' size={28}/>
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen
                name='reset'
                options={{
                    presentation: 'modal',
                    title: 'Reset Password',
                    headerTitleStyle: { fontFamily: 'mon-sb' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='close-outline' size={28}/>
                        </TouchableOpacity>
                    )
                }}
            />
        
        </Stack>
    );
};

export default ModalsLayout;