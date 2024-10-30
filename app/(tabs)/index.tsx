import { useUserContext } from "@/hooks/useUserContext";
import QRCode from "react-qr-code";
import { Dimensions, View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import ImageCarrousel from "@/components/ImageCarrousel/ImageCarrousel";

export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  const { userCtx } = useUserContext()

  return (
    <View style={styles.container}>
      <ImageCarrousel />
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={userCtx?.hash || "limaoBananaMaça"}
          size={width * 0.6}
          color="#3b5998"
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  carouselText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
});

