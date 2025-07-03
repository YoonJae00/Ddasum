import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CertificateAddScreen() {
  const navigation = useNavigation();
  const [cert, setCert] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>자격증</Text>
        </View>

        {/* 자격증명 */}
        <Text style={styles.label}>자격증명</Text>
        <TextInput
          style={styles.input}
          placeholder="예) 자동차운전면허,컴퓨터활용능력,바리스타 등"
          placeholderTextColor="#bbb"
          value={cert}
          onChangeText={setCert}
        />

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
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 24,
    marginBottom: 8,
    marginLeft: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#222',
    marginHorizontal: 18,
    backgroundColor: '#fff',
    marginBottom: 8,
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