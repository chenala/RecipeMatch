import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

function AboutPage(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>How to use</Text>
            <Text style={styles.text}>Step 1: Choose a photo from gallery or use a camera to take a picture</Text>
            <Text style={styles.text}>Step 2: Choose ingredients that you would like to include from the picture</Text>
            <Text style={styles.text}>Step 3: Choose which courses you would like to include</Text>
            <Text style={styles.text}>Step 4: Click on a recipe to see more details</Text>
            <Text style={styles.text}>Step 5: Click 'See Full Recipe' to get the instructions!</Text>
            <Text style={styles.text}>Congratulations! Try it yourself!</Text>
            <Button
                title="Back"
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'rgb(235,28,34)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        margin: 7,
    }
});

export default AboutPage;
