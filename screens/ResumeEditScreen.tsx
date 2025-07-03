import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ResumeEditScreen() {
  const navigation = useNavigation();

  // 더미 데이터 (실제 DB 연동 시 대체)
  const user = {
    name: '홍길동',
    gender: '남자',
    age: 28,
    birth: '1997년생',
    avatar: 'https://via.placeholder.com/80',
    phone: '010-1234-0000',
    phoneVerified: false,
    address: '성동구 행당동',
    addressVerified: true,
  };

  const careers = [
    {
      id: 1,
      period: '2021.03~2022.03',
      title: '편의점알바',
      desc: '업무내용 업무내용업무내용 업무내용업무내용\n업무내용 업무내용업무내용 업무내용',
    },
    {
      id: 2,
      period: '2020.06~2021.02',
      title: '쇼핑몰 운영',
      desc: '업무내용 업무내용업무내용 업무내용업무내용\n업무내용 업무내용업무내용 업무내용',
    },
  ];

  const educations = [
    {
      id: 1,
      period: '2015.03~2020.02',
      title: '따숨 대학교',
      desc: '경영학과',
    },
  ];

  const [selfIntro, setSelfIntro] = React.useState('');
  // 자격증, 강점 등도 배열로 관리 가능

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Resume')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>이력서 관리</Text>
        </View>

        {/* 프로필 */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>{user.gender} {user.age}세 / {user.birth}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>휴대폰</Text>
            <Text style={styles.value}>{user.phone}</Text>
            <Text style={[styles.verify, !user.phoneVerified && styles.unverified]}>
              {user.phoneVerified ? '인증완료' : '인증필요'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>주소</Text>
            <Text style={styles.value}>{user.address}</Text>
            <Text style={[styles.verify, !user.addressVerified && styles.unverified]}>
              {user.addressVerified ? '인증완료' : '인증필요'}
            </Text>
          </View>
        </View>

        {/* 경력 */}
        <SectionTitle title="경력" />
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('CareerAdd')}>
          <Feather name="plus-circle" size={18} color="#FF6F61" style={{ marginRight: 6 }} />
          <Text style={styles.addBtnText}>경력추가</Text>
        </TouchableOpacity>
        {careers.map(c => (
          <View key={c.id} style={styles.itemBox}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemPeriod}>{c.period}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Feather name="edit-3" size={16} color="#888" style={{ marginRight: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="delete-outline" size={18} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemTitle}>{c.title}</Text>
            <Text style={styles.itemDesc}>{c.desc}</Text>
          </View>
        ))}

        {/* 최종학력 */}
        <SectionTitle title="최종학력" />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('EducationAdd')}
        >
          <Feather name="plus-circle" size={18} color="#FF6F61" style={{ marginRight: 6 }} />
          <Text style={styles.addBtnText}>학력추가</Text>
        </TouchableOpacity>
        {educations.map(e => (
          <View key={e.id} style={styles.itemBox}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemPeriod}>{e.period}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Feather name="edit-3" size={16} color="#888" style={{ marginRight: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="delete-outline" size={18} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.itemTitle}>{e.title}</Text>
            <Text style={styles.itemDesc}>{e.desc}</Text>
          </View>
        ))}

        {/* 자기소개 */}
        <SectionTitle title="자기소개" />
        <TextInput
          style={styles.textarea}
          placeholder="자신을 소개하는 내용을 자유롭게 적어주세요."
          placeholderTextColor="#bbb"
          multiline
          value={selfIntro}
          onChangeText={setSelfIntro}
        />

        {/* 자격증 */}
        <SectionTitle title="자격증" />
        <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => navigation.navigate('CertificateAdd')}
            >
          <Feather name="plus-circle" size={18} color="#FF6F61" style={{ marginRight: 6 }} />
          <Text style={styles.addBtnText}>자격증 추가</Text>
        </TouchableOpacity>

        {/* 나의 강점 */}
        <SectionTitle title="나의 강점" />
        <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => navigation.navigate('StrengthAdd')}
        >
          <Feather name="plus-circle" size={18} color="#FF6F61" style={{ marginRight: 6 }} />
          <Text style={styles.addBtnText}>강점추가</Text>
        </TouchableOpacity>

        {/* 작성 완료 버튼 */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitleBox}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 12,
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
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  avatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginBottom: 10, // 기존 8 → 10으로 살짝 띄움
    backgroundColor: '#eee' 
  },
  name: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#222', 
    marginBottom: 4, // 기존 2 → 4로 띄움
    marginLeft: 70, 
    marginTop: -56 
  },
  info: { 
    fontSize: 13, 
    color: '#888', 
    marginBottom: 18, // 기존 10 → 18로 더 띄움
    marginLeft: 70 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6, // 기존 2 → 6으로 띄움
    marginLeft: 0 
  },
  label: { fontSize: 13, color: '#888', width: 48 },
  value: { fontSize: 13, color: '#222', marginRight: 8 },
  verify: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 2,
    overflow: 'hidden',
  },
  unverified: {
    backgroundColor: '#bbb',
  },
  sectionTitleBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 18,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    marginHorizontal: 18,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  addBtnText: { fontSize: 15, color: '#FF6F61', fontWeight: 'bold' },
  itemBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 18,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemPeriod: { fontSize: 13, color: '#888', fontWeight: 'bold' },
  itemTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  itemDesc: { fontSize: 13, color: '#444', marginBottom: 2, marginTop: 2, lineHeight: 18 },
  textarea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 18,
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: 32,
    marginHorizontal: 18,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});