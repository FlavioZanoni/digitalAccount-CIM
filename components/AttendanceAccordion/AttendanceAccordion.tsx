import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import { formatDateArray } from "@/lib/formatDateArray";
import { apiInstance } from "@/lib/api/apiInstance";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const AttendanceAccordion = ({ data, isOpen, onClick, key }: {
  data: any
  isOpen: boolean
  key: number
  onClick: (id: string) => void
}) => {

  const toggleAccordion = () => {
    onClick(data.id)
  };

  const getCert = async () => {
    try {
      const response = await apiInstance.get("/api" + data.certURL, {
        responseType: 'arraybuffer'
      });

      const filename = `CIM-certificado-${Date.now()}.pdf`;
      const fileUri = FileSystem.documentDirectory + filename;

      await FileSystem.writeAsStringAsync(fileUri, arrayBufferToBase64(response.data), {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert('Sharing is not available on your platform');
      }

    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate');
    }
  };

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  return (
    <View key={key} style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        {isOpen ? (
          <Icon name="keyboard-arrow-up" size={24} />
        ) : (
          <Icon name="keyboard-arrow-down" size={24} />
        )}

        <View style={styles.headerContent}>
          <Text style={styles.listItemText}>{formatDateArray(data?.sessao?.data)}</Text>
          <Text style={styles.listItemText}>{data?.sessao?.loja?.nome}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.listItemText}>Presença</Text>
          <TouchableOpacity onPress={() => getCert()} style={styles.btn}>
            <Icon style={{ color: "#fff" }} name="add" size={24} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#475467',
  },
  content: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 44,
    height: 44,
    backgroundColor: '#0a7ea4',
  },
});

export default AttendanceAccordion;
