import { formatDateArray } from "@/lib/formatDateArray";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"
import { Linking, Platform } from 'react-native';

const CalendarAccordion = ({ data, isOpen, onClick }: {
  data: any
  isOpen: boolean
  onClick: (id: string) => void
}) => {

  const toggleAccordion = () => {
    onClick(data.id)
  };

  const openWhatsApp = () => {
    const phoneNumber = data?.loja?.secretarioTel;
    const message = ``;

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    let whatsappUrl = '';

    if (Platform.OS === 'web') {
      whatsappUrl = `https://web.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
    } else {
      whatsappUrl = `whatsapp://send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
    }
    const openURL = (url: string) => {
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        Linking.openURL(url);
      }
    };

    if (Platform.OS !== 'web') {
      Linking.canOpenURL(whatsappUrl)
        .then(supported => {
          if (supported) {
            openURL(whatsappUrl);
          } else {
            throw new Error('WhatsApp is not installed');
          }
        })
        .catch(err => {
          console.error('Error opening WhatsApp:', err);
          // Fallback option: open WhatsApp in browser
          const webWhatsapp = `https://api.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
          openURL(webWhatsapp);
        });
    } else {
      openURL(whatsappUrl);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        {isOpen ? (
          <Icon name="keyboard-arrow-up" size={24} />
        ) : (
          <Icon name="keyboard-arrow-down" size={24} />
        )}

        <View style={styles.headerContent}>
          <Text style={styles.listItemText}>{formatDateArray(data?.data)}</Text>
          <Text style={styles.listItemText}>{data?.loja?.nome}</Text>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.listItemText}>{data?.data?.[3] ?? ""}h - {data?.tipo || ""} </Text>
          {data?.loja?.secretarioTel && (
            <TouchableOpacity onPress={() => openWhatsApp()} style={styles.btn}>
              <Icon style={{ color: "#fff" }} name="add" size={24} />
            </TouchableOpacity>
          )}
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

export default CalendarAccordion;
