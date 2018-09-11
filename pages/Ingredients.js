import React from 'react';
import {
    View,
    Button,
    ScrollView,
    Text,
} from 'react-native';

export default class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concepts: [],
        };
        this.makeConceptElements = this.makeConceptElements.bind(this);
    }
    render() {
        const conceptElements = this.makeConceptElements(this.props.navigation.state.params.conceptsList);
        return (
            <View>
                <Button
                    onPress={this.processImage}
                    title="Process Image"
                />
                <ScrollView>
                    <Text>This is a ScrollView</Text>
                    {conceptElements}
                </ScrollView>
            </View>
        );
    }

    makeConceptElements(concepts) {
        return concepts.map((concept) => {
            return (
                <Text>{`${concept.name} ${concept.value}`}</Text>
            );
        })
    }

}

