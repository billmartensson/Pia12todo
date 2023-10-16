import { useState } from 'react';
import { Text, View } from 'react-native';
import { fancytextstyles } from './TodoDesign';

export default function TodoHeader() {
  
  return (
    <View>
        <Text style={fancytextstyles.nicetext} >DETTA ÄR HEADER</Text>
    </View>
  );
}