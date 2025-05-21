// 파일: app/screens/HomeScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const categories = ['생활', '동네가게', '구인구직', '분실센터', '재능기부'];

const dummyData = Array.from({ length: 10 }).map((_, idx) => ({
  id: `${idx}`,
  title: `상품 제목 ${idx + 1}`,
  price: `₩${(idx + 1) * 10000}`,
  image: { uri: 'https://via.placeholder.com/150' },
  location: '강남구',
  time: `${idx + 1}시간 전`, 
}));

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>동네생활</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="우리 동네 이름 또는 키워드 검색"
        />
      </View>

      {/* 카테고리 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 게시글 리스트 */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <Text style={styles.cardMeta}>
                {item.location} · {item.time}
              </Text>
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
  categoryContainer: { marginTop: 12, paddingLeft: 16 },
  categoryButton: {
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  categoryText: { fontSize: 14, color: '#333' },
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
  cardPrice: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  cardMeta: { fontSize: 12, color: '#666' },
});
