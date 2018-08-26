/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import MainPage from './pages/MainPage';
import CameraPage from './pages/CameraPage';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import UploadPage from './pages/UploadPage';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScreenNavigation />
    );
  }
}

const ScreenNavigation = createStackNavigator({
  MainPage: {screen: MainPage},
  CameraPage: {screen: CameraPage},
  UploadPage: {screen: UploadPage},
})

/*
function A(props) {
  return (
    <Button
      title="go to B"
      onPress={() => {
        props.navigation.navigate('B');
      }}
    />
  );
}

function B(props) {
  return (
    <Button
      title="go to A"
      onPress={() => {
        props.navigation.navigate('A');
      }}
    />
  );
}
*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
