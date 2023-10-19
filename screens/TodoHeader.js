import { useState } from 'react';
import { Text, View } from 'react-native';
import { fancytextstyles } from './TodoDesign';

export default function TodoHeader() {
  
  return (
    <View style={{ height: 50, width: "100%", backgroundColor: "#cccccc" }}>
        <Text style={fancytextstyles.nicetext} >DETTA ÄR HEADER</Text>
    </View>
  );
}