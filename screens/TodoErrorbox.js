import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TodoErrorbox(props) {

    const [errormessage, setErrormessage] = useState(props.errormessage);

    return (

        <TouchableOpacity onPress={() => {
            props.clickbox();
        }}>
            <View style={styles.errorbox}>
                <Text style={styles.errorText}>{errormessage}</Text>
            </View>
        </TouchableOpacity>            

 




    );
}


const styles = StyleSheet.create({
    errorbox: {
        backgroundColor: "#ff0000",
        width: "70%",
        height: 40
    },
    errorText: {
        color: "#ffffff",
    }
});