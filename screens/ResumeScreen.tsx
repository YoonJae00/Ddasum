import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // 추가

interface ResumeInfo {
  name: string;
  gender: string;
  age: number;
  birth: string;
  avatar: string;
}

interface JobItem {
  id: string;
  title: string;
  pay: string;
  image: { uri: string };
  location: string;
  time: string;
  wageType: string;
  wage: string;
  workTime: string;
  tag?: string;
  urgent?: boolean;
}

const dummyResume: ResumeInfo = {
  name: '홍길동',
  gender: '남자',
  age: 28,
  birth: '1997년생',
  avatar: 'https://via.placeholder.com/80',
};

const appliedJobs: JobItem[] = [
  {
    id: '1',
    title: '(주)이리디아 정직원 채용공고',
    pay: '월급 500만원',
    image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
    location: '성동구 행당동',
    time: '1시간전',
    wageType: '월-금',
    wage: '500만원',
    workTime: '09:00 ~ 17:00',
  },
  {
    id: '2',
    title: '편의점 아르바이트',
    pay: '시급 20,000원',
    image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
    location: '성동구 행당동',
    time: '2일전',
    wageType: '월-금',
    wage: '20,000원',
    workTime: '09:00 ~ 17:00',
    tag: '단기',
  },
];

// 관심 목록 더미 데이터 예시
const interestJobs: JobItem[] = [
  {
    id: '3',
    title: '(주)이리디아 정직원 채용공고',
    pay: '월급 500만원',
    image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
    location: '성동구 행당동',
    time: '1일전',
    wageType: '월-금',
    wage: '500만원',
    workTime: '09:00 ~ 17:00',
  },
  {
    id: '4',
    title: '(주)이리디아 정직원 채용공고',
    pay: '월급 500만원',
    image: { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
    location: '성동구 행당동',
    time: '1일전',
    wageType: '월-금',
    wage: '500만원',
    workTime: '09:00 ~ 17:00',
  },
];

export default function ResumeScreen(props) {
  const navigation = useNavigation(); // 이렇게 navigation 객체를 가져옵니다.

  // 실제로는 DB에서 불러온 데이터로 대체
  const user = dummyResume;

  const [tab, setTab] = React.useState<'applied' | 'interest'>('applied');
  const jobs = tab === 'applied' ? appliedJobs : interestJobs;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LocalJobs')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 활동 관리</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 프로필 */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.info}>{user.gender} {user.age}세 / {user.birth}</Text>
        <TouchableOpacity
          style={styles.resumeBtn}
          onPress={() => navigation.navigate('ResumeEdit')}
        >
          <Ionicons name="document-text-outline" size={16} color="#222" style={{ marginRight: 6 }} />
          <Text style={styles.resumeBtnText}>이력서 관리</Text>
        </TouchableOpacity>
      </View>

      {/* 탭 */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, tab === 'applied' && styles.tabActive]}
          onPress={() => setTab('applied')}
        >
          <Text style={[styles.tabText, tab === 'applied' && styles.tabTextActive]}>지원 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'interest' && styles.tabActive]}
          onPress={() => setTab('interest')}
        >
          <Text style={[styles.tabText, tab === 'interest' && styles.tabTextActive]}>관심 목록</Text>
        </TouchableOpacity>
      </View>

      {/* 리스트 */}
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 0, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPay}>{item.pay}</Text>
              <Text style={styles.cardMeta}>
                {item.wageType}  {item.workTime}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardAgo}>{item.time}</Text>
                {item.tag && <Text style={styles.cardTag}>{item.tag}</Text>}
              </View>
              {/* 관심목록일 때 하트 아이콘 표시 */}
              {tab === 'interest' && (
                <AntDesign name="heart" size={26} color="#FF6F61" style={{ marginTop: 10, marginLeft: -4 }} />
              )}
            </View>
            <Image source={item.image} style={styles.cardImage} />
          </View>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#aaa', fontSize: 16 }}>내역이 없습니다.</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.cardDivider} />}
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 8, backgroundColor: '#eee' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  info: { fontSize: 13, color: '#888', marginBottom: 10 },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 220,
    height: 36,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 2,
  },
  resumeBtnText: { fontSize: 15, color: '#222', fontWeight: 'bold' },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginTop: 0,
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 0,
    padding: 18,
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 18,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#222', marginBottom: 2 },
  cardPay: { fontSize: 15, color: '#222', fontWeight: 'bold', marginBottom: 2 },
  cardMeta: { fontSize: 12, color: '#888', marginBottom: 2 },
  cardLocation: { fontSize: 12, color: '#888', marginRight: 8 },
  cardAgo: { fontSize: 12, color: '#FF6F61', marginRight: 8 },
  cardTag: {
    fontSize: 11,
    color: '#fff',
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  cardImage: { width: 70, height: 70, borderRadius: 10, marginLeft: 10 },
});