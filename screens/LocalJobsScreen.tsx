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
import { useRoute } from '@react-navigation/native';
import JobFilterModal from '../components/JobFilterModal'; // 경로에 맞게 import
import AppHeader from '../components/AppHeader';

interface JobItem {
  id: string;
  title: string;
  pay: string;
  image: { uri: string };
  location: string;
  time: string;
  company: string;
  wageType: string;
  wage: string;
  workTime: string;
  tag?: string;
  urgent?: boolean;
}


// 동네 일자리 더미 데이터 (예시)
// 실제 앱에서는 API로부터 데이터를 받아와야 함.
const localJobs: JobItem[] = Array.from({ length: 8 }).map((_, idx) => ({
  id: `local-${idx}`,
  title: idx % 2 === 0 ? '(주)이리디아 정직원 채용공고' : '편의점 아르바이트',
  pay: idx % 2 === 0 ? '월급 500만원' : '시급 20,000원',
  image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
  location: '성동구 행당동',
  time: `${idx + 1}일전`,
  company: idx % 2 === 0 ? '(주)이리디아' : 'CU편의점',
  wageType: idx % 2 === 0 ? '월급' : '시급',
  wage: idx % 2 === 0 ? '500만원' : '20,000원',
  workTime: '09:00 ~ 17:00',
  tag: idx % 2 === 0 ? undefined : '단기',
  urgent: idx % 3 === 0,
}));

// 공공 일자리 더미 데이터 (예시)
// 실제 앱에서는 API로부터 데이터를 받아와야 합니다.
const publicJobs: JobItem[] = Array.from({ length: 6 }).map((_, idx) => ({
  id: `public-${idx}`,
  title: `공공일 공고 ${idx + 1}`,
  pay: `시급 ₩${(idx + 1) * 1100}`,
  image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
  location: '강남구',
  time: `${idx + 2}일전`,
  company: '공공기관',
  wageType: '시급',
  wage: `${(idx + 1) * 1100}원`,
  workTime: '09:00 ~ 17:00',
}));

// 이웃요청 더미 데이터 (예시)
const neighborJobs: JobItem[] = Array.from({ length: 4 }).map((_, idx) => ({
  id: `neighbor-${idx}`,
  title: '이웃 요청 예시',
  pay: '건별 10,000원',
  image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
  location: '성동구 행당동',
  time: `${idx + 1}일전`,
  company: '이웃',
  wageType: '건별',
  wage: '10,000원',
  workTime: '13:00 ~ 15:00',
  tag: '심부름',
  urgent: false,
}));

export default function LocalJobsScreen() {
  const route = useRoute();
  const [selectedTab, setSelectedTab] = useState<'local' | 'neighbor' | 'public'>('local');
  const [filterVisible, setFilterVisible] = useState(false);
  let jobs: JobItem[] = [];
  if (selectedTab === 'local') jobs = localJobs;
  else if (selectedTab === 'neighbor') jobs = neighborJobs;
  else jobs = publicJobs;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader routeName={route.name} />
      {/* 검색창 */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="우리동네 일자리 검색"
          placeholderTextColor="#bbb"
        />
      </View>

      {/* 탭 */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'local' && styles.tabActive]}
          onPress={() => setSelectedTab('local')}
        >
          <Text style={[styles.tabText, selectedTab === 'local' && styles.tabTextActive]}>
            동네 일자리
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'neighbor' && styles.tabActive]}
          onPress={() => setSelectedTab('neighbor')}
        >
          <Text style={[styles.tabText, selectedTab === 'neighbor' && styles.tabTextActive]}>
            이웃요청
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'public' && styles.tabActive]}
          onPress={() => setSelectedTab('public')}
        >
          <Text style={[styles.tabText, selectedTab === 'public' && styles.tabTextActive]}>
            공공 일자리
          </Text>
        </TouchableOpacity>
      </View>

      {/* 필터 버튼 */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterIcon}>🏠</Text>
          <Text style={styles.filterText}>필터</Text>
        </TouchableOpacity>
      </View>

      {/* 일자리 리스트 */}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.85}>
            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardCompany}>{item.company}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.cardWageType}>{item.wageType}</Text>
                  <Text style={styles.cardWage}>{item.wage}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cardTime}>{item.workTime}</Text>
                  {item.tag && (
                    <View style={styles.tagBox}>
                      <Text style={styles.tagText}>{item.tag}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.row}>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                  <Text style={styles.cardAgo}>{item.time}</Text>
                  {item.urgent && (
                    <Text style={styles.urgentText}>긴급</Text>
                  )}
                </View>
              </View>
              <Image source={item.image} style={styles.cardImage} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#aaa', fontSize: 16 }}>공고가 없습니다.</Text>
          </View>
        }
      />
      <JobFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filter) => {
          // 필터 적용 로직
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }, // 바깥 배경 흰색
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 18,
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
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FF6F61',
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 6,
    marginTop: 2,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#FFE1DB',
  },
  filterIcon: {
    fontSize: 17,
    marginRight: 4,
  },
  filterText: {
    fontSize: 15,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  listContainer: { paddingHorizontal: 12, paddingTop: 6, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: { width: 80, height: 80, borderRadius: 10, marginLeft: 10 },
  cardCompany: { fontSize: 13, color: '#888', marginBottom: 2 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2, color: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  cardWageType: { fontSize: 13, color: '#FF6F61', fontWeight: 'bold', marginRight: 4 },
  cardWage: { fontSize: 13, color: '#222', fontWeight: 'bold', marginRight: 8 },
  cardTime: { fontSize: 12, color: '#888', marginRight: 8 },
  tagBox: {
    backgroundColor: '#FFE1DB',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: 4,
  },
  tagText: { fontSize: 11, color: '#FF6F61', fontWeight: 'bold' },
  cardLocation: { fontSize: 12, color: '#888', marginRight: 8 },
  cardAgo: { fontSize: 12, color: '#FF6F61', marginRight: 8 },
  urgentText: {
    fontSize: 11,
    color: '#fff',
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
});
