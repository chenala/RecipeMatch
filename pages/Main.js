import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { TITLE } from '../constants';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{TITLE}</Text>
                <Image
                    style={styles.image}
                    source={require('./assets/RecipeMatchLogoRect.png')}
                />
                <Button
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate('UploadPage');
                    }}
                    title='Get Started'
                />
                <Button
                    style={styles.button}
                    onPress={()=>{
                        this.props.navigation.navigate('AboutPage');
                    }}
                    title='About'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'rgb(235,28,34)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 30,
    },
    image: {
        width: 200,
        height: 200,
        margin: 20,
    },
    button: {
        margin: 10,
        padding: 10,
        fontSize: 10,
    },
    
});
