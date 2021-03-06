import React from 'react';
import {View, Button, Text, Image, StyleSheet} from 'react-native';
import { YUMMLY_APP_ID, YUMMLY_APP_KEY } from '../apiKeys';
import { YUMMLY_API_RECIPE_ID_URL } from '../constants';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getRecipeDetails = this.getRecipeDetails.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
    }

    componentWillMount() {
        const url = this.buildUrl();
        
        this.getRecipeDetails(url)
            .then((recipeDetails) => {
                this.setState({recipe: recipeDetails});
            })
            .catch((err) => {
                console.log(err);
            });   
    }

    buildUrl() {
        const {recipe} = this.props.navigation.state.params;
        const url = `${YUMMLY_API_RECIPE_ID_URL}/${recipe.id}?_app_id=${YUMMLY_APP_ID}&_app_key=${YUMMLY_APP_KEY}`;
        return url;
    }

    getRecipeDetails(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }
    
    render() {
        const {recipe} = this.props.navigation.state.params;
        const returnValue = this.state.recipe ? (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.navigation.state.params.recipe.recipeName}</Text>
                <Image style={{width: 90, height: 90}} source={{uri: recipe.imageUrlsBySize[90] }} />
                <Text style={styles.text}>{`Source: ${recipe.sourceDisplayName}`}</Text>
                <Text style={styles.text}>{`Ingredients: ${recipe.ingredients}`}</Text>
                <Text style={styles.text}>{`Duration: ${recipe.totalTimeInSeconds/60}`}</Text>
                <Text style={styles.text}>{`Rating: ${recipe.rating}`}</Text>
                <Text style={styles.text}>{`Course: ${recipe.attributes.course}`}</Text>
                <Button
                    title='See Full Recipe'
                    onPress={() => {
                        this.props.navigation.navigate('FullRecipePage', { url: this.state.recipe.source.sourceRecipeUrl });
                    }}
                />
                <Button
                    title='Back'
                    onPress={() => {this.props.navigation.goBack();}}
                />
            </View>
        ) : (
            <View>
                <Text>Loading</Text>
            </View>
        );
        return returnValue;
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
        fontSize: 20,
    },
    text: {
        color: 'white',
        padding: 10,
    },
});

export default DetailsPage;
