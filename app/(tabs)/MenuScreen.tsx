import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Invoice: undefined;
  Profile: undefined;
  Login: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Invoice'>;
};

export default function MenuScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Menu</Text>
      <Button title="Invoice" onPress={() => navigation.navigate('Invoice')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
