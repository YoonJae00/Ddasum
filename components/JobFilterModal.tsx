import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DISTANCES = [
  { label: '1km 이내', desc: '걸어서 10분 이내 거리예요' },
  { label: '3km 이내', desc: '대중교통으로 약 10분 걸려요' },
  { label: '5km 이내', desc: '대중교통으로 15~20분 정도 걸려요' },
  { label: '7km 이내', desc: '대중교통으로 20~30분 정도 걸려요' },
];

const JOB_TYPES = [
  '서빙', '서비스', '매장관리·판매', '사무직', '영업', '생산', '병원·간호', '운전·배달',
  'IT·기술', '디자인', '교육·강사'
];

const PERIODS = ['단기', '1개월 이상'];

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function JobFilterModal({ visible, onClose, onApply, initial }) {
  const [distance, setDistance] = useState(initial?.distance ?? 0);
  const [jobTypes, setJobTypes] = useState<string[]>(initial?.jobTypes ?? []);
  const [period, setPeriod] = useState(initial?.period ?? 0);
  const [days, setDays] = useState<string[]>(initial?.days ?? []);

  const toggleJobType = (type: string) => {
    setJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleDay = (day: string) => {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const reset = () => {
    setDistance(0);
    setJobTypes([]);
    setPeriod(0);
    setDays([]);
  };

  const apply = () => {
    onApply({
      distance,
      jobTypes,
      period,
      days,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Text style={styles.sectionTitle}>거리를 설정해주세요</Text>
            {DISTANCES.map((d, idx) => (
              <TouchableOpacity
                key={d.label}
                style={[
                  styles.radioBox,
                  idx === distance && styles.radioBoxActive,
                ]}
                onPress={() => setDistance(idx)}
                activeOpacity={0.8}
              >
                <View style={styles.radioCircle}>
                  {idx === distance && <View style={styles.radioDot} />}
                </View>
                <View>
                  <Text style={styles.radioLabel}>{d.label}</Text>
                  <Text style={styles.radioDesc}>{d.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>하는 일 <Text style={{ color: '#aaa', fontSize: 13 }}>(복수선택)</Text></Text>
            <View style={styles.chipWrap}>
              {JOB_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    jobTypes.includes(type) && styles.chipActive,
                  ]}
                  onPress={() => toggleJobType(type)}
                >
                  <Text style={[
                    styles.chipText,
                    jobTypes.includes(type) && styles.chipTextActive,
                  ]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>근무 기간</Text>
            <View style={styles.chipWrap}>
              {PERIODS.map((p, idx) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.chip,
                    period === idx && styles.chipActive,
                  ]}
                  onPress={() => setPeriod(idx)}
                >
                  <Text style={[
                    styles.chipText,
                    period === idx && styles.chipTextActive,
                  ]}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>근무 요일</Text>
            <View style={styles.chipWrap}>
              {WEEKDAYS.map(day => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.chip,
                    days.includes(day) && styles.chipActive,
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[
                    styles.chipText,
                    days.includes(day) && styles.chipTextActive,
                  ]}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
              <Text style={styles.resetBtnText}>초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyBtn} onPress={apply}>
              <Text style={styles.applyBtnText}>적용</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 22,
    maxHeight: '92%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 10,
    color: '#222',
  },
  radioBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  radioBoxActive: {
    borderColor: '#FF6F61',
    backgroundColor: '#FFF8F6',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FF6F61',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6F61',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  radioDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 18,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginBottom: 7,
    backgroundColor: '#fff',
  },
  chipActive: {
    backgroundColor: '#FF6F61',
    borderColor: '#FF6F61',
  },
  chipText: {
    fontSize: 14,
    color: '#222',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 2,
  },
  resetBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#eee',
    paddingVertical: 13,
    alignItems: 'center',
    marginRight: 4,
  },
  resetBtnText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginLeft: 4,
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});