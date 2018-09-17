import React from 'react';
import {
    View,
    Button,
    ScrollView,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleIngredient } from '../store/actions/actionCreators';
import { SELECTED_COLOR, UNSELECTED_COLOR } from '../constants';

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concepts: [],
        };
        this.makeConceptElements = this.makeConceptElements.bind(this);
    }
    render() {
        const conceptElements = this.makeConceptElements(this.props.navigation.state.params.conceptsList);
        const continueDisabled = conceptElements.numOfSelections <= 0;
        return (
            <View>
                <Text>Select what to include in the recipe</Text>
                <Button
                    title="Proceed to match recipes"
                    onPress={() => {
                        this.props.navigation.navigate('ResultsPage');
                    }}
                    disabled={continueDisabled}
                />
                <Button
                    title="Back"
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
                <ScrollView>
                    <Text>This is a ScrollView</Text>
                    {conceptElements.buttonList}
                </ScrollView>
                
            </View>
        );
    }

    /**
     * Given a list of concepts, return the list of buttons to display and how many ingredients are selected.
     * @param {List} concepts a list of objects that represents ingredients
     * Each ingredient object: {id, name, value}. Value is the probability of the ingredient found in the
     * image.
     * @returns {Object} {list of buttons to display, the number of ingredients currently selected}
     */
    makeConceptElements(concepts) {
        let numOfSelections = 0;
        const buttonList = concepts.map((concept) => {
            const color = this.props.ingredients[concept.id].selected ? SELECTED_COLOR : UNSELECTED_COLOR;
            
            const increment = this.props.ingredients[concept.id].selected ? 1 : 0;
            numOfSelections += increment;

            return (
                <Button
                    key={concept.id} title={`${concept.name} ${concept.value}`}
                    color={color}
                    onPress={() => {
                        this.props.toggleIngredient(Object.assign({}, concept));
                    }}
                />
            );
        });
        return { buttonList, numOfSelections };
    }

}

function mapStateToProps(state) {
    return {
        ingredients: state.ingredients,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleIngredient: toggleIngredient }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
