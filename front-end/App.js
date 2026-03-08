import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {Process} from "./Process";
import DropDownPicker from "react-native-dropdown-picker";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProcessDetails} from "./ProcessDetails";
import {scaleFontSize} from "./Utilities";


const Stack = createNativeStackNavigator();


const ProcessDisplay = ({process, navigation}) => (
    <SafeAreaView style={{alignItems: "center", flex: 1}}>
        <TouchableOpacity style={styles.processContainer} onPress={() => navigation.navigate("ProcessDetails", {process: process})}>
            <Text style={styles.processText}>{process.name}</Text>
            <Text style={styles.processText}>{"PID: " + process.pid}</Text>
        </TouchableOpacity>
        <View style={{height: '1%'}}></View>
    </SafeAreaView>
);


function HomeScreen({navigation}) {
  const [processList, setProcessList] = useState([
      new Process("Proc1", 1, 4902934, 234, 20),
      new Process("Proc2", 2, 49034, 23434, 30),
      new Process("Proc3", 3, 4034, 23, 20),
      new Process("Proc4", 4, 436, 232, 5),
      new Process("Proc5", 5, 4336, 123, 2),
      new Process("Proc6", 6, 4363546753546786867354, 4000, 4),
  ])

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [drownDownValue, setDrownDownValue] = useState(null);



    useEffect(() => {
        let new_list = [...processList];

        if (drownDownValue === "PID Ascending") {
            new_list.sort((a, b) => a.pid - b.pid)
        } else if (drownDownValue === "PID Descending") {
            new_list.sort((a, b) => b.pid - a.pid);
        } else if (drownDownValue === "Uptime Ascending") {
            new_list.sort((a, b) => a.uptime - b.uptime);
        } else if (drownDownValue === "Uptime Descending") {
            new_list.sort((a, b) => b.uptime - a.uptime);
        } else if (drownDownValue === "CPU Utilization Ascending") {
            new_list.sort((a, b) => a.cpuUtilization - b.cpuUtilization);
        } else if (drownDownValue === "CPU Utilization Descending") {
            new_list.sort((a, b) => b.cpuUtilization - a.cpuUtilization);
        } else if (drownDownValue === "Process Name Ascending") {
            new_list.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            new_list.sort((a, b) => b.name.localeCompare(a.name));
        }

        setProcessList(new_list);
    }, [drownDownValue, dropDownOpen]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height: '5%'}}></View>
        <View style={{alignItems: "center"}}>
            <DropDownPicker
                placeholder={"Choose Method To Sort Processes"}
                style={{width: '90%'}}
                open={dropDownOpen}
                value={drownDownValue}
                items={[
                    {label: "PID Ascending", value: "PID Ascending"},
                    {label: "PID Descending", value: "PID Descending"},
                    {label: "Uptime Ascending", value: "Uptime Ascending"},
                    {label: "Uptime Descending", value: "Uptime Descending"},
                    {label: "Process Name Ascending", value: "Process Name Ascending"},
                    {label: "Process Name Descending", value: "Process Name Descending"},
                    {label: "CPU Utilization Ascending", value: "CPU Utilization Ascending"},
                    {label: "CPU Utilization Descending", value: "CPU Utilization Descending"},
                ]}
                setOpen={setDropDownOpen}
                setValue={setDrownDownValue}
            />
        </View>
        <View style={{height: '1%'}}></View>
        <View style={{height: '.4%', backgroundColor: "darkblue"}}></View>
        <View style={{height: '1%'}}></View>
      <FlatList
          data={processList}
          renderItem={({item}) => <ProcessDisplay process={item} navigation={navigation}/>}
          keyExtractor={process => String(process.uniqueId)}
          horizontal={false}
      />
      <View style={{height: '2%'}}></View>
    </SafeAreaView>
  );
}


export default function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="ProcessDetails" component={ProcessDetails}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    //width: '100%',
  },
    processContainer: {
        //flex: 1,
        backgroundColor: 'teal',
        //alignItems: 'center',
        //justifyContent: 'center',
        width: '90%',
        borderRadius: 5,
        marginBottom: 5,
    },
    processText: {
        fontSize: scaleFontSize(12),
        color: "black",
    }
});
