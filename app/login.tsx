// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // <- thêm dòng này

const LoginScreen = () => {
  const router = useRouter(); // ✅ Đúng: đặt bên trong component
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const handleLogin = async () => {
    if (!user || !pass) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch('http://192.168.2.148:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, pass }),
      });

      const result = await response.json();
      console.log('Phản hồi server:', result); // debug server response

      if (result.success) {
        // 🟢 Chuyển sang trang explore nếu đăng nhập thành công
        router.replace('/explore');
      } else {
        Alert.alert('Đăng nhập thất bại!', result.message || 'Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default LoginScreen;
