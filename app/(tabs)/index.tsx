import { useRouter } from 'expo-router';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id_user: number;
  tipe_user: string;
  nama: string;
  alamat: string;
  telpon: string;
  username: string;
};

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Gagal ambil data users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id_user.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nama}</Text>
            <Text>Tipe: {item.tipe_user}</Text>
            <Text>Alamat: {item.alamat}</Text>
            <Text>Telpon: {item.telpon}</Text>
            <Text>Username: {item.username}</Text>
          </View>
        )}
      />
      <Button title="Login" onPress={() => router.push('/login')} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: '600' },
});
