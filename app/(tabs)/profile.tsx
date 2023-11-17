import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';

const Profile = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default Profile;