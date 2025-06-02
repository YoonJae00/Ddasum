// 파일: app/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 스크린 컴포넌트
import HomeScreen from './screens/HomeScreen';
import LocalJobsScreen from './screens/LocalJobsScreen';
import GroupBuyStack from './screens/GroupBuyStack';
import SubsidyScreen from './screens/SubsidyScreen';
import MyDdasumScreen from './screens/MyDdasumScreen';

const Tab = createBottomTabNavigator();

// 공통 헤더 컴포넌트
function AppHeader() {
  const routes = useNavigationState(state => state.routeNames);
  const index = useNavigationState(state => state.index);
  const current = routes[index];
  // 라벨 매핑
  const titles: Record<string, string> = {
    Home: '홈',
    LocalJobs: '동네알바',
    GroupBuy: '공동구매',
    Subsidy: '지원금',
    MyDdasum: '마이따숨',
  };
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{titles[current]}</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#FF6F61',
            tabBarInactiveTintColor: '#666',
            tabBarLabelStyle: { fontSize: 12 },
          }}
        >
          {/* 각 스크린의 컴포넌트에서 AppHeader를 렌더링 */}
          <Tab.Screen
            name="Home"
            options={{
              title: '홈',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <>
                <AppHeader />
                <HomeScreen />
              </>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="LocalJobs"
            options={{
              title: '동네알바',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="briefcase-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <>
                <AppHeader />
                <LocalJobsScreen />
              </>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="GroupBuy"
            options={{
              title: '공동구매',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cart-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <>
                <AppHeader />
                <GroupBuyStack />
              </>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Subsidy"
            options={{
              title: '지원금',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cash-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <>
                <AppHeader />
                <SubsidyScreen />
              </>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="MyDdasum"
            options={{
              title: '마이따숨',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <>
                <AppHeader />
                <MyDdasumScreen />
              </>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FF6F61' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FF6F61',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
});

/*
파일 구조:
- app/
  - index.tsx       <- 네비게이터 + 공통 상단바
  - screens/
  - assets/
*/
