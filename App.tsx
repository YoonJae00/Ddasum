// 파일: app/index.tsx
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// 스크린 컴포넌트
import HomeScreen from './screens/HomeScreen';
import LocalJobsStack from './screens/LocalJobsStack';
import GroupBuyStack from './screens/GroupBuyStack';
import SubsidyScreen from './screens/SubsidyScreen';
import MyDdasumScreen from './screens/MyDdasumScreen';
import ChatRoom from './screens/chat/ChatRoom';
import ChatListScreen from './screens/chat/ChatListScreen';
import AppHeader from './components/AppHeader';
import ChatStack from './screens/chat/ChatStack';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6F61',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
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
          title: '일자리',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <LocalJobsStack />}
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="MainTabs" component={MainTabs} />
          <RootStack.Screen name="ChatStack" component={ChatStack} />
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
});

/*
파일 구조:
- app/
  - index.tsx       <- 네비게이터 + 공통 상단바
  - screens/
  - assets/
*/
