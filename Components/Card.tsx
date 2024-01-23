import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

type data={
Id: String | Number [],
Title: String,
Body: String
}
type CardProps = {
    data: data,
    onClose: (id: String|Number[]) => void
}


const Card = ({ data, onClose }: CardProps) => {
    const [expandedView, showExpandedView] = useState(false);

    const LargeView = ()=>(
        <Modal transparent visible={expandedView}>
            <View style={styles.expandedMain}>
                <View style={styles.contentCard}>
                    <Text style={styles.title}>{data.Title}</Text>
                    <ScrollView>
                    <Text style={styles.body}>{data.Body}</Text>
                    </ScrollView>
                    <Pressable style={styles.close} onPress={()=>{showExpandedView(false)}}>
                        <Text style={styles.closeButton}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )

    const trimmer = (body:String)=>{
        const splitBody = body.split("\n")

        if(splitBody.length>2){
            return splitBody[0] + "\n" + splitBody [1]+"\n"+"...."
        } else if(body.length>100) {
            return body.slice(0,100)
        } else{
            return body
        }
    }


  return (
    <View style={styles.card}>
        <Pressable style={styles.cardMain} onLongPress={()=>{showExpandedView(true)}}>
        <Text style={styles.title}>{data.Title}</Text>
        <Text style={styles.body}>{trimmer(data.Body)}</Text>
        </Pressable>
        <Pressable onPress={()=>{onClose(data.Id)}}>
            <Icon name='close' color={"white"} size={30}/>
        </Pressable>
        <LargeView/>
    </View>
  )
}


export default Card

const styles = StyleSheet.create({
    text:{
        fontSize: 30,
        color: 'red'
      },
      card:{
        height: 100,
        backgroundColor: 'grey',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        padding: 10,
        marginVertical: 10,
        display:"flex",
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'

      },
      title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10
      },
      body:{
        fontSize: 15,
        color: "white"
      },
      cardMain:{
        flex: 1
      },
      closeButton:{
        color: "white",
        fontSize: 20,
        fontWeight:"bold"
      },
      expandedMain:{
        backgroundColor: "transparent",
        justifyContent:"center",
        alignItems: "center",
        flex: 1
      },
      contentCard:{
        backgroundColor:"#7791a6",
        padding: 10,
        width:"80%",
        borderWidth: 2,
        borderColor:"white",
        borderRadius: 10,
        maxHeight: 400,
   
        elevation: 30,
        shadowColor: '#289bb8',
      },
      close:{
        justifyContent:"center",
        alignItems:"center"
      }
})