import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Platform, ActionSheetIOS, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const degreeOptions = ['초등학교','중학교','고등학교', '대학교', '대학원', '전문학교/기타'];
const statusOptions = ['졸업','졸업 예정','휴학 중','재학 중','중퇴'];

function showPicker(options: string[], selected: string, onSelect: (v: string) => void) {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, '취소'],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex < options.length) onSelect(options[buttonIndex]);
      }
    );
  }
}

export default function EducationAddScreen() {
  const navigation = useNavigation();
  const [degree, setDegree] = useState('선택');
  const [status, setStatus] = useState('졸업여부');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');

  // 안드로이드용 모달 상태
  const [modal, setModal] = useState<{visible: boolean, options: string[], onSelect: (v: string) => void}>({visible: false, options: [], onSelect: ()=>{}});
  const openPicker = (options: string[], onSelect: (v: string) => void) => {
    setModal({visible: true, options, onSelect});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>학력</Text>
        </View>

        {/* 학력 선택 */}
        <Text style={styles.label}>학력</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: 18, marginBottom: 16 }}>
          <TouchableOpacity
            style={styles.pickerInput}
            onPress={() =>
              Platform.OS === 'ios'
                ? showPicker(degreeOptions, degree, setDegree)
                : openPicker(degreeOptions, setDegree)
            }
          >
            <Text style={styles.pickerInputText}>{degree}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerInput}
            onPress={() =>
              Platform.OS === 'ios'
                ? showPicker(statusOptions, status, setStatus)
                : openPicker(statusOptions, setStatus)
            }
          >
            <Text style={styles.pickerInputText}>{status}</Text>
          </TouchableOpacity>
        </View>

        {/* 학교명 */}
        <Text style={styles.label}>학교 명</Text>
        <TextInput
          style={styles.input}
          placeholder="따숨 대학교"
          placeholderTextColor="#bbb"
          value={school}
          onChangeText={setSchool}
        />

        {/* 전공 */}
        <Text style={styles.label}>전공 (선택)</Text>
        <TextInput
          style={styles.input}
          placeholder="경영학과"
          placeholderTextColor="#bbb"
          value={major}
          onChangeText={setMajor}
        />

        {/* 작성 완료 버튼 */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 안드로이드용 Modal Picker */}
      {Platform.OS === 'android' && (
        <Modal
          visible={modal.visible}
          transparent
          animationType="fade"
          onRequestClose={() => setModal({ ...modal, visible: false })}
        >
          <Pressable style={styles.modalBg} onPress={() => setModal({ ...modal, visible: false })}>
            <View style={styles.modalBox}>
              <FlatList
                data={modal.options}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      modal.onSelect(item);
                      setModal({ ...modal, visible: false });
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      )}
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
  pickerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pickerInputText: {
    fontSize: 15,
    color: '#222',
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
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 220,
    maxHeight: 320,
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  modalItemText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
});