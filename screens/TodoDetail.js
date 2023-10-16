import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import TodoHeader from './TodoHeader';
import { fancytextstyles } from './TodoDesign';
import TodoErrorbox from './TodoErrorbox';


export default function TodoDetail({ route, navigation }) {

  const [todotitle, setTodotitle] = useState(route.params.todoitem.key);

  const [errormessage, setErrormessage] = useState("");

  function savetodo() {
    if(todotitle == "") {
      setErrormessage("Oh no, empty text");
    } else {
      navigation.navigate({
        name: "Todo",
        params: { todoname: todotitle, rownumb: route.params.rownumb },
        merge: true
      });
    }
  }

  return (
    <View>

      <Text>TODO DETAIL</Text>

      <Text style={fancytextstyles.niceheader}>ABC</Text>

      {errormessage != "" &&
        <TodoErrorbox errormessage={ errormessage } clickbox={() => {
          setErrormessage("");
        }} />
      }

      <TextInput value={todotitle} onChangeText={setTodotitle} />

      <Button title='Save' onPress={() => {
        savetodo();
      }} />
    </View>
  );
}