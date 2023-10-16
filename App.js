import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TodoDetail from './screens/TodoDetail';
import TodoScreen from './screens/TodoScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="TodoDetail" component={TodoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}