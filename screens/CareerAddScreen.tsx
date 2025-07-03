import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Platform, ActionSheetIOS, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const years = Array.from({ length: 21 }, (_, i) => `${2010 + i}년`);
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

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

export default function CareerAddScreen() {
  const navigation = useNavigation();
  const [place, setPlace] = useState('');
  const [desc, setDesc] = useState('');
  const [startYear, setStartYear] = useState('2024년');
  const [startMonth, setStartMonth] = useState('3월');
  const [endYear, setEndYear] = useState('2025년');
  const [endMonth, setEndMonth] = useState('6월');

  // 안드로이드용 모달 상태
  const [modal, setModal] = useState<{visible: boolean, type: null | string}>({visible: false, type: null});
  const [pickerOptions, setPickerOptions] = useState<string[]>([]);
  const [pickerOnSelect, setPickerOnSelect] = useState<(v: string) => void>(()=>{});

  // 안드로이드용 Picker 열기
  const openPicker = (type: string, options: string[], onSelect: (v: string) => void) => {
    setPickerOptions(options);
    setPickerOnSelect(() => onSelect);
    setModal({visible: true, type});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>경력</Text>
        </View>

        {/* 내가 일한 곳 */}
        <Text style={styles.label}>내가 일한 곳</Text>
        <TextInput
          style={styles.input}
          placeholder="예) 따숨커피 / 가게명 또는 업체명"
          placeholderTextColor="#bbb"
          value={place}
          onChangeText={setPlace}
        />

        {/* 어떤 일을 했나요 */}
        <Text style={styles.label}>어떤 일을 했나요?</Text>
        <TextInput
          style={styles.textarea}
          placeholder="어떤 일을 했는지 써주세요."
          placeholderTextColor="#bbb"
          value={desc}
          onChangeText={setDesc}
          multiline
          maxLength={1000}
        />
        <Text style={styles.count}>{desc.length}/1000</Text>

        {/* 일한 기간 */}
        <Text style={styles.label}>일한 기간</Text>

        {/* 시작 시기 */}
        <View style={{ marginHorizontal: 18, marginBottom: 16 }}>
          <Text style={styles.periodLabel}>시작 시기</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => Platform.OS === 'ios'
                ? showPicker(years, startYear, setStartYear)
                : openPicker('startYear', years, setStartYear)
              }
            >
              <Text style={styles.pickerInputText}>{startYear}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => Platform.OS === 'ios'
                ? showPicker(months, startMonth, setStartMonth)
                : openPicker('startMonth', months, setStartMonth)
              }
            >
              <Text style={styles.pickerInputText}>{startMonth}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 종료 시기 */}
        <View style={{ marginHorizontal: 18 }}>
          <Text style={styles.periodLabel}>종료 시기</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => Platform.OS === 'ios'
                ? showPicker(years, endYear, setEndYear)
                : openPicker('endYear', years, setEndYear)
              }
            >
              <Text style={styles.pickerInputText}>{endYear}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pickerInput}
              onPress={() => Platform.OS === 'ios'
                ? showPicker(months, endMonth, setEndMonth)
                : openPicker('endMonth', months, setEndMonth)
              }
            >
              <Text style={styles.pickerInputText}>{endMonth}</Text>
            </TouchableOpacity>
          </View>
        </View>

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
          onRequestClose={() => setModal({visible: false, type: null})}
        >
          <Pressable style={styles.modalBg} onPress={() => setModal({visible: false, type: null})}>
            <View style={styles.modalBox}>
              <FlatList
                data={pickerOptions}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      pickerOnSelect(item);
                      setModal({visible: false, type: null});
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
  },
  textarea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 18,
    marginTop: 0,
    marginBottom: 0,
    padding: 12,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  count: {
    fontSize: 12,
    color: '#bbb',
    textAlign: 'right',
    marginRight: 22,
    marginBottom: 8,
    marginTop: 2,
  },
  periodLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
    marginLeft: 2,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8,
    flex: 1,
    height: 44, // 추가: 피커 높이 명시
    ...Platform.select({
      ios: { overflow: 'hidden' },
    }),
  },
  picker: {
    height: 44, // 추가: 피커 높이 명시
    width: '100%',
  },
  pickerItem: {
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