import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const titles: Record<string, string> = {
  LocalJobsMain: '따숨 일자리',
  Resume: '내 활동 관리',
  ResumeEdit: '이력서 수정',
  CareerAdd: '경력 추가',
  EducationAdd: '학력 추가',
  CertificateAdd: '자격증 추가',
  StrengthAdd: '나의 강점',
  Home: '홈',
  GroupBuy: '공동구매',
  Subsidy: '지원금',
  MyDdasum: '마이따숨',
};

interface AppHeaderProps {
  routeName: string;
}

export default function AppHeader({ routeName }: AppHeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    }}>
      <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#222' }}>
        {titles[routeName] || '따숨 일자리'}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {routeName === 'LocalJobsMain' && (
          <>
            <TouchableOpacity
              style={{ marginHorizontal: 6 }}
              onPress={() => navigation.navigate('Resume')}
            >
              <MaterialCommunityIcons name="file-document-edit-outline" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 6 }}
              onPress={() => navigation.navigate('ChatStack')}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginHorizontal: 6 }}
              onPress={() => navigation.navigate('ResumeEdit')}
            >
              <Feather name="edit-3" size={22} color="#222" />
            </TouchableOpacity>
          </>
        )}
        {routeName !== 'LocalJobsMain' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('LocalJobsMain')}
          >
            <Ionicons name="notifications-outline" size={24} color="#222" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}