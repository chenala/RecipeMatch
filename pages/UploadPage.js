import React from 'react';
import {
  Button,
  View,
  Text,
} from 'react-native';
//import { RNCamera } from 'react-native-camera';

export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>This is the image upload page (Placeholder)</Text>
        <Button
            title='back to main page'
            onPress={() => {
                this.props.navigation.navigate('MainPage');
            }}
        />
      </View>
    );
  }
}
