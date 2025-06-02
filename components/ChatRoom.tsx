import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  id: string;
  text?: string;
  isMe: boolean;
  time: string;
  date: string;
  read: boolean;
  imageUri?: string;
  videoUri?: string;
}

function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const time = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
}

export default function ChatRoom({ route }) {
  const roomTitle = route.params?.roomTitle || '채팅방';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 궁금한 점이 있으신가요?',
      isMe: false,
      ...getCurrentDateTime(),
      read: true,
    },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // 이미지 확대 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUri, setModalImageUri] = useState<string | null>(null);

  // 사진/동영상 첨부 (한 번에 둘 다 선택 가능)
  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          isMe: true,
          ...getCurrentDateTime(),
          read: false,
          imageUri: asset.type === 'image' ? asset.uri : undefined,
          videoUri: asset.type === 'video' ? asset.uri : undefined,
        },
      ]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        isMe: true,
        ...getCurrentDateTime(),
        read: false,
      },
    ]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  // 날짜별로 메시지 묶기
  const renderMessages = () => {
    let lastDate = '';
    const items: any[] = [];
    messages.forEach((msg, idx) => {
      if (msg.date !== lastDate) {
        items.push({ type: 'date', date: msg.date, key: `date-${msg.date}-${idx}` });
        lastDate = msg.date;
      }
      items.push({ ...msg, type: 'msg', key: msg.id });
    });
    return items;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFF8F6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 44 : 0}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{roomTitle}</Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={renderMessages()}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              if (item.type === 'date') {
                return (
                  <View style={styles.dateDivider}>
                    <Text style={styles.dateDividerText}>{item.date}</Text>
                  </View>
                );
              }
              const isMe = item.isMe;
              return (
                <View style={[
                  styles.bubble,
                  isMe ? styles.myBubble : styles.otherBubble
                ]}>
                  {/* 이미지 메시지 */}
                  {item.imageUri && (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        setModalImageUri(item.imageUri);
                        setModalVisible(true);
                      }}
                    >
                      <Image source={{ uri: item.imageUri }} style={styles.media} />
                    </TouchableOpacity>
                  )}
                  {/* 동영상 메시지 (썸네일만, 실제 재생은 별도 구현 필요) */}
                  {item.videoUri && (
                    <View style={styles.mediaVideo}>
                      <Text style={{ color: '#888', fontSize: 13 }}>동영상 첨부됨</Text>
                    </View>
                  )}
                  {/* 텍스트 메시지 */}
                  {item.text && (
                    <Text style={isMe ? styles.myText : styles.otherText}>{item.text}</Text>
                  )}
                  <View style={styles.metaRow}>
                    <Text style={[
                      styles.timeText,
                      isMe && { color: '#fff', opacity: 0.8 }
                    ]}>{item.time}</Text>
                    {isMe && (
                      <Text style={[
                        styles.readText,
                        { color: '#fff', opacity: 0.7 }
                      ]}>
                        {item.read ? '읽음' : '전송됨'}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }}
            contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          />

          {/* 이미지 확대 모달 */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
              <Image
                source={{ uri: modalImageUri ?? undefined }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </Pressable>
          </Modal>

          <View style={styles.inputRow}>
            {/* 첨부파일 버튼 (+ 아이콘) */}
            <TouchableOpacity style={styles.attachBtn} onPress={pickMedia}>
              <Text style={styles.attachIcon}>＋</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="메시지를 입력하세요"
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendBtnText}>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#FFF8F6' },
  header: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#222' },
  dateDivider: {
    alignSelf: 'center',
    backgroundColor: '#FFE1DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginVertical: 8,
  },
  dateDividerText: {
    color: '#FF6F61',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  myBubble: {
    backgroundColor: '#FF6F61',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 0.5,
    borderColor: '#FFDAD3',
  },
  myText: { color: '#fff', fontSize: 15 },
  otherText: { color: '#222', fontSize: 15 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  timeText: {
    fontSize: 11,
    color: '#888',
  },
  readText: {
    fontSize: 11,
    color: '#5A8DFF',
    marginLeft: 4,
  },
  media: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#eee',
  },
  mediaVideo: {
    width: 160,
    height: 160,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  attachBtn: {
    marginRight: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 28,
    color: '#FF6F61',
    fontWeight: 'bold',
    marginRight: 2,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF0EC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sendBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
});