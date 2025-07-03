import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function NeighborDetailScreen() {
  const navigation = useNavigation();
  // 실제 데이터는 route.params 등에서 받아오도록 구현
  const neighbor = {
    images: [
      { uri: 'https://shop-phinf.pstatic.net/20240909_203/1725862735352OH3P7_PNG/5995158202013717_1265342514.png?type=m510' },
    ],
    tag: '심부름',
    title: '감기약좀 사다주세요',
    type: '이웃 요청',
    time: '7시간전',
    pay: '건당 10,000원',
    wageType: '오늘',
    workTime: '13:00 ~ 13:30',
    desc: '아파요 감기약좀 사다주세요.',
    user: {
      name: '홍길동',
      avatar: '', // 실제로는 이미지 URL
      phoneVerified: true,
      addressVerified: false,
      detail: '서울시 성동구 행당로 110',
    },
  };

  // 이미지 스와이프 관련 (여러장 지원)
  const [imgIdx, setImgIdx] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setImgIdx(viewableItems[0].index);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={26} color="#222" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginHorizontal: 8 }}>
            <Feather name="share-2" size={20} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={22} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 이미지 스와이프 */}
        <View>
          <FlatList
            ref={flatListRef}
            data={neighbor.images}
            keyExtractor={(_, idx) => idx.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            renderItem={({ item }) => (
              <Image source={item} style={styles.image} />
            )}
          />
          {/* 인디케이터 */}
          <View style={styles.indicatorWrap}>
            {neighbor.images.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.indicatorDot,
                  imgIdx === idx && styles.indicatorDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 태그 */}
        <View style={styles.tagRow}>
          <View style={styles.tag}><Text style={styles.tagText}>{neighbor.tag}</Text></View>
        </View>

        {/* 제목/기본정보 */}
        <Text style={styles.title}>{neighbor.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoSub}>{neighbor.type}</Text>
          <Text style={styles.infoDot}>·</Text>
          <Text style={styles.infoTime}>{neighbor.time}</Text>
        </View>

        {/* 근무조건 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>근무조건</Text>
          <View style={styles.condRow}>
            <Ionicons name="cash-outline" size={18} color="#222" style={{ marginRight: 6 }} />
            <Text style={styles.condText}>{neighbor.pay}</Text>
          </View>
          <View style={styles.condRow}>
            <Ionicons name="calendar-outline" size={18} color="#222" style={{ marginRight: 6 }} />
            <Text style={styles.condText}>{neighbor.wageType}</Text>
          </View>
          <View style={styles.condRow}>
            <Ionicons name="time-outline" size={18} color="#222" style={{ marginRight: 6 }} />
            <Text style={styles.condText}>{neighbor.workTime}</Text>
          </View>
        </View>

        {/* 요청내용 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>도와주세요</Text>
          <Text style={styles.desc}>{neighbor.desc}</Text>
        </View>

        {/* 이웃 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이웃 정보</Text>
          <View style={styles.profileRow}>
            <Image
              source={
                neighbor.user.avatar
                  ? { uri: neighbor.user.avatar }
                  : { uri: 'https://via.placeholder.com/44x44?text=User' }
              }
              style={styles.avatar}
            />
            <View style={{ marginLeft: 14, flex: 1 }}>
              <Text style={styles.userName}>{neighbor.user.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <Text style={styles.userLabel}>휴대폰</Text>
                <View style={styles.certBox}>
                  <Ionicons
                    name={neighbor.user.phoneVerified ? "checkmark-circle" : "close-circle"}
                    size={14}
                    color={neighbor.user.phoneVerified ? "#4CAF50" : "#FF6F61"}
                    style={{ marginRight: 2 }}
                  />
                  <Text style={[
                    styles.certText,
                    { color: neighbor.user.phoneVerified ? "#4CAF50" : "#FF6F61" }
                  ]}>
                    {neighbor.user.phoneVerified ? "인증완료" : "인증안료"}
                  </Text>
                </View>
                <Text style={[styles.userLabel, { marginLeft: 12 }]}>주소</Text>
                <View style={styles.certBox}>
                  <Ionicons
                    name={neighbor.user.addressVerified ? "checkmark-circle" : "close-circle"}
                    size={14}
                    color={neighbor.user.addressVerified ? "#4CAF50" : "#FF6F61"}
                    style={{ marginRight: 2 }}
                  />
                  <Text style={[
                    styles.certText,
                    { color: neighbor.user.addressVerified ? "#4CAF50" : "#FF6F61" }
                  ]}>
                    {neighbor.user.addressVerified ? "인증완료" : "인증안료"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.companyBox}>
            <Text style={styles.companyBoxText}>(준비중)</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Text style={styles.address}>{neighbor.user.detail}</Text>
            <TouchableOpacity style={{ marginLeft: 6 }}>
              <Text style={styles.copyText}>복사</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomIconBtn}>
          <Ionicons name="heart-outline" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text style={styles.bottomBtnText}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtnActive}>
          <Text style={styles.bottomBtnActiveText}>요청수락</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  indicatorWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicatorDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 3,
  },
  indicatorDotActive: {
    backgroundColor: '#FF6F61',
    width: 16,
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginLeft: 16,
    marginBottom: 2,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 13,
    color: '#444',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginBottom: 10,
  },
  infoSub: {
    fontSize: 13,
    color: '#888',
  },
  infoDot: {
    fontSize: 13,
    color: '#bbb',
    marginHorizontal: 4,
  },
  infoTime: {
    fontSize: 13,
    color: '#FF6F61',
  },
  section: {
    marginTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  condRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  condText: {
    fontSize: 14,
    color: '#222',
  },
  desc: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eee',
  },
  userName: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userLabel: {
    fontSize: 13,
    color: '#888',
    marginRight: 4,
  },
  certBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  certText: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  companyBox: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyBoxText: {
    color: '#bbb',
    fontSize: 15,
  },
  address: {
    fontSize: 13,
    color: '#888',
  },
  copyText: {
    fontSize: 12,
    color: '#FF6F61',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#FF6F61',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bottomIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  bottomBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6F61',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 8,
  },
  bottomBtnText: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bottomBtnActive: {
    flex: 1,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  bottomBtnActiveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});