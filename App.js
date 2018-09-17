import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './store/reducers/index';
import MainPage from './pages/Main';
import { createStackNavigator } from 'react-navigation';
import UploadPage from './pages/Upload';
import IngredientsPage from './pages/Ingredients';
import ResultsPage from './pages/Results';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ScreenNavigation />
            </Provider>
        );
    }
}

const store = createStore(reducers);

const ScreenNavigation = createStackNavigator({
    UploadPage: {screen: UploadPage},
    IngredientsPage: {screen: IngredientsPage},
    ResultsPage: {screen: ResultsPage},
    MainPage: {screen: MainPage},
});

const styles = StyleSheet.create({
});
