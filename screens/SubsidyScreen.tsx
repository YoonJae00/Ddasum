// 파일: app/screens/SubsidyScreen.tsx
import React from 'react';
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

interface SubsidyItem {
  id: string;
  title: string;
  amount: string;
  applicants: number;
  image: { uri: string };
  location: string;
  time: string;
}

const dummySubsidies: SubsidyItem[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: `${idx}`,
  title: `지원금 ${idx + 1}`,
  amount: `₩${(idx + 1) * 20000}`,
  applicants: Math.floor(Math.random() * 100) + 1,
  image: { uri: 'https://via.placeholder.com/100' },
  location: '강서구',
  time: `${idx + 1}일 전`, 
}));

export default function SubsidyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>지원금</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="지원금 이름 또는 키워드 검색"
        />
      </View>

      {/* 지원금 리스트 */}
      <FlatList
        data={dummySubsidies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAmount}>{item.amount}</Text>
              <Text style={styles.cardMeta}>
                신청자 {item.applicants}명 · {item.location}
              </Text>
              <Text style={styles.cardMeta}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FF6F61',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  searchInput: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  listContainer: { paddingHorizontal: 16, paddingTop: 12 },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: { width: 100, height: 100 },
  cardInfo: { flex: 1, padding: 8, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardAmount: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  cardMeta: { fontSize: 12, color: '#666' },
});
