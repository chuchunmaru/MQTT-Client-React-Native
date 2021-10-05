import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native'

const sendMessage = () => {
  console.log('lixo')
}

export default class App extends React.Component {


  render() {

      return (
        <View style={{backgroundColor: 'black', height:'100%', width:'100%', justifyContent: 'center', alignItems:'center'}}>
          <StatusBar hidden />
          <Text style={{fontSize:30}}>MQTT CLIENT TESTS</Text>
          <TouchableOpacity onPress={() => sendMessage()} style={{marginVertical:40, marginHorizontal:20, borderRadius:8, height: 50, width: '98%', backgroundColor:'#262626', borderWidth:2, borderColor:'rgba(255, 255, 255, .4)', justifyContent:"center"}}>
            <View>
              <Text style={{fontSize:25,  textAlign:'center', color:'rgba(255,255,255,.5)'}}>
                SEND MESSAGE FOR ESP
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
}
}