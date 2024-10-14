import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"

const ListAccordion = ({ data, isOpen, onClick }: {
  data: any
  isOpen: boolean
  onClick: (id: string) => void
}) => {

  const toggleAccordion = () => {
    onClick(data.id)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.listItemText}>{data?.sessao?.loja?.nome}</Text>
          <Text style={styles.listItemText}>{data?.sessao?.data}</Text>
        </View>
        {isOpen ? (
          <Icon name="chevron-up" size={24} color="#000" />
        ) : (
          <Icon name="chevron-down" size={24} color="#000" />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>

          {/* Add your expanded content here */}
          <Text>Additional information goes here...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  headerContent: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default ListAccordion;
