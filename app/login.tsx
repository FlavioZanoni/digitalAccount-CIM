import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { IError } from '../lib/api';
import { AxiosError } from 'axios';
import { StorageService } from '@/lib/StorageService';
import { TOKEN_COOKIE_NAME } from '@/constants';
import { LoginForm } from '@/components/Forms/LoginForm';
import { UserForm } from '@/components/Forms/UserForm';
import { router } from 'expo-router';

const { height } = Dimensions.get('window');
const LoginScreen = () => {
  const [errorToast, setErrorToast] = useState<AxiosError<IError>>();
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);

  useEffect(() => {
    checkExistingToken();
  }, []);

  useEffect(() => {
    if (!errorToast) return;
  }, [errorToast]);

  const checkExistingToken = async () => {
    const token = await StorageService.getItem(TOKEN_COOKIE_NAME);
    if (token) {
      router.replace("/(tabs)/")
    }
  };

  const NewAccountModal = () => (
    <Modal
      isVisible={isNewUserModalVisible}
      onBackdropPress={() => setIsNewUserModalVisible(false)}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create Account</Text>
        <UserForm onComplete={() => setIsNewUserModalVisible(false)} />
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topSection}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
              Bem-vindo{'\n'} ao CIM
            </Text>
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/mason.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.greeting}>Que bom te ver por aqui</Text>
            <Text style={styles.instruction}>
              Insira as informações para acessar sua conta
            </Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <LoginForm
          />
        </View>

        <NewAccountModal />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: height * 0.3,
    backgroundColor: '#1a365d', // primary-50 equivalent
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  logoContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#f8fafc',
    borderRadius: 80,
    position: 'absolute',
    top: height * 0.25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logo: {
    width: 120,
    height: 120,
  },
  messageContainer: {
    marginTop: 100,
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 16,
    color: '#1a365d',
  },
  formSection: {
    padding: 20,
    width: '100%',
  },
  newAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  newAccountText: {
    fontSize: 14,
    color: '#64748b',
  },
  newAccountLink: {
    fontSize: 14,
    color: '#1a365d',
    fontWeight: '600',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: height * 0.7,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 20,
  },
});

export default LoginScreen;
