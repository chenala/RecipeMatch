import React from 'react';
import {View, Button, Text, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native';
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
    }
    
    getRecipes(url) {
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
                        <View>
                            <Text>{recipeArr[1].recipeName}</Text>
                            <View style={styles.bottomTextContainer}>
                                <Text>{`Duration: ${recipeArr[1].totalTimeInSeconds/60} minutes`}</Text>
                                <Text>{`Rating: ${recipeArr[1].rating}`}</Text>
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
        flex: 1,
    },
    scroll: {
        margin: 5,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    bottomTextContainer: {
        flexDirection: 'row',
    },
});

export default connect(mapStateToProps)(ResultsPage);
