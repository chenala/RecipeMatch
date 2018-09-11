import React from 'react';
import { View, Button, Text } from 'react-native';
import { TITLE } from '../constants';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{TITLE}</Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('UploadPage');
                    }}
                    title='Get Started'
                />
                <Button
                    onPress={()=>{
                        //this.props.navigation.navigate('AboutPage');
                    }}
                    title='About'
                />
            </View>
        );
    }
}
