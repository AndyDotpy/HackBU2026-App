//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function App() {

  console.log('Hello World!');

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.42:8000/hello")
        .then(res => res.json())
        .then(data =>
          console.log("Here is what backend says: " + data.message)
        )
        .catch(err => console.error(err));
  }, []);

  return NULL;
  /*return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );*/
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/