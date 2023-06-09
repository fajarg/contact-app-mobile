import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  Modal,
  Button,
  TextInput,
} from "react-native";
import {
  useGetAllContactQuery,
  usePutContactMutation,
  usePostContactMutation,
  useDeleteContactMutation,
} from "../redux/contactApiSlice";

function Main() {
  const [id, setId] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    photo: "",
    age: "",
  });
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const { data } = useGetAllContactQuery();
  const [postContact] = usePostContactMutation();
  const [putContact] = usePutContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const processAddContact = () => {
    const data = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      age: parseInt(form?.age),
      photo: form?.photo,
    };

    postContact({ ...data });

    closeModal();
  };

  const showModalEdit = (id) => {
    setModalEdit(!modalEdit);
    setId(id);
    data.data
      ?.filter((data) => data.id === id)
      .map((data) =>
        setForm((prev) => ({
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age.toString(),
          photo: data.photo,
        }))
      );
  };

  const processEditContact = (id) => {
    const data = {
      id: id,
      firstName: form?.firstName,
      lastName: form?.lastName,
      age: parseInt(form?.age),
      photo: form?.photo,
    };

    putContact({ ...data });

    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    }));

    closeModalEdit();
  };

  const onChangeHandler = (value, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setModalAdd(!modalAdd);
    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    }));
  };

  const closeModalEdit = () => {
    setModalEdit(!modalEdit);
    setForm((prev) => ({
      ...prev,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
    }));
  };

  const processDeleteContact = (id) => {
    deleteContact(id);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.header}>Contact App</Text>
      </View>
      <View style={styles.container}>
        <Button
          title="New Contact"
          color="#0a0a0a"
          onPress={() => setModalAdd(!modalAdd)}
        />
      </View>
      <ScrollView style={styles.containerMain}>
        {data?.data?.map((data, index) => {
          return (
            <View style={styles.card} key={index}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Image
                  source={{ uri: `${data.photo}` }}
                  style={{ width: 45, height: 45, borderRadius: 10 }}
                />
                <View>
                  <Text style={{ fontSize: 15, fontWeight: 700 }}>
                    {data.firstName} {data.lastName}
                  </Text>
                  <Text>{data.age}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 13 }}>
                <View>
                  <Pressable onPress={() => showModalEdit(data.id)}>
                    <Ionicons name="create-outline" size={28} color="black" />
                  </Pressable>
                </View>
                <View>
                  <Pressable onPress={() => processDeleteContact(data.id)}>
                    <Ionicons name="trash-outline" size={28} color="black" />
                  </Pressable>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal add */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAdd}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalAdd(!modalAdd);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10 }}>Photo url :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "photo")}
              value={form?.photo}
              placeholder="Photo url"
            />
            <Text style={styles.modalText}>First Name :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "firstName")}
              value={form?.firstName}
            />
            <Text style={styles.modalText}>Last Name :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "lastName")}
              value={form?.lastName}
            />
            <Text style={styles.modalText}>Age :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "age")}
              value={form?.age}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={processAddContact}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal add */}

      {/* Modal edit */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalEdit(!modalEdit);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ marginBottom: 10 }}>Photo url :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "photo")}
              value={form?.photo}
            />
            <Text style={styles.modalText}>First Name :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "firstName")}
              value={form?.firstName}
            />
            <Text style={styles.modalText}>Last Name :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "lastName")}
              value={form?.lastName}
            />
            <Text style={styles.modalText}>Age :</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeHandler(value, "age")}
              keyboardType="numeric"
              value={form?.age}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModalEdit}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => processEditContact(id)}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal edit */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  header: {
    fontSize: 19,
    fontWeight: 800,
  },
  containerMain: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f5f3f3",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#0a0a0a",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Main;
