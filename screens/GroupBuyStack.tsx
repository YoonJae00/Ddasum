import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupBuyScreen from './GroupBuyScreen';
import GroupBuyDetailScreen from './GroupBuyDetailScreen';
import ChatRoom from './chat/ChatRoom'; // ChatRoom 컴포넌트 import


const Stack = createStackNavigator();

export default function GroupBuyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupBuy"
        component={GroupBuyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupBuyDetail"
        component={GroupBuyDetailScreen}
        options={{ title: '공동구매 상세' }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ title: '채팅방' }}
      />
    </Stack.Navigator>
  );
}