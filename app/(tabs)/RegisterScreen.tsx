import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Menu: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua field harus diisi');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password tidak sama');
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', { username, password });
      if (response.data.success) {
        Alert.alert('Registrasi Berhasil', 'Silakan login');
        navigation.replace('Login');
      } else {
        Alert.alert('Registrasi Gagal', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan, coba lagi');
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="Confirm Password" secureTextEntry onChangeText={setConfirmPassword} />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
