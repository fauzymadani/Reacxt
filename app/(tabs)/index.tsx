import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipe data untuk user
type User = {
  id_user: number;
  tipe_user: string;
  nama: string;
  alamat: string;
  telpon: string;
  username: string;
};

// Tipe untuk navigasi
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Stack = createNativeStackNavigator();

// Tidak ada lagi NavigationContainer di sini
const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id_user.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nama}</Text>
            <Text style={styles.itemType}>Type: {item.tipe_user}</Text>
            <Text style={styles.itemAddress}>Address: {item.alamat}</Text>
            <Text style={styles.itemPhone}>Phone: {item.telpon}</Text>
            <Text style={styles.itemUsername}>Username: {item.username}</Text>
          </View>
        )}
      />
      <View style={styles.navButtons}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
    </View>
  );
};

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemType: {
    fontSize: 16,
    color: '#007bff',
  },
  itemAddress: {
    fontSize: 14,
    color: '#6c757d',
  },
  itemPhone: {
    fontSize: 14,
    color: '#6c757d',
  },
  itemUsername: {
    fontSize: 14,
    color: '#28a745',
  },
  navButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
