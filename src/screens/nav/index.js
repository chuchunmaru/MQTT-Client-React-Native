import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from './drawerContent'
import Home from '../app/Home'
import Client from '../app/Client'
import AddMqtt from '../app/AddClient'
import Menu from '../app/Menu'

const Drawer = createDrawerNavigator()

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent{...props} />}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Client" component={Client} />
          <Drawer.Screen name="AddClient" component={AddMqtt} />
          <Drawer.Screen name="Menu" component={Menu} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}