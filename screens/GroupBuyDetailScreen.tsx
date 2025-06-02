import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GroupBuyDetailScreen({ route }) {
  const { product } = route.params;

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* 상품 이미지 */}
        <View style={styles.imageWrap}>
          <Image source={product.image} style={styles.image} />
          {product.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>따숨Pick</Text>
            </View>
          )}
        </View>

        {/* 상품 정보 */}
        <View style={styles.infoBox}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.location}>{product.location}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.unit}>{product.unit}</Text>
            <Text style={styles.delivery}>{product.delivery}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <Text style={styles.review}>리뷰 {product.review}개</Text>
          </View>
        </View>

        {/* 모집 현황 */}
        <View style={styles.progressSection}>
          <View style={styles.progressBarWrap}>
            <View style={[styles.progressBar, { width: `${Math.round((product.current / product.total) * 100)}%` }]} />
          </View>
          <View style={styles.progressInfoRow}>
            <Text style={styles.progressInfoText}>
              {product.current}명 참여 / {product.total}명 목표
            </Text>
            {product.total - product.current > 0 ? (
              <Text style={styles.discountInfo}>
                {product.total - product.current}명 더 모이면 <Text style={styles.discountHighlight}>5% 추가 할인!</Text>
              </Text>
            ) : (
              <Text style={styles.discountInfo}>최대 할인 달성!</Text>
            )}
          </View>
        </View>

        {/* 상세 설명 */}
        <View style={styles.descBox}>
          <Text style={styles.descTitle}>상품 설명</Text>
          <Text style={styles.descText}>
            신선한 딸기를 산지에서 바로 받아보세요! 공동구매로 더 저렴하게, 더 많은 이웃과 함께 나눠요.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatBtn} onPress={() => {
            // 채팅 컴포넌트 이동하기 구현
            navigation.navigate('ChatRoom', { roomTitle: product.title });
        }}>
          <Text style={styles.chatBtnText}>채팅하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>공동구매 신청</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF8F6' },
  container: { paddingBottom: 120, paddingHorizontal: 20 },
  imageWrap: {
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: 260,
    height: 260,
    borderRadius: 18,
    backgroundColor: '#FFF0EC',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 18,
    backgroundColor: '#5A8DFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 6 },
  location: { fontSize: 14, color: '#888', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 10 },
  price: { fontSize: 19, color: '#FF6F61', fontWeight: 'bold', marginRight: 6 },
  unit: { fontSize: 14, color: '#888', marginRight: 10 },
  delivery: { fontSize: 13, color: '#5A8DFF', fontWeight: '500' },
  rating: { fontSize: 14, color: '#FFB800', fontWeight: 'bold', marginRight: 8 },
  review: { fontSize: 14, color: '#888' },

  progressSection: { marginBottom: 18, marginTop: 6 },
  progressBarWrap: {
    height: 10,
    backgroundColor: '#F3E6E3',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 6,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressInfoText: {
    fontSize: 13,
    color: '#888',
  },
  discountInfo: {
    fontSize: 13,
    color: '#5A8DFF',
    fontWeight: '500',
  },
  discountHighlight: {
    color: '#FF6F61',
    fontWeight: 'bold',
  },

  descBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#FF6F61',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  descTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  descText: { fontSize: 15, color: '#444', lineHeight: 22 },

  bottomBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#222',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  chatBtn: {
    flex: 1,
    backgroundColor: '#FFF0EC',
    borderRadius: 12,
    marginRight: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  chatBtnText: {
    color: '#FF6F61',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyBtn: {
    flex: 2,
    backgroundColor: '#FF6F61',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});