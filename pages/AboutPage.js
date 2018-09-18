import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

function AboutPage(props) {
    return (
        <View>
            <Text>How to use</Text>
            <Text>Step 1: Choose a photo from gallery or use a camera to take a picture</Text>
            <Text>Step 2: Choose ingredients that you would like to include from the picture</Text>
            <Text>Step 3: Choose which courses you would like to include</Text>
            <Text>Step 4: Click on a recipe to see more details</Text>
            <Text>Step 5: Click 'See Full Recipe' to get the instructions!</Text>
            <Text>Congratulations! Try it yourself!</Text>
            <Button
                title="Back"
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </View>
    );
}

export default AboutPage;
