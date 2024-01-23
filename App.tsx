import { FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Card from './Components/Card';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome5';

const App = () => {
  const [data, setData] = useState([
    {
      Id:uuid.v4(),
      Title: "Joseph",
      Body: "Joseph Alex Chakola"
    },
    {
      Id: uuid.v4(),
      Title: "Goutham",
      Body: "Goutham Krishna"
    },
    {
      Id:uuid.v4(),
      Title: "Anjith",
      Body: "Anjih Prakash"
    }
  ]);
  const [viewModal, setViewModal] = useState(false);

  const onPress = () => {
    setViewModal(true)
  }

  const onPressModal = () => {
    setViewModal(false);
  }
  const removeCard=(Id:String | Number[])=>{
    setData(data.filter(item => item.Id !=Id));
  }
  const ModalView = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const saveCard = () => {
      if (title != "" && body != "") {
        setData([...data, {
          Id:uuid.v4(),
          Title: title, 
          Body: body
        }]);
        onPressModal();
      }
    }

    return (
      <Modal transparent visible={viewModal} >
        <View style={styles.modal}>
          <View style={styles.modalMain}>
            <Text style={styles.label}>Title</Text>
            <TextInput placeholder='Title' style={styles.TextInput} value={title} onChangeText={setTitle} />
            <Text style={styles.label}>Body</Text>
            <TextInput placeholder='Body' style={styles.TextInput} value={body} onChangeText={setBody} numberOfLines={5} multiline/>

            <Pressable onPress={saveCard} style={styles.Pressable}>
              <Text style={styles.closeButton}>Save</Text>
            </Pressable>
            <Pressable onPress={onPressModal} style={styles.Pressable}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>);
  }
  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={data}
        renderItem={data => <Card data={data.item} onClose={removeCard} />}
        contentContainerStyle={{flex:1}}
        ListEmptyComponent={()=>(
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>
              List is Empty
            </Text>
          </View>
        )}
        keyExtractor={(item) => `${item.Id}`}
        showsVerticalScrollIndicator={false}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add Items </Text>
        <Icon name='plus' size={15} color={"white"}/>
      </Pressable>
      <ModalView />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    padding: 10,
    backgroundColor: "teal",
    borderRadius: 10,
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    display: "flex",
    flexDirection: "row"
  },
  buttonText: {
    color: 'white'
  },
  modal: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMain: {
    backgroundColor: "teal",
    width: 300,
    padding: 15,
    borderRadius: 10
  },
  label: {
    color: "white",
    fontSize: 20,
    marginVertical: 5
  },
  closeButton: {
    color: "white",
    fontSize: 25,
    margin: 5
  },
  TextInput: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 15
  },
  Pressable: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyView:{
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  emptyText:{
    fontSize: 25
  }

})