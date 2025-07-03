import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatTabBar from '../../components/chat/ChatTabBar';
import ChatRoomItem from '../../components/chat/ChatRoomItem';

// 일반 채팅방
const chatRooms = [
  {
    id: '1',
    type: '일자리',
    name: '아리디아 (인벤백) 7',
    lastMessage: '안녕하세요. 감사합니다',
    time: '오전 10:47',
    avatars: [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
    ],
  },
  {
    id: '2',
    type: '일자리',
    name: '김윤재',
    lastMessage: '일자리 화면이랑, 공동구매 화면에 채팅창을 넣을건데 참고해~',
    time: '오전 9:11',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    type: '공동구매',
    name: '카카오톡',
    lastMessage: '[기기 로그인 알림]',
    time: '오전 7:46',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/KaKaoTalk_logo.svg',
  },
];

// 따숨운영팀 채팅방
const opsRooms = [
  {
    id: 'op1',
    type: '광고',
    name: '따숨 운영팀',
    lastMessage: '이벤트 안내드립니다!',
    time: '어제',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    id: 'op2',
    type: '이벤트',
    name: '따숨 운영팀',
    lastMessage: '신규 기능이 추가되었습니다.',
    time: '2일전',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
];

const opsFilters = ['전체', '광고', '이벤트'];

export default function ChatListScreen({ navigation }) {
  const [tab, setTab] = useState('일반');
  const [filter, setFilter] = useState('전체');

  // 탭별 데이터/필터
  const rooms = tab === '일반' ? chatRooms : opsRooms;
  const filters = tab === '일반' ? ['전체', '일자리', '공동구매'] : opsFilters;

  // 필터링
  const filteredRooms =
    filter === '전체' ? rooms : rooms.filter(r => r.type === filter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채팅</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* 탭 */}
      <ChatTabBar tab={tab} setTab={t => { setTab(t); setFilter('전체'); }} />
      {/* 필터 버튼 */}
      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 채팅방 목록 */}
      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatRoomItem room={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#aaa', fontSize: 16 }}>채팅방이 없습니다.</Text>
          </View>
        }
      />
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterBtnActive: {
    backgroundColor: '#FF6F61',
  },
  filterText: {
    fontSize: 13,
    color: '#888',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});