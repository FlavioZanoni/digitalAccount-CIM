import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  usePadding?: boolean;
};

export const SecondaryHeader = ({ subtitle, title, usePadding }: Props) => {
  return (
    <View style={[styles.container, usePadding && styles.containerPadding]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  containerPadding: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#6B7280',
  },
});

export default SecondaryHeader;
