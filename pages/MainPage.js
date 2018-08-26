import React from 'react';
import { View, Button, Text } from 'react-native';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Follow Fashion</Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('CameraPage');
                    }}
                    title='Take a photo'
                />
                <Button
                    onPress={()=>{
                        this.props.navigation.navigate('UploadPage');
                    }}
                    title='Upload an image'
                />
            </View>
        );
    }

}

