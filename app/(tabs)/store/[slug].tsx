
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function Store() {
  const { slug } = useLocalSearchParams();

  return <Text>{slug}</Text>;
}
