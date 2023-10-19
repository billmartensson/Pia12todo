import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, Switch, TextInput, TouchableOpacity } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import TodoRow from './TodoRow';
import TodoHeader from './TodoHeader';
import TodoErrorbox from './TodoErrorbox';
import { fancytextstyles } from './TodoDesign';
import { doFunStuff, sortByDone } from './TodoHelper';

export default function TodoScreen({ navigation, route }) {

  const addtextref = useRef(null);

  const [addtodo, setAddtodo] = useState("");

  const [todoitems, setTodoitems] = useState([{ "key": "Abc", isdone: false }, { "key": "B", isdone: true }]);

  const [errormessage, setErrormessage] = useState("");

  const [listtype, setListtype] = useState("all");

  const [letsgo, setLetsgo] = useState(false);

  useEffect(() => {
    if (route.params?.todoname) {
      console.log("HURRA SPARA");
      console.log(route.params.todoname);

      const newlist = [...todoitems];
      newlist[route.params.rownumb].key = route.params.todoname;
      setTodoitems(newlist);
    }
  }, [route.params?.todoname]);

  

  function addToTheList() {
    if (addtodo != "") {
      const newtodo = todoitems.concat({ "key": addtodo });

      newtodo.sort(sortByDone);

      setTodoitems(newtodo);
      setErrormessage("");
      setAddtodo("");
    } else {
      setErrormessage("You need to enter something!");

      setTimeout(() => {
        setErrormessage("");
      }, 3000);
    }
  }

  function changeDone(rownumber) {
    const newlist = [...todoitems];

    if (newlist[rownumber].isdone == true) {
      newlist[rownumber].isdone = false;
    } else {
      newlist[rownumber].isdone = true;
    }

    newlist.sort(sortByDone);

    setTodoitems(newlist);
  }

  function deleteTodo(rownumber) {
    const newlistStart = [...todoitems].slice(0, rownumber);
    const newlistEnd = [...todoitems].slice(rownumber + 1);

    const newlist = newlistStart.concat(newlistEnd);

    setTodoitems(newlist);
  }

  function filtertodo(todo) {
    if(listtype == "all") {
      return true;
    }

    if(listtype == "done") {
      return todo.isdone == true;
    }

    if(listtype == "todo") {
      return todo.isdone != true;
    }

  }

  return (
    <View style={styles.container}>

      <TodoHeader />

      {errormessage != "" &&
        <TodoErrorbox errormessage={ errormessage } clickbox={() => {
          setErrormessage("");
        }} />
      }

      <View style={styles.addTodoContainer}>
        <TextInput 
        ref={addtextref}
        style={styles.addTextinput} 
        value={addtodo} 
        onChangeText={setAddtodo} 
        onChange={() => { console.log("SKRIVA TEXT"); }}
        onSubmitEditing={() => { addToTheList();   }}
        placeholder=''
        secureTextEntry={false}
        inputMode='text' />

        <Button style={styles.addButton} title='Add' color={"#000000"} onPress={() => {
          addToTheList();
        }} />
      </View>
      
      <View style={styles.filterButtons}>
        
        <TouchableOpacity onPress={() => {
          setListtype("all");
        }} style={ listtype == "all" ? styles.filterSelectedButton : styles.filterNotSelectedButton}>
            <Text style={{ textAlign: "center" }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setListtype("todo");
        }} style={ listtype == "todo" ? styles.filterSelectedButton : styles.filterNotSelectedButton}>
            <Text style={{ textAlign: "center" }}>Todo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          setListtype("done");
        }} style={ listtype == "done" ? styles.filterSelectedButton : styles.filterNotSelectedButton}>
            <Text style={{ textAlign: "center" }}>Done</Text>
        </TouchableOpacity>
        
      </View>

      <FlatList style={styles.todoList}
        data={todoitems.filter(filtertodo)}
        renderItem={({ item, index }) =>

          <TouchableOpacity onPress={() => {
            //changeDone(index);
            doFunStuff();
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


      <Switch value={letsgo} onValueChange={setLetsgo} />

      <Text style={fancytextstyles.nicetext} >Annan text</Text>

      { Platform.OS === "ios" &&
        <Text>DETTA ÄR IOS</Text>      
      }
      { Platform.OS === "android" &&
        <Text>DETTA ÄR ANDROID</Text>      
      }

      <View style={{ backgroundColor: "#00ff00", width: 100, height: 100 }} >
        <View style={{ position: "absolute", top: 0, backgroundColor: "#000000", height: "100%", width: "100%", opacity: 0.5 }} >
          <Text style={{ color: "#ffffff" }}>LOADING...</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>

      

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
  },
  addTodoContainer: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    width: "100%",
    padding: 20,
    borderTopWidth: 1
  },
  todoList: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 30
  },
  addTextinput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 25
  }, 
  addButton: {
    
  },
  filterButtons: {
    flexDirection: "row",
    backgroundColor: "#cccccc",
    width: "100%",
    height: 40
  },
  filterSelectedButton: {
    backgroundColor: "#ffffff",
    width: "33%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center"
  },
  filterNotSelectedButton: {
    backgroundColor: "#999999",
    width: "33%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center"
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