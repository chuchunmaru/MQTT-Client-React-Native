import * as React from 'react'
import { View, StatusBar, BackHandler, ScrollView } from "react-native"
import { DrawerItem } from "@react-navigation/drawer"
import { Avatar, Title, Caption } from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'
import ProfilePhoto from '../../assets/icons/pp.png'
export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'white' }}>
      <StatusBar hidden={true} barStyle="light-content" />
      <View style={styles.DrawerContainer}>
        <View style={{ borderWidth: 1.5, borderRadius: 50, borderColor: 'rgba(0,0,0,.25)' }}>
          <Avatar.Image source={ProfilePhoto} size={80} style={{ backgroundColor: 'white' }} />
        </View>
        <View style={styles.TitleView}>
          <Title style={{ fontSize: 16, marginTop: 3, fontWeight: "bold", color: 'black' }}>Mqtt Panel</Title>
          <Caption style={{ fontSize: 14, fontWeight: "200", lineHeight: 14, color: 'black' }}>_Kashikuta</Caption>
        </View>
      </View>
      <ScrollView>
        <View style={styles.bottomDrawerSection}>
          <View style={styles.horizontalLine} />

          <DrawerItem icon={() => (
            <Ionicons name={'ios-home-outline'} size={35} color={'black'} />
          )}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Home"
            onPress={() => { props.navigation.navigate('Home') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={() => (
            <Ionicons name={'ios-add-circle-outline'} size={35} color={'black'} />
          )}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Add Client"
            onPress={() => { props.navigation.navigate('AddClient') }} />
          <View style={styles.horizontalLine} />

          <DrawerItem icon={() => (
            <Ionicons name={'ios-fast-food-outline'} size={35} color={'black'} />
          )}
            labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
            label="Menu & Developers"
            onPress={() => { props.navigation.navigate('Menu') }} />
          <View style={styles.horizontalLine} />
        </View>
      </ScrollView>
      <View style={{ marginBottom: 10 }}>
        <DrawerItem icon={({ color }) => (
          <Ionicons name={'ios-exit-outline'} size={35} color={'black'} />)}
          labelStyle={{ color: 'rgba(0, 0, 0, .7)', fontSize: 15, fontFamily: 'Montserrat-Regular' }}
          label="Exit"
          onPress={() => { BackHandler.exitApp() }} />
      </View>
    </View>
  )
}