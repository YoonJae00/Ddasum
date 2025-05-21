// 파일: app/screens/MyDdasumScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { id: '1', title: '내 동네생활 글', icon: 'chatbubble-outline' },
  { id: '2', title: '내 알바 글', icon: 'briefcase-outline' },
  { id: '3', title: '내 공동구매 참여', icon: 'cart-outline' },
  { id: '4', title: '즐겨찾기', icon: 'heart-outline' },
  { id: '5', title: '설정', icon: 'settings-outline' },
];

export default function MyDdasumScreen() {
  const userName = '홍길동'; // TODO: 실제 사용자명으로 교체
  const userAvatar = { uri: 'https://via.placeholder.com/80' };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 프로필 섹션 */}
      <View style={styles.profileSection}>
        <Image source={userAvatar} style={styles.avatar} />
        <Text style={styles.userName}>{userName}님</Text>
      </View>

      {/* 메뉴 리스트 */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name={item.icon} size={22} color="#FF6F61" />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FF6F61',
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  userName: { fontSize: 20, fontWeight: '600', color: '#fff' },
  menuContainer: { paddingVertical: 12 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuText: { fontSize: 16, marginLeft: 12, color: '#333' },
});