import React from 'react'
import { ScrollView, StatusBar, View, Text, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'


const dim = Dimensions.get('screen').width

export default class Home extends React.Component {

  dashboards = []
  _isMounted = false

  state = {
    haveConnection: false,
    loadTopics: false,
  }

  openDashboard = (name, topic, id, url, port) => {
    this.props.navigation.navigate('Client', { name: name, topic: topic, id: id, url: url, port: port })
  }


  getTopics = async () => {
    var counter = await AsyncStorage.getItem('@counter')
    for (let i = 0; i < counter; i++) {
      this.dashboards.push({ topic: await AsyncStorage.getItem(`@topic${i}`), id: await AsyncStorage.getItem(`@id${i}`), brokerurl: await AsyncStorage.getItem(`@brokerurl${i}`), portNumber: await AsyncStorage.getItem(`@port${i}`), dashDesc: await AsyncStorage.getItem(`@desc${i}`), dashName: await AsyncStorage.getItem(`@dashname${i}`) })
    }
    this.setState({
      loadTopics: true
    })
  }

  checkDevices = async () => {
    if (await AsyncStorage.getItem('@counter')) {
      this.setState({ haveConnection: true })
      this.getTopics()
    }
  }

  componentDidMount() {
    this.checkDevices()
    this._isMounted = true
  }

  componentWillUnmount() {
    this.dashboards = []
    this._isMounted = false
    this.setState({
      haveConnection: false,
      loadTopics: false
    })
  }

  render() {

    if (!this.state.haveConnection) {
      return (
        <View>
          <StatusBar hidden />
          <View style={{ backgroundColor: 'white', height: '100%', padding: 15, paddingHorizontal: 20 }}>
            <StatusBar hidden />
            <ScrollView showsVerticalScrollIndicator={false} style={{ borderRadius: 10, backgroundColor: 'ghostwhite', width: '100%', heigth: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 5, elevation: 10, }}>
              <View>
                <Text style={{ color: 'rgba(0,0,0,.6)', fontSize: 25, marginVertical: 30, marginHorizontal: 5, textAlign: 'center' }}>
                  You do not have MQTT connections yet. To use the panel press "Add Connection" or click in the image.
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddClient')}>
                  <View style={{ marginHorizontal: 10, justifyContent: 'space-around', borderWidth: 1, borderColor: 'rgba(0,0,0,.24)', borderRadius: 4, paddingVertical: 5, marginTop: 30 }}>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ marginRigth: 90, marginRight: 40 }}>
                        <Ionicons name={'ios-add-circle-outline'} size={50} color={'black'} />
                      </View>
                      <View>
                        <Text style={{ color: 'rgba(5,0,10,.6)', fontSize: 25, textAlign: 'center' }}>
                          Add Connection
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToAdd}>
                  <View style={{ width: '100%', alignItems: 'center', marginVertical: 30 }}>
                    <FastImage
                      style={{ width: dim * .9, height: dim * .9 }}
                      source={require('../../animations/iot.gif')}
                      priority={FastImage.priority.high}
                      resizeMode={FastImage.resizeMode.contain} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )
    }
    else if (!this.state.loadTopics && this.state.haveConnection) {
      return (
        <View style={{ height: '100%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar hidden />
          <FastImage
            style={{ width: dim * .9, height: dim * .9 }}
            source={require('../../animations/78259-loading.gif')}
            priority={FastImage.priority.high}
            resizeMode={FastImage.resizeMode.contain} />
        </View>
      )
    }
    else {
      return (
        <View style={{ height: '100%', width: '100%', padding: 10 }}>
          <StatusBar hidden />
          <View style={{ height: 50, width: '99.4%', backgroundColor: 'rgba(255,127,80, .8)', marginVertical: 2, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginBottom: 20 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Text style={{ fontSize: 30, textAlign: 'center', color: 'ghostwhite', width: '100%' }}>
                Dashboards
              </Text>
            </View>
          </View>
          <View style={{ width: '99%', height: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <SafeAreaView>
              <FlatList style={{ marginBottom: 80, marginTop: 10 }}
                data={this.dashboards}
                renderItem={({ item }) =>
                  <ScrollView>
                    <View>
                      <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0, .75)', marginTop: 5 }} />
                      <Collapse>
                        <CollapseHeader style={{ justifyContent: 'center', alignItems: 'center', }}>
                          <View style={{ justifyContent: 'space-between', alignItems: 'center', height: 50, flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(0,250,154, .4)', borderRadius: 4, height: 40, alignItems: 'center', justifyContent: 'center', width: '98%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'rgba(0,0,5, .6)', fontSize: 25 }}>
                                Dashboard: <Text style={{ fontSize: 20 }}>{item.dashName}</Text>
                              </Text>
                            </View>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18 }}>
                                Description
                              </Text>
                            </View>
                            <View style={{ width: '58%', minHeight: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                                {item.dashDesc}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18 }}>
                                Broker Url
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                                {item.brokerurl}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18 }}>
                                Topic
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                                {item.topic}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18 }}>
                                Port
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                                {item.portNumber}
                              </Text>
                            </View>
                          </View>
                          <View style={{ borderBottomWidth: .4, borderColor: 'rgba(0,0,0, .075)', width: '90%', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }} />
                          <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '99%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <View style={{ backgroundColor: 'rgba(70,130,180, .4)', borderRadius: 4, height: 30, alignItems: 'center', justifyContent: 'center', width: '39%' }}>
                              <Text style={{ marginHorizontal: 15, color: 'ghostwhite', fontSize: 18 }}>
                                Client Id
                              </Text>
                            </View>
                            <View style={{ width: '58%', height: 40, justifyContent: 'center' }}>
                              <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: 18 }}>
                                {item.id}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity onPress={() => this.openDashboard(item.dashName, item.topic, item.id, item.brokerurl, item.portNumber)}>
                            <View style={{ backgroundColor: 'rgba(255,165,0, .5)', width: '98%', height: 40, marginVertical: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                              <Text>
                                Open Dashboard
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </CollapseBody>
                      </Collapse>
                      <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0,0,0, .75)', marginBottom: 7.5, }} />
                    </View>
                  </ScrollView>
                }
                keyExtractor={(item, index) => index.toString()} />
            </SafeAreaView>
          </View>
        </View>
      )
    }
  }
}

