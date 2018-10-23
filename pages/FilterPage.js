import React from 'react';
import { StyleSheet, Button, View, Text, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCourse, addCourse } from '../store/actions/actionCreators';
import { SELECTED_COLOR, UNSELECTED_COLOR, COURSES } from '../constants';
import { store } from '../App';
import { YUMMLY_APP_ID, YUMMLY_APP_KEY } from '../apiKeys';
import { YUMMLY_API_RECIPE_URL } from '../constants';

class FilterPage extends React.Component {
    constructor(props) {
        super(props);
        this.makeElements = this.makeElements.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
    }

    componentWillMount() {
        COURSES.forEach((courseName) => {
            this.props.addCourse(courseName);
        });
    }

    buildUrl() {
        let url = `${YUMMLY_API_RECIPE_URL}?_app_id=${YUMMLY_APP_ID}&_app_key=${YUMMLY_APP_KEY}`;
        Object.entries(this.props.courses).forEach((courseEntry) => {
            url = courseEntry[1].selected ? (
                url + '&allowedCourse[]=course^course-' + courseEntry[0]
            ) : url;
        });
        url = url + '&requirePictures=true';
        return url;
    }

    render() {
        if (this.props.courses && Object.keys(this.props.courses).length > 0) {
        const conceptElements = this.makeElements(COURSES);
        const continueDisabled = conceptElements.numOfSelections <= 0;
            return (
                <View style={styles.container}>
                    <Button
                        title="Proceed to match recipes"
                        onPress={() => {
                            const url = this.buildUrl();
                            this.props.navigation.navigate('ResultsPage', { url });
                        }}
                        disabled={continueDisabled}
                    />
                    <Button
                        title="Back"
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    />
                    <ScrollView style={styles.scroll}>
                        <Button
                            title='Select All'
                            onPress={() => {
                                this.selectAll(COURSES);
                            }}
                        />
                        {conceptElements.buttonList}
                    </ScrollView>
                    
                </View>
            );
        }
        
        // Display this until Redux Store has finished inserting courses
        return(<Text>Loading</Text>);
    }

    selectAll(courses) {
        courses.forEach((courseName) => {
            if (!this.props.courses[courseName].selected) {
                this.props.toggleCourse(courseName);
            }
        });
    }

    makeElements(courseList) {
        let numOfSelections = 0;
        const buttonList = courseList.map((courseName) => {
            const color = this.props.courses[courseName].selected ? SELECTED_COLOR : UNSELECTED_COLOR;
            
            const increment = this.props.courses[courseName].selected ? 1 : 0;
            numOfSelections += increment;

            return (
                <Button
                    key={courseName} title={courseName}
                    color={color}
                    onPress={() => {
                        this.props.toggleCourse(courseName);
                    }}
                />
            );
        });

        return { buttonList, numOfSelections };
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleCourse: toggleCourse, addCourse: addCourse }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage);

const styles = StyleSheet.create({
    scroll: {
        margin: 10,
    },
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'rgb(235,28,34)',
    },
});
