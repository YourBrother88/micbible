import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import itemsData from "../../assets/items.json";

type Item = {
  id: number;
  name: string;
  description: string;
  friends: number[];
};

export default function ListScreen() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const findItemById = (id: number): Item | undefined =>
    (itemsData as Item[]).find((it) => it.id === id);

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={itemsData as Item[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => openModal(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        //animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>

                {/* Friends list */}
                {selectedItem.friends?.length > 0 && (
                  <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                      Friends:
                    </Text>
                    {selectedItem.friends.map((fid) => {
                      const friend = findItemById(fid);
                      if (!friend) return null;
                      return (
                        <Pressable
                          key={fid}
                          onPress={() => setSelectedItem(friend)}
                          style={styles.friendLink}
                        >
                          <Text style={styles.friendText}>{friend.name}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </>
            )}
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  item: {
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  friendLink: {
    paddingVertical: 6,
  },
  friendText: {
    fontSize: 16,
    color: "#007AFF",
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
});
