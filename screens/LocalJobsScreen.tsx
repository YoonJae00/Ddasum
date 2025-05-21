// 파일: app/screens/LocalJobsScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

interface JobItem {
  id: string;
  title: string;
  pay: string;
  image: { uri: string };
  location: string;
  time: string;
}

const localJobs: JobItem[] = Array.from({ length: 8 }).map((_, idx) => ({
  id: `local-${idx}`,
  title: `동네일 공고 ${idx + 1}`,
  pay: `시급 ₩${(idx + 1) * 1200}`,
  image: { uri: 'https://via.placeholder.com/100/FF6F61/fff?text=동네' },
  location: '서초구',
  time: `${idx + 1}일 전`,
}));

const publicJobs: JobItem[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `public-${idx}`,
  title: `공공일 공고 ${idx + 1}`,
  pay: `시급 ₩${(idx + 1) * 1100}`,
  image: { uri: 'https://via.placeholder.com/100/FFDAB9/333?text=공공' },
  location: '강남구',
  time: `${idx + 2}일 전`,
}));

export default function LocalJobsScreen() {
  const [selectedTab, setSelectedTab] = useState<'local' | 'public'>('local');
  const jobs = selectedTab === 'local' ? localJobs : publicJobs;

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'local' && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab('local')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'local' && styles.tabTextActive,
            ]}
          >
            동네일
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'public' && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab('public')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'public' && styles.tabTextActive,
            ]}
          >
            공공일
          </Text>
        </TouchableOpacity>
      </View>

      {/* 검색창 */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="알바 위치나 키워드 검색"
          placeholderTextColor="#bbb"
        />
      </View>

      {/* 알바 리스트 */}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPay}>{item.pay}</Text>
              <Text style={styles.cardMeta}>
                {item.location} · {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#aaa', fontSize: 16 }}>공고가 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F6' },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 8,
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FF6F61',
    shadowColor: '#FF6F61',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 16,
    color: '#FF6F61',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 42,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#FFE1DB',
  },
  listContainer: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: { width: 90, height: 90, borderRadius: 10, margin: 10 },
  cardInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#333' },
  cardPay: { fontSize: 14, fontWeight: 'bold', marginBottom: 4, color: '#FF6F61' },
  cardMeta: { fontSize: 12, color: '#888' },
});
