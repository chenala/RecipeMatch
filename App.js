import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MainPage from './pages/Main';
import { createStackNavigator } from 'react-navigation';
import UploadPage from './pages/Upload';
import IngredientsPage from './pages/Ingredients';
import ResultsPage from './pages/Results';

export default class App extends Component {
    render() {
        return (
            <ScreenNavigation />
        );
    }
}

const ScreenNavigation = createStackNavigator({
    UploadPage: {screen: UploadPage},
    Ingredients: {screen: IngredientsPage},
    ResultsPage: {screen: ResultsPage},
    MainPage: {screen: MainPage},
});

const styles = StyleSheet.create({
});
