import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
