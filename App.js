import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native'
import MQTT from 'react-native-mqtt-angelos3lex'


const sendMessage = (messageForSend) => {

  MQTT.createClient({
    uri: 'mqtt://test.mosquitto.org:1883',
    clientId: 'chuchunmaru:)'
  }).then(function (client) {

    client.on('closed', function () {
      console.log('mqtt.event.closed');
    });

    client.on('error', function (msg) {
      console.log('mqtt.event.error', msg);
    });

    client.on('message', function (msg) {

      console.log(msg)

      if (msg.data.match(/EspUrlToConfig/)) {
        var ipadress = msg.data.replace(/EspUrlToConfig/i, '')
        console.log(ipadress)
      }

    });

    client.on('connect', function () {
      console.log('connected');
      client.subscribe('chuchunmaru', 0);
      client.publish('chuchunmaru', messageForSend, 0, false);
    });

    client.connect();
  }).catch(function (err) {
    console.log(err);
  });
}

export default class App extends React.Component {


  render() {

    return (
      <View style={{ backgroundColor: 'black', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <StatusBar hidden />
        <Text style={{ fontSize: 30 }}>MQTT CLIENT TESTS</Text>
        <TouchableOpacity onPress={() => sendMessage("RequestUrlConfig")} style={{ marginVertical: 40, marginHorizontal: 20, borderRadius: 8, height: 50, width: '98%', backgroundColor: '#262626', borderWidth: 2, borderColor: 'rgba(255, 255, 255, .4)', justifyContent: "center" }}>
          <View>
            <Text style={{ fontSize: 25, textAlign: 'center', color: 'rgba(255,255,255,.5)' }}>
              SEND MESSAGE FOR ESP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}