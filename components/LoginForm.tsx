import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginUser } from '../lib/api/auth';
import { IError } from '../lib/api';
import { validationSchema } from './loginSchema';
import { TOKEN_COOKIE_NAME } from '@/constants';
import { StorageService } from '@/lib/StorageService';
import { USER_COOKIE_NAME } from '@/constants';
import { router } from 'expo-router';

type FormValues = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema()),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      const { token, ...user } = data;
      await StorageService.setItem(TOKEN_COOKIE_NAME, token);
      await StorageService.setItem(USER_COOKIE_NAME, JSON.stringify(user))

      router.push('(tabs)');
    },
    onError: (error: AxiosError<IError>) => {
      console.log('error', error);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  errors.login && styles.inputError,
                ]}
                placeholder="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="username"
              />
              {errors.login && (
                <Text style={styles.errorText}>{errors.login.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  errors.password && styles.inputError,
                ]}
                placeholder="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
                autoComplete="password"
                textContentType="password"
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={[
            styles.button,
            isPending && styles.buttonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginLeft: 4,
  },
  button: {
    height: 50,
    backgroundColor: '#1a365d',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;
