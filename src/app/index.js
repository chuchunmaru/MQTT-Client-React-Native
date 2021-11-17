import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MQTT from 'react-native-mqtt-angelos3lex'

export default class Client extends React.Component {

  state = {
    topic: ['LogVaral', 'SetVaral', 'TimeVaral'],
    id: '45das46d4as56das54d6as45da6sigsagdiugai',
    url: 'mqtt://broker.hivemq.com',
    port: 1883,
    textLog: [],
    timeYear: Date().substring(11, 15),
    timeMonth: Date().substring(4, 7),
    timeDay: Date().substring(8, 10),
    timeMinutes: Date().substring(19, 21),
    timeHour: Date().substring(16, 18),
    fTimeHour: () => {
      var hour = (parseInt(this.state.timeHour) + 3)

      if (hour > 24) {
        hour -= 24
      }

      if (hour <= 9) {
        hour = `0${hour}`
      }
      console.log(hour)

      return hour
    },
    setLog: (msg, dev) => {
      var previousLog = this.state.textLog
      if (dev == 'Esp') {
        previousLog.push(<View><Text style={{ color: 'rgba(0,0,0,.5)', fontSize: 16 }}><Text style={{ color: 'rgb(32,178,170)' }}>{Date().substring(15, 24)} [{dev}] : </Text>{msg}</Text></View>)
      }
      else if (dev == 'Kashikuta') {
        previousLog.push(<View><Text style={{ color: 'rgba(0,0,0,.5)', fontSize: 16 }}><Text style={{ color: 'rgb(219,112,147)' }}>{Date().substring(15, 24)} [{dev}] : </Text>{msg}</Text></View>)
      }
      this.setState({
        textLog: previousLog
      })
    }

  }

  connect = (messageForSend, pos, topic, url, port, setL) => {
    MQTT.createClient({
      uri: `${url}:${port}`,
      clientId: this.state.id
    }).then(function (client) {

      client.on('closed', function () {
        console.log('mqtt.event.closed')
      })

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg)
      })

      client.on('message', function (msg) {
        console.log(msg)
        if (msg.topic == topic[0]) {
          if (msg.data.match('EspD')) {
            setL(msg.data.replace(/EspD/i, ''), 'Esp')
          }
          else if (msg.data.match('KashikutaM')) {
            setL(msg.data.replace(/kashikutaM/i, ''), 'Kashikuta')
          }
          if(msg.data.match('Finished')){
            client.publish(topic[0], 'KashikutaMGood Work!!!', 0, false)
          }
          if(msg.data.match('Clothesline scheduled to collect')){
            client.publish(topic[0], 'KashikutaMYes Baby, thank you!!!', 0, false)
          }
          if(msg.data.match('Collecting clothesline')){
            client.publish(topic[0], 'KashikutaMGood Work Esp! See you', 0, false)
          }
        }

      })

      client.on('connect', function () {

        for (let i = 0; i < topic.length; i++) {
          client.subscribe(topic[i], 0)
        }
        console.log(topic[pos])
        client.publish(topic[pos], messageForSend, 0, false)

      })

      client.connect()
    }).catch(function (err) {
      console.log(err)
    })
  }


  componentDidMount() {
    this.connect('KashikutaMHello Esp', 0, this.state.topic, this.state.url, this.state.port, this.state.setLog)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'ghostwhite', height: '100%' }}>
        <StatusBar hidden />
        <View style={{ width: '99.4%', backgroundColor: '#FF647F', marginVertical: 2, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
        <View style={{ backgroundColor: 'rgba(25, 25, 255, .0105)', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ width: '10%' }} />
              <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', height:50 }}>
                <Text style={{ color: 'rgb(255,255,250)', fontSize: 30 }}>
                  Control Panel
                </Text>
              </View>
              <View style={{ width: '10%', alignItems: 'flex-end' }}>
                <Icon
                  onPress={() => {}}
                  name={'info'}
                  size={25}
                  style={{ marginRight: 10 }}
                  color={'rgb(255,255,255)'}
                />
              </View>
            </View>
        </View>
        <View style={{ width: '100%', height: '100%', padding: 10 }}>
          <View style={{ height: 300, width: '98%', backgroundColor: 'rgba(240,248,255, 1)', borderRadius: 6, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 5, shadowRadius: 1, elevation: 5, marginRight: 'auto', marginLeft: 'auto', borderBottomWidth: .7, borderTopWidth: .5, borderColor: 'rgba(0,0,0,.125)', padding: 5, marginBottom: 10 }}>
            <View style={{ backgroundColor: 'rgba(25, 25, 255, .0105)', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ width: '10%' }} />
              <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                  Text Log
                </Text>
              </View>
              <View style={{ width: '10%', alignItems: 'flex-end' }}>
                <Icon
                  onPress={() => this.setState({ textLog: [] })}
                  name={'clear-all'}
                  size={30}
                  style={{ marginRight: 10 }}
                  color={'rgba(0,0,0,.6)'}
                />
              </View>
            </View>
            <ScrollView>
              <View>
                {this.state.textLog}
              </View>
            </ScrollView>
          </View>
          <ScrollView style={{ marginBottom: 30 }}>
            <TouchableOpacity onPress={() => this.connect('0', 1, this.state.topic, this.state.url, this.state.port, this.state.setLog)}>
              <View style={{ backgroundColor: '#FC6878', width: '98%', height: 40, marginVertical: 10, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'ghostwhite', fontSize: 20 }}>
                  Close
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.connect('180', 1, this.state.topic, this.state.url, this.state.port, this.state.setLog)}}>
              <View style={{ backgroundColor: 'rgb(32,178,170)', width: '98%', height: 40, marginVertical: 5, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'ghostwhite', fontSize: 20 }}>
                  Open
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginVertical: 20, borderRadius: 4, backgroundColor: 'rgba(255, 201, 59, .9)', width: '98%', justifyContent: 'center', alignItems: 'center', marginLeft: '1%', marginRight: '1%' }}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Picker
                  selectedValue={this.state.timeMonth}
                  style={{ height: 50, width: 150, color: 'rgba(255,255,255,1)' }}
                  onValueChange={(itemValue) => this.setState({ timeMonth: itemValue })}
                  dropdownIconColor='rgb(255,255,255)'
                  dropdownIconRippleColor='rgb(255, 0,0)'
                >
                  <Picker.Item label="January" value="Jan" />
                  <Picker.Item label="February" value="Feb" />
                  <Picker.Item label="March" value="Mar" />
                  <Picker.Item label="April" value="Apr" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="June" value="Jun" />
                  <Picker.Item label="July" value="Jul" />
                  <Picker.Item label="August" value="Aug" />
                  <Picker.Item label="September" value="Sep" />
                  <Picker.Item label="October" value="Oct" />
                  <Picker.Item label="November" value="Nov" />
                  <Picker.Item label="December" value="Dec" />
                </Picker>
                <Picker
                  selectedValue={this.state.timeDay}
                  style={{ height: 50, width: 100, color: 'rgba(255,255,255,1)' }}
                  onValueChange={(itemValue) => this.setState({ timeDay: itemValue })}
                  dropdownIconColor='rgb(255,255,255)'
                  dropdownIconRippleColor='rgb(255,0,0)'
                >
                  <Picker.Item label="01" value="01" />
                  <Picker.Item label="02" value="02" />
                  <Picker.Item label="03" value="03" />
                  <Picker.Item label="04" value="04" />
                  <Picker.Item label="05" value="05" />
                  <Picker.Item label="06" value="06" />
                  <Picker.Item label="07" value="07" />
                  <Picker.Item label="08" value="08" />
                  <Picker.Item label="09" value="09" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="26" value="26" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="28" value="28" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="31" value="31" />
                </Picker>
                <Picker
                  selectedValue={this.state.timeYear}
                  style={{ height: 50, width: 120, color: 'rgba(255,255,255,1)' }}
                  onValueChange={(itemValue) => this.setState({ timeYear: itemValue })}
                  dropdownIconColor='rgb(255,255,255)'
                  dropdownIconRippleColor='rgb(255, 0,0)'
                >
                  <Picker.Item label="2021" value="2021" />
                  <Picker.Item label="2022" value="2022" />
                  <Picker.Item label="2023" value="2023" />
                  <Picker.Item label="2024" value="2024" />
                  <Picker.Item label="2025" value="2025" />
                </Picker>
              </View>
              <View style={{ flexDirection: 'row', width: '100%', color: 'rgba(255,255,255,1)' }}>
                <Picker
                  selectedValue={this.state.timeHour}
                  style={{ height: 50, width: 150, color: 'rgba(255,255,255,1)' }}
                  onValueChange={(itemValue) => this.state.timeHour(itemValue)}
                  dropdownIconColor='rgb(255,255,255)'
                  dropdownIconRippleColor='rgb(255, 0,0)'
                >
                  <Picker.Item label="00" value="00" />
                  <Picker.Item label="01" value="01" />
                  <Picker.Item label="02" value="02" />
                  <Picker.Item label="03" value="03" />
                  <Picker.Item label="04" value="04" />
                  <Picker.Item label="05" value="05" />
                  <Picker.Item label="06" value="06" />
                  <Picker.Item label="07" value="07" />
                  <Picker.Item label="08" value="08" />
                  <Picker.Item label="09" value="09" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                </Picker>
                <Picker
                  selectedValue={this.state.timeMinutes}
                  style={{ height: 50, width: 100, color: 'rgba(255,255,255,1)' }}
                  onValueChange={(itemValue) => this.setState({ timeMinutes: itemValue })}
                  dropdownIconColor='rgb(255,255,255)'
                  dropdownIconRippleColor='rgb(255, 0,0)'
                >
                  <Picker.Item label="01" value="00" />
                  <Picker.Item label="01" value="01" />
                  <Picker.Item label="02" value="02" />
                  <Picker.Item label="03" value="03" />
                  <Picker.Item label="04" value="04" />
                  <Picker.Item label="05" value="05" />
                  <Picker.Item label="06" value="06" />
                  <Picker.Item label="07" value="07" />
                  <Picker.Item label="08" value="08" />
                  <Picker.Item label="09" value="09" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="26" value="26" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="28" value="28" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="31" value="31" />
                  <Picker.Item label="32" value="32" />
                  <Picker.Item label="33" value="33" />
                  <Picker.Item label="34" value="34" />
                  <Picker.Item label="35" value="35" />
                  <Picker.Item label="36" value="36" />
                  <Picker.Item label="37" value="37" />
                  <Picker.Item label="38" value="38" />
                  <Picker.Item label="39" value="39" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="41" value="41" />
                  <Picker.Item label="42" value="42" />
                  <Picker.Item label="43" value="43" />
                  <Picker.Item label="44" value="44" />
                  <Picker.Item label="45" value="45" />
                  <Picker.Item label="46" value="46" />
                  <Picker.Item label="47" value="47" />
                  <Picker.Item label="48" value="48" />
                  <Picker.Item label="49" value="49" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="51" value="51" />
                  <Picker.Item label="52" value="52" />
                  <Picker.Item label="53" value="53" />
                  <Picker.Item label="54" value="54" />
                  <Picker.Item label="55" value="55" />
                  <Picker.Item label="56" value="56" />
                  <Picker.Item label="57" value="57" />
                  <Picker.Item label="58" value="58" />
                  <Picker.Item label="59" value="59" />
                </Picker>
              </View>
              <View style={{ width: '100%', marginHorizontal: 2, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.connect(`${this.state.timeMonth} ${this.state.timeDay} ${this.state.fTimeHour()}:${this.state.timeMinutes} ${this.state.timeYear}`, 2, this.state.topic, this.state.url, this.state.port, this.state.setLog)}>
                  <View style={{ backgroundColor: 'rgba(255, 201, 50, 1)', width: '92%', height: 40, marginVertical: 10, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                    <Text style={{ color: 'rgba(255,255,255,1)', fontSize: 20, marginLeft: 'auto', marginRight: 'auto', paddingHorizontal: 10 }}>
                      Timer Mode
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
