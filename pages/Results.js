import React from 'react';
import {View, Button, Text, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native';
import {YUMMLY_APP_ID, YUMMLY_APP_KEY} from '../apiKeys';
import {connect} from 'react-redux';

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {recipes: {}};
        
        this.getRecipes = this.getRecipes.bind(this);
        this.makeElements = this.makeElements.bind(this);
    }

    componentWillMount() {
        const selectedIngredients = Object.values(this.props.ingredients).filter((ingredient) => ingredient.selected);
        /*
        const recipes = this.getRecipes(this.props.navigation.state.params.url)
            .then((recipesJson) => {
                // perform ingredient filter
                recipesJson.matches.forEach((recipe) => {
                    recipe.ingredients.some((recipeIngredient) => {
                        selectedIngredients.some((selectedIngredient) => {
                            if (recipeIngredient.indexOf(selectedIngredient.name) !== -1 || selectedIngredient.name.indexOf(recipeIngredient) !== -1) {
                                const newState = Object.assign({}, this.state.recipes);
                                newState[recipe.id] = recipe;
                                
                                this.setState({ recipes: newState });
                            }
                        });
                    });
                });
                return Promise.resolve();
            })
            .catch((error) => {
                console.log(error);
            });
            */
        //const query_url = this.props.navigation.state.params.url + `?q=${selectedIngredients[0].name}`;
        //const query_url = this.props.navigation.state.params.url + `?q=hamburger`;
        
        let base_url = `http://api.yummly.com/v1/api/recipes?q=`;
        let i;
        for (i = 0 ; i < selectedIngredients.length ; i+=1) {
            query_url = base_url + `+${selectedIngredients[i].name}`;
        
            this.getRecipes(query_url)
                .then((recipesJson) => {
                    console.log(`JSON: ${JSON.stringify(recipesJson)}`);
                    recipesJson.matches.forEach((recipe) => {
                        const newState = Object.assign({}, this.state.recipes);
                        newState[recipe.id] = recipe;
                        this.setState({ recipes: newState });
                    });
                    Object.values(this.state.recipes).forEach((recipe) => {
                        console.log(`RECIPE: ${recipe.recipeName}`);
                    });
                    return Promise.resolve();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    
    getRecipes(url) {
        console.log(`URL: ${url}`);
        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Yummly-App-ID': `${YUMMLY_APP_ID}`,
                'X-Yummly-App-Key': `${YUMMLY_APP_KEY}`,
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
        
        if (Object.keys(this.state.recipes).length > 0) {
            const elementList = this.makeElements();
            return (
                <View style={styles.container}>
                    <ScrollView>
                        {elementList}
                    </ScrollView>
                </View>
            );
        }
        
        this.makeElements();
        return (
            <Text>Loading</Text>
        );
    }

    makeElements() {
        return Object.entries(this.state.recipes).map((recipeArr) => {
            return (
                <TouchableOpacity
                    key={recipeArr[0]}
                    onPress={() => {
                        this.props.navigation.navigate('DetailsPage', { recipe: recipeArr[1] });
                    }}
                >
                    <View style={styles.itemContainer}>
                        <Image style={{width: 90, height: 90}} source={{uri: recipeArr[1].imageUrlsBySize[90] }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{recipeArr[1].recipeName}</Text>
                            <View style={styles.bottomTextContainer}>
                                <Text style={styles.text}>{`Duration: ${recipeArr[1].totalTimeInSeconds/60} minutes `}</Text>
                                <Text style={styles.text}>{`Rating: ${recipeArr[1].rating}`}</Text>
                            </View>
                        </View>
                    </View>
                    
                </TouchableOpacity>
            );
        });
        
    }
}

function mapStateToProps(state) {
    return {
        ingredients: state.ingredients,
        courses: state.courses,
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgb(235,28,34)',
    },
    scroll: {
        margin: 5,
    },
    textContainer: {
        padding: 10,
    },
    text: {
        color: 'white',
    },
    itemContainer: {
        flexDirection: 'row',
    },
    bottomTextContainer: {
        flexDirection: 'row',
    },
});

export default connect(mapStateToProps)(ResultsPage);
