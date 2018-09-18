import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './store/reducers/index';
import MainPage from './pages/Main';
import { createStackNavigator } from 'react-navigation';
import UploadPage from './pages/Upload';
import IngredientsPage from './pages/Ingredients';
import FilterPage from './pages/FilterPage';
import ResultsPage from './pages/Results';
import DetailsPage from './pages/DetailsPage';
import FullRecipePage from './pages/FullRecipePage';
import AboutPage from './pages/AboutPage';

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
    MainPage: {screen: MainPage},
    FullRecipePage: {screen: FullRecipePage},
    UploadPage: {screen: UploadPage},
    IngredientsPage: {screen: IngredientsPage},
    ResultsPage: {screen: ResultsPage},
    FilterPage: {screen: FilterPage},
    DetailsPage: {screen: DetailsPage},
    AboutPage: {screen: AboutPage},
},{
    navigationOptions: {
        header: null,
    }
});

const styles = StyleSheet.create({
});

export {store};
