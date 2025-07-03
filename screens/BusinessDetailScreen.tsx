import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessDetailScreen() {
  const navigation = useNavigation();

  // 실제 데이터는 route.params 등으로 받아오세요
  const business = {
    number: '123-12-12345',
    name: '주식회사이리디아',
    owner: '홍길동',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>사업자 정보 상세보기</Text>
        <View style={{ width: 24 }} /> {/* 오른쪽 여백용 */}
      </View>

      {/* 내용 */}
      <View style={styles.section}>
        <Text style={styles.label}>사업자등록번호</Text>
        <Text style={styles.value}>{business.number}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>상호(법인/단체명)</Text>
        <Text style={styles.value}>{business.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>대표자 성명</Text>
        <Text style={styles.value}>{business.owner}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
});