import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../global/colors';

const TimeModal = ({ isVisible, timeList, onClose, onSelectTime }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Horarios Disponibles</Text>
          <FlatList
            data={timeList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelectTime(item.time)}
              >
                <Text style={styles.modalItemText}>{item.time}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.scrollContainer} // Mantiene el contenido dentro de los límites
          />
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '85%', 
  },
  scrollContainer: {
    flexGrow: 1
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textShadowColor: colors.red,
    textShadowOffset: {width: 0.4, height: 0.4},
    textShadowRadius: 0.9
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TimeModal;
