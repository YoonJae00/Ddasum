import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ChatTabBar({ tab, setTab }: { tab: string; setTab: (t: string) => void }) {
  return (
    <View style={styles.tabRow}>
      <TouchableOpacity style={[styles.tab, tab === '일반' && styles.tabActive]} onPress={() => setTab('일반')}>
        <Text style={[styles.tabText, tab === '일반' && styles.tabTextActive]}>일반</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, tab === '따숨운영팀' && styles.tabActive]} onPress={() => setTab('따숨운영팀')}>
        <Text style={[styles.tabText, tab === '따숨운영팀' && styles.tabTextActive]}>따숨운영팀</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FF6F61',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
  },
  tabTextActive: {
    color: '#222',
    fontWeight: 'bold',
  },
});