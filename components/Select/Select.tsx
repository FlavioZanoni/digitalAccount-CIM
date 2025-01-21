import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.selectButton,
          disabled && styles.disabled,
          value && styles.selectedButton
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[
          styles.selectButtonText,
          !value && styles.placeholder
        ]}>
          {value ? value.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value?.value === item.value && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[
                    styles.optionText,
                    value?.value === item.value && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  selectedButton: {
    borderColor: '#3b82f6',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#1f2937',
  },
  placeholder: {
    color: '#9ca3af',
  },
  arrow: {
    fontSize: 14,
    color: '#6b7280',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    fontSize: 20,
    color: '#6b7280',
    padding: 4,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  selectedOption: {
    backgroundColor: '#eff6ff',
  },
  optionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectedOptionText: {
    color: '#3b82f6',
  },
});

export { Select };
