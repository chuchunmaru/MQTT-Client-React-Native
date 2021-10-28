import React from 'react'
import { View, Dimensions, Text, ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MQTT from 'react-native-mqtt-angelos3lex'
const dim = Dimensions.get('screen').width

export default class Client extends React.Component {

  state = {
    name: this.props.route.params.name,
    topic: this.props.route.params.topic,
    id: this.props.route.params.id,
    url: this.props.route.params.url,
    port: this.props.route.params.port,
    textLog: ''
  }

  statef = (st, newValue) => {
    this.setState({ st: newValue })
  }

  connect = (messageForSend, topic, url, port, ttt = (newValue) => { this.setState({ textLog: `${this.state.textLog}\n${Date().substring(15, 24)} : ${newValue}` }) }) => {
    MQTT.createClient({
      uri: `mqtt://${url}:${port}`,
      clientId: this.state.id
    }).then(function (client) {

      client.on('closed', function () {
        console.log('mqtt.event.closed')
      })

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg)
      })

      client.on('message', function (msg) {

        ttt(msg.data)

      })

      client.on('connect', function () {
        console.log('connected')
        client.subscribe(topic, 0)
        client.publish(topic, messageForSend, 0, false)
      })

      client.connect()
    }).catch(function (err) {
      console.log(err)
    })
  }

  componentDidMount() {
    console.log(this.state)
    this.connect('Hello Esp', this.state.topic, this.state.url, this.state.port)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'ghostwhite', height: '100%' }}>
        <View style={{ width: '99.4%', backgroundColor: '#E0C5FA', marginVertical: 2, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
          <Ionicons
            onPress={() =>
              this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], })}
            name={'md-arrow-back-circle-outline'}
            size={45}
            style={{ marginRight: 20 }}
            color={'ghostwhite'}
          />
          <View style={{ width: dim * .8, justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, textAlign: 'center', color: 'white', marginVertical: 5 }}>
              Dashboard {`\n${this.state.name}`}
            </Text>
          </View>
        </View>
        <ScrollView style={{ width: '100%', height: '100%', padding: 10 }}>
          <View style={{ height: 400, width: '98%', backgroundColor: 'rgba(240,248,255, 1)', borderRadius: 6, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 30 }}>
            <View style={{ backgroundColor: 'rgba(25, 25, 255, .0105)', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: '10%'}}/>
            <View style={{width:'80%', alignItems:'center', justifyContent:'center'}}>
              <Text style={{ color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                Text Log
              </Text>
              </View>
              <View style={{ width: '10%', alignItems:'flex-end' }}>
                <Icon
                  onPress={() => this.setState({textLog: ''})}
                  name={'clear-all'}
                  size={30}
                  style={{marginRight:10}}
                  color={'rgba(0,0,0,.6)'}
                />
              </View>
            </View>
            <ScrollView>
              <Text style={{ color: 'rgba(0,0,0,.5)' }}>
                {this.state.textLog}
              </Text>
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => this.connect('setVaralState$0', this.state.topic, this.state.url, this.state.port)}>
            <View style={{ backgroundColor: '#FC6878', width: '98%', height: 40, marginVertical: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{color:'ghostwhite', fontSize:20}}>
                Close
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.connect('setVaralState$180', this.state.topic, this.state.url, this.state.port)}>
            <View style={{ backgroundColor: 'rgba(51, 255, 181, .45)', width: '98%', height: 40, marginVertical: 5, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{color:'rgba(0,0,0,.6)', fontSize:20}}>
                Open
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}