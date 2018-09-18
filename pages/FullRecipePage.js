import React from 'react';
import { StyleSheet, WebView, Button, View } from 'react-native';

function FullRecipePage(props) {
    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <WebView
                    source={{uri: props.navigation.state.params.url}}
                />
                </View>
            <Button
                title='Back'
                onPress={() => {
                    props.navigation.goBack();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FullRecipePage;
