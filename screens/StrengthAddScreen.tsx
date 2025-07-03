import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const STRENGTHS = [
  '성실해요', '친절해요', '일처리가 꼼꼼해요', '적극적이에요', '지각하지 않아요', '센스 있어요',
  '일을 빨리 배우는 편이에요', '책임감이 있어요', '긍정적이에요', '체력이 좋아요', '예의가 발라요',
  '밝은 미소를 가져요', '고객대응을 잘해요'
];

export default function StrengthAddScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleStrength = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(s => s !== item));
    } else if (selected.length < 3) {
      setSelected([...selected, item]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>나의 강점</Text>
        </View>

        {/* 안내문구 */}
        <Text style={styles.title}>나의 강점</Text>
        <Text style={styles.desc}>나를 잘 나타내는 강점을 최대 3개까지 선택해주세요.</Text>

        {/* 강점 선택 */}
        <View style={styles.strengthWrap}>
          {STRENGTHS.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.strengthBtn,
                selected.includes(item) && styles.strengthBtnSelected
              ]}
              onPress={() => toggleStrength(item)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.strengthText,
                selected.includes(item) && styles.strengthTextSelected
              ]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 작성 완료 버튼 */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 24,
    marginBottom: 6,
    marginLeft: 18,
  },
  desc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
    marginLeft: 18,
  },
  strengthWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    marginBottom: 20,
  },
  strengthBtn: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    backgroundColor: '#fff',
  },
  strengthBtnSelected: {
    backgroundColor: '#FF6F61',
    borderColor: '#FF6F61',
  },
  strengthText: {
    fontSize: 14,
    color: '#222',
  },
  strengthTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    marginTop: 40,
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