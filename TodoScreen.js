import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import TodoRow from './TodoRow';

export default function TodoScreen({ navigation, route }) {

  const [addtodo, setAddtodo] = useState("");

  const [todoitems, setTodoitems] = useState([ {"key": "Abc", isdone: false}, {"key": "B", isdone: true} ]);

  const [errormessage, setErrormessage] = useState("");

  useEffect(() => {
    if(route.params?.todoname) {
        console.log("HURRA SPARA");
        console.log(route.params.todoname);

        const newlist = [...todoitems];
        newlist[route.params.rownumb].key = route.params.todoname;
        setTodoitems(newlist);
    }
  }, [route.params?.todoname]);

  function compare( a, b ) {
    if ( b.isdone  ){
      return -1;
    }
    if (  a.isdone ){
      return 1;
    }
    return 0;
  }

  function addToTheList() {
    if(addtodo != "") {
      const newtodo = todoitems.concat({"key": addtodo});

      newtodo.sort(compare);

      setTodoitems(newtodo);
      setErrormessage("");
    } else {
      setErrormessage("You need to enter something!");
    }
  }


  


  function changeDone(rownumber) {
    const newlist = [...todoitems];
    
    
    if(newlist[rownumber].isdone == true) {
      newlist[rownumber].isdone = false;
    } else {
      newlist[rownumber].isdone = true;
    }
    
    newlist.sort(compare);

    setTodoitems(newlist);
  }

  function deleteTodo(rownumber) {
    
  }


  return (
    <View style={styles.container}>
      <Text>TODO</Text>

      {errormessage != "" &&
        <Text>{errormessage}</Text>
      }

      <TextInput value={addtodo} onChangeText={setAddtodo} placeholder='Add todo' />
      
      <Button title='Add' onPress={() => {
        addToTheList();
      }} />

      <FlatList 
        data={todoitems} 
        renderItem={({item, index}) => 

          <TouchableOpacity onPress={() => {
            //changeDone(index);
            navigation.push("TodoDetail", { todoitem: item, rownumb: index });
          }}>
            <TodoRow 
                todoinfo={item} 
                todoChangeDone={() => { 
                    console.log("BYTA KLAR " + index); 
                    changeDone(index);
                }} 
                todoDelete={() => {
                    deleteTodo(index);
                }} />
          </TouchableOpacity>


        } 
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  finbild: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#ff0000"
  }
});






/*

  const [mynumber, setMynumber] = useState(0);


<Image style={styles.finbild} source={require('./bilder/frog.jpg')} />

<Text>{mynumber}</Text>

<Button title='Plus' onPress={() => {
  setMynumber(mynumber + 1);
}} />

<Text>{ mynumber < 10 ? "Liten siffra" : "Stor siffra" }</Text>

{mynumber > 5 && 
  <View>
    <Text>Mer än fem</Text>
    <Text>mer text</Text>
  </View>
}


*/