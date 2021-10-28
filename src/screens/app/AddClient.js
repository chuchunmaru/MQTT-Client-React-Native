import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, TextInput, Dimensions, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'


const dim = Dimensions.get('screen').width
export default class AddMqtt extends React.Component {

  state = {
    clientTopic: null,
    dashboardNameColor: 'rgba(0,0,80, .125)',
    dashboardName: null,
    clientTopicColor: 'rgba(0,0,80, .125)',
    clientId: null,
    clientIdColor: 'rgba(0,0,80, .125)',
    brokerUrl: null,
    brokerUrlColor: 'rgba(0,0,80, .125)',
    portNumber: null,
    portNumberColor: 'rgba(0,0,80, .125)',
    description: '',
    placeholderalign: 'center',
    placeholderText: 'Dashboard Description (opcional)',
    vpta: 'center'
  }

  descriptionmanager = () => {
    this.setState({ placeholderalign: 'left', placeholderText: '', vpta: 'top' })
  }

  addConnection = async () => {
    if (!this.state.brokerUrl) {
      this.setState({ brokerUrlColor: 'rgba(255, 0, 0, .3)' })
    }
    if (!this.state.clientId) {
      this.setState({ clientIdColor: 'rgba(255, 0, 0, .3)' })
    }
    if (!this.state.dashboardName) {
      this.setState({ dashboardNameColor: 'rgba(255, 0, 0, .3)' })
    }
    if (!this.state.clientTopic) {
      this.setState({ clientTopicColor: 'rgba(255, 0, 0, .3)' })
    }
    if (!this.state.portNumber) {
      this.setState({ portNumberColor: 'rgba(255, 0, 0, .3)' })
    }
    else if (this.state.brokerUrl && this.state.clientId && this.state.clientTopic && this.state.portNumber) {
      var counter
      if (!await AsyncStorage.getItem('@counter')) {
        counter = 0
      }
      else {
        counter = parseInt(await AsyncStorage.getItem('@counter'))
      }
      await AsyncStorage.multiSet([[`@topic${counter}`, this.state.clientTopic], [`@id${counter}`, this.state.clientId], [`@brokerurl${counter}`, this.state.brokerUrl], [`@port${counter}`, this.state.portNumber], ['@counter', JSON.stringify(counter + 1)], [`@desc${counter}`, this.state.description], [`@dashname${counter}`, this.state.dashboardName]])

      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    }
  }

  render() {

    return (
      <ScrollView style={{ backgroundColor: 'ghostwhite', height: '100%', width: '100%', paddingTop: 3 }}>
        <View style={{ width: '100%', heigth: '100%' }}>
          <View style={{ height: 50, width: '99.4%', backgroundColor: 'rgba(25,25,112, .6)',  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
            <Ionicons
              onPress={() => this.props.navigation.goBack()}
              name={'md-arrow-back-circle-outline'}
              size={45}
              style={{ marginRight: 20 }}
              color={'ghostwhite'}
            />
            <View style={{ width: dim * .8, justifyContent: 'center' }}>
              <Text style={{ fontSize: 30, textAlign: 'center', color: 'ghostwhite' }}>
                Add Connection !!!
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ textAlign: 'left', marginHorizontal: 20, color: 'rgba(0,0,0,.4)', fontSize: 18 }}>
              fill all fields with <Text style={{ color: 'rgba(255,0,0,.6)' }}><Text style={{ color: 'rgba(255,0,0,.6)' }}>*</Text></Text>
            </Text>
          </View>
          <ScrollView style={{ padding: 10, paddingBottom: 30 }}>
            <View style={{ height: 50, width: '100%', backgroundColor: this.state.dashboardNameColor,  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
              <View style={{ width: '100%', justifyContent: 'center' }}>
                <TextInput maxLength={120} onPressIn={() => this.setState({ dashboardNameColor: 'rgba(0,0,80, .125)' })} value={this.state.dashboardName} onChangeText={text => this.setState({ dashboardName: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={'\b* Dashboard Name'} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
              </View>
            </View>
            <View style={{ height: 50, width: '100%', backgroundColor: this.state.clientTopicColor,  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
              <View style={{ width: '100%', justifyContent: 'center' }}>
                <TextInput onPressIn={() => this.setState({ clientTopicColor: 'rgba(0,0,80, .125)' })} value={this.state.clientTopic} onChangeText={text => this.setState({ clientTopic: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={'\b* Topic'} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
              </View>
            </View>
            <View style={{ height: 50, width: '100%', backgroundColor: this.state.clientIdColor,  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
              <View style={{ width: '100%', justifyContent: 'center' }}>
                <TextInput onPressIn={() => this.setState({ clientIdColor: 'rgba(0,0,80, .125)' })} value={this.state.clientId} onChangeText={text => this.setState({ clientId: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={'\b* Client Id'} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 50, width: '64%', backgroundColor: this.state.brokerUrlColor,  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center' }}>
                  <TextInput onPressIn={() => this.setState({ brokerUrlColor: 'rgba(0,0,80, .125)' })} value={this.state.brokerUrl} onChangeText={text => this.setState({ brokerUrl: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'url'} placeholder={'\b* Broker Url'} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
                </View>
              </View>
              <View style={{ height: 50, width: '32%', backgroundColor: this.state.portNumberColor,  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center' }}>
                  <TextInput onPressIn={() => this.setState({ portNumberColor: 'rgba(0,0,80, .125)' })} value={this.state.portNumber} onChangeText={text => this.setState({ portNumber: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'decimal-pad'} placeholder={'\b* Port'} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%' }} underlineColorAndroid={'rgba(0,0,0,0)'} />
                </View>
              </View>
            </View>
            <View>
              <View style={{ width: '100%', justifyContent: 'center' }}>
                <TextInput maxLength={200} onPressIn={this.descriptionmanager} value={this.state.description} onChangeText={text => this.setState({ description: text })} placeholderTextColor={'rgba(12, 24, 82, .5)'} selectionColor={'rgba(12, 24, 82, .5)'} keyboardType={'ascii-capable'} placeholder={this.state.placeholderText} style={{ color: 'rgba(0,0,0,.5)', fontSize: 20, width: '100%', height: 200, backgroundColor: 'rgba(0,0,80, .125)',  marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, marginVertical: 20, textAlign: this.state.placeholderalign }} underlineColorAndroid={'rgba(0, 0, 0, 0)'} multiline textAlignVertical={this.state.vpta} />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.addConnection()}>
              <View style={{ height: 50, width: '100%', borderColor: 'rgba(0,0,0,.3)', borderWidth: .3, borderRadius: 4, justifyContent: 'center', backgroundColor: 'rgba(25,25,112, .6)', marginTop: 15 }}>
                <Text style={{ textAlign: 'center', color: 'ghostwhite', fontSize: 25 }}>
                  Save Connection
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    )
  }
}
