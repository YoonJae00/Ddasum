// 파일: app/screens/GroupBuyScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = width * 0.8 * 0.5; // 80% 너비, 0.5 비율

const banners = [
  { id: '1', uri: 'https://picsum.photos/800/400?random=1' },
  { id: '2', uri: 'https://picsum.photos/800/400?random=2' },
  { id: '3', uri: 'https://picsum.photos/800/400?random=3' },
];

const categories = ['산지직송', '동네간식', '공방마켓', '따숨 기획전'];

interface ProductItem {
  id: string; // 상품 고유 ID
  title: string; // 상품명 (예: '전남 고흥 | 딸기')
  price: string; // 가격 (예: '12,900원')
  unit: string; // 단위 (예: '(100g 당)')
  image: { uri: string }; // 상품 이미지 URL 객체
  location: string; // 산지/지역 정보 (예: '전남 고흥')
  delivery: string; // 배송 정보 (예: '무료배송')
  rating: number; // 별점 (예: 4.5)
  review: number; // 리뷰 개수 (예: 245)
  badge?: boolean; // 뱃지 여부 (예: '따숨Pick' 등, true/false로도 사용)
  total: number; // 총 모집 인원 (공동구매 목표 인원)
  current: number; // 현재 참여 인원
}


// 가대이터
const dummyProducts: ProductItem[] = Array.from({ length: 10 }).map((_, idx) => ({
  id: `${idx}`,
  title: `전남 고흥 | 딸기`,
  price: `12,900원`,
  unit: `(100g 당)`,
  image: { uri: `https://www.cyso.co.kr/data/item/1734507356/e408c2c35ea44e52900399cbfcca4ae4.png` },
  location: '전남 고흥',
  delivery: '무료배송',
  rating: 4.5,
  review: 245,
  badge: idx % 2 === 0,
  total: 10, // 총 모집 인원
  current: 6 + idx % 5, // 현재 인원 (예시)
}));

export default function GroupBuyScreen() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const carouselRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentBanner(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // 5초마다 자동 스와이프
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => {
        const next = prev + 1 >= banners.length ? 0 : prev + 1;
        carouselRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* 캐러셀 배너 */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={carouselRef}
            data={banners}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            getItemLayout={(_, index) => ({
              length: width * 0.8,
              offset: (width * 0.8) * index,
              index,
            })}
            snapToInterval={width * 0.8}
            decelerationRate="fast"
            scrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: (width - width * 0.8) / 2,
            }}
            renderItem={({ item }) => (
              <Image source={{ uri: item.uri }} style={styles.bannerImage} />
            )}
          />
          {/* 인디케이터 */}
          <View style={styles.indicatorContainer}>
            <Text style={styles.indicatorText}>
              {currentBanner + 1}/{banners.length}
            </Text>
          </View>
        </View>

        {/* 카테고리 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 2열 그리드 상품 리스트 */}
        <FlatList
          data={dummyProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => {
            const percent = Math.round((item.current / item.total) * 100);
            const remain = item.total - item.current;
            return (
              <TouchableOpacity
                style={styles.productCard}
                key={item.id}
                onPress={() => navigation.navigate('GroupBuyDetail', { product: item })}
              >
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productLocation}>{item.location}</Text>
                  <Text style={styles.productTitle}>{item.title.replace(`${item.location} | `, '')}</Text>
                  <Text style={styles.productPrice}>{item.price}
                    <Text style={styles.productUnit}> {item.unit}</Text>
                  </Text>
                  <Text style={styles.productDelivery}>{item.delivery}</Text>
                  <View style={styles.productBottomRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.productStar}>★</Text>
                      <Text style={styles.productRating}>{item.rating}</Text>
                      <Text style={styles.productReview}>· {item.review}</Text>
                    </View>
                    {item.badge && (
                      <View style={styles.productBadge}>
                        <Text style={styles.productBadgeText}>따숨Pick</Text>
                      </View>
                    )}
                  </View>
                  {/* 모집 인원 진행률 바 */}
                  <View style={styles.progressBarWrap}>
                    <View style={[styles.progressBar, { width: `${percent}%` }]} />
                  </View>
                  <View style={styles.progressInfoRow}>
                    <Text style={styles.progressInfoText}>
                      {item.current}명 참여 / {item.total}명 목표
                    </Text>
                    {remain > 0 ? (
                      <Text style={styles.discountInfo}>
                        {remain}명 더 모이면 <Text style={styles.discountHighlight}>5% 추가 할인!</Text>
                      </Text>
                    ) : (
                      <Text style={styles.discountInfo}>최대 할인 달성!</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 3 * CARD_MARGIN) / 2; // 좌우 여백 + 카드 사이 마진

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F6' },
  bannerContainer: {
    marginTop: 18,
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerImage: {
    width: width * 0.8,
    height: BANNER_HEIGHT,
    borderRadius: 24,
    backgroundColor: '#FFE1DB',
     marginHorizontal: (width * 0.2) / 2,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 14,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,111,97,0.85)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  indicatorText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#FFF0EC',
    height: 38,
    borderRadius: 18,
    paddingHorizontal: 18,
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryText: { fontSize: 15, color: '#FF6F61', fontWeight: '500' },
  gridContainer: {
    paddingHorizontal: CARD_MARGIN,
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: CARD_MARGIN, // 카드 사이 마진(React Native 0.71+ 지원)
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: CARD_MARGIN * 2,
    width: CARD_WIDTH,
    // 카드 사이 마진(구버전 RN 호환)
    marginRight: 0,
    marginLeft: 0,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1, // 정사각형 비율 유지
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: '#FFF0EC',
  },
  productInfo: {
    padding: 12,
  },
  productLocation: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF6F61',
    marginBottom: 2,
  },
  productUnit: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
  },
  productDelivery: {
    fontSize: 12,
    color: '#5A8DFF',
    marginBottom: 4,
  },
  productBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  productStar: {
    color: '#FFB800',
    fontSize: 14,
    marginRight: 2,
  },
  productRating: {
    fontSize: 13,
    color: '#333',
    marginRight: 2,
    fontWeight: '500',
  },
  productReview: {
    fontSize: 13,
    color: '#aaa',
    marginLeft: 2,
  },
  productBadge: {
    backgroundColor: '#5A8DFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  productBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarWrap: {
    height: 8,
    backgroundColor: '#F3E6E3',
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#FF6F61',
    borderRadius: 6,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  progressInfoText: {
    fontSize: 12,
    color: '#888',
  },
  discountInfo: {
    fontSize: 12,
    color: '#5A8DFF',
    fontWeight: '500',
  },
  discountHighlight: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },
});