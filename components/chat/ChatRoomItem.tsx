import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatRoomItem({ room }: { room: any }) {
  const navigation = useNavigation();

  // 단체방이면 avatars 배열 사용, 아니면 avatar 하나만
  const isGroup = Array.isArray(room.avatars);

  // 2x2로 최대 4명만 표시
  const groupAvatars = isGroup ? room.avatars.slice(0, 4) : [];

  return (
    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChatRoom', { roomId: room.id })}>
      {isGroup ? (
        <View style={styles.gridAvatarWrap}>
          <View style={styles.gridRow}>
            {groupAvatars[0] && (
              <Image source={{ uri: groupAvatars[0] }} style={styles.gridAvatar} />
            )}
            {groupAvatars[1] && (
              <Image source={{ uri: groupAvatars[1] }} style={styles.gridAvatar} />
            )}
          </View>
          <View style={styles.gridRow}>
            {groupAvatars[2] && (
              <Image source={{ uri: groupAvatars[2] }} style={styles.gridAvatar} />
            )}
            {groupAvatars[3] && (
              <Image source={{ uri: groupAvatars[3] }} style={styles.gridAvatar} />
            )}
          </View>
        </View>
      ) : (
        <Image source={{ uri: room.avatar }} style={styles.avatar} />
      )}
      <View style={{ flex: 1, marginLeft: isGroup ? 54 : 10 }}>
        <Text style={styles.name} numberOfLines={1}>{room.name}</Text>
        <Text style={styles.lastMsg} numberOfLines={1}>{room.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{room.time}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eee',
  },
  gridAvatarWrap: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#eee',
    margin: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  lastMsg: {
    fontSize: 13,
    color: '#888',
  },
  time: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 8,
  },
});