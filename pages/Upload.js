import React from 'react';
import {
    Button,
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { readFile } from "react-native-fs";
import { CLARFAI_API_KEY } from '../apiKeys';
import { CLARIFAI_FOOD_MODEL } from '../constants';

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: CLARFAI_API_KEY});

export default class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedImage: null
        };
        this.callCamera = this.callCamera.bind(this);
        this.callImageUpload = this.callImageUpload.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.reset = this.reset.bind(this);
        this.processImageHandler = this.processImageHandler.bind(this);
    }

    callCamera() {
        ImagePicker.launchCamera({title: "Take a Photo", maxWidth: 800, maxHeight: 600}, res => {
            if (res.didCancel) {
              console.log("User cancelled!");
            } else if (res.error) {
              console.log("Error", res.error);
            } else {
              this.setState({
                pickedImage: { uri: res.uri }
              });
              
            }
        });
    }

    callImageUpload() {
        ImagePicker.launchImageLibrary({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
            if (res.didCancel) {
              console.log("User cancelled!");
            } else if (res.error) {
              console.log("Error", res.error);
            } else {
              this.setState({
                pickedImage: { uri: res.uri }
              });
              
            }
        });
    }

    reset() {
        this.setState({
            pickedImage: null
        });
    }

    resetHandler = () => {
        this.reset();
    }

    processImageHandler = () => {
        process.nextTick = setImmediate;
        readFile(this.state.pickedImage.uri, "base64")
            .then(base64String => app.models.predict(CLARIFAI_FOOD_MODEL, {base64: base64String}))
            .then((result) => {
                const concepts = result
                    && result.outputs[0]
                    && result.outputs[0].data
                    && result.outputs[0].data.concepts;
                const filteredResults = concepts
                    ? concepts.filter((concept) => concept.value > 0.2)
                    : [];
                return filteredResults;
            })
            .then((filteredResults) => {
                this.props.navigation.navigate('Ingredients', {conceptsList: filteredResults});
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const imgComponent = this.state.pickedImage ?
            (
                <View style={styles.imageContainer}>
                    <Image source={this.state.pickedImage} style={styles.imageStyle} />
                </View>
            ) : (
                <View style={styles.button}>
                    <Button title="Take a Photo" onPress={this.callCamera} />
                    <Text>or</Text>
                    <Button title="Upload an Image" onPress={this.callImageUpload} />
                </View>
            );
        const continueDisabled = !this.state.pickedImage;
        return (
            <View style={styles.container}>
            <Text style={styles.textStyle}>Provide your picture of ingredients </Text>
                {imgComponent}
                <View style={styles.button}>
                    <Button title="Reset Image" onPress={this.resetHandler} />
                    <Button
                        title='back to main page'
                        onPress={() => {
                            this.props.navigation.navigate('MainPage');
                        }}
                    />
                    <Button
                        title='Process Image'
                        disabled={continueDisabled}
                        onPress={this.processImageHandler}
                    />
                </View>
            </View>
          );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems:"center",
    },
    textStyle: {
        fontWeight:"bold",
        fontSize:10,
        textAlign:"center",
        marginTop:10,
    },
    imageContainer: {
        width: "70%",
        height: 280,
        marginTop:50,
    },
    button: {
      width: "80%",
      marginTop:20,
      justifyContent: "space-around"
    },  
    imageStyle: {
        width: "100%",
        height: "100%"
    }
  });