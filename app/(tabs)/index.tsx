import { useUserContext } from "@/hooks/useUserContext";
import QRCode from "react-qr-code";
import { Dimensions, View, Text, ScrollView } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { ImageCarousel } from "@/components/ImageCarousel";

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const { userCtx } = useUserContext()

  return (
    <ScrollView style={{ backgroundColor: "#fff" }} >
      <View style={styles.container}>
        <ImageCarousel />
        <View style={styles.qrCodeContainer}>
          <QRCode
            value={userCtx?.hash || "limaoBananaMaça"}
            size={width * 0.6}
            color="#3b5998"
          />
        </View>
      </View >
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 24,
    backgroundColor: '#FFF',
    height: '100%',
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
});

