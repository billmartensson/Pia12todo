import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, TextInput } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function TodoRow(props) {

  return (
    <View style={rowstyles.todorow}>
      <Text style={{ flex: 1 }}>{props.todoinfo.key}</Text>
      <Button title={props.todoinfo.isdone ? "X" : "O"} onPress={() => {
        props.todoChangeDone();
      }} />

      <Button title='D' onPress={() => {
        props.todoDelete();
      }} />

    </View>
  );
}


const rowstyles = StyleSheet.create({
  todorow: {
    backgroundColor: '#cccccc',
    flexDirection: "row",
    height: 50,
    marginBottom: 30
  }
});


