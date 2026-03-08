import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {Process} from "./Process";
import DropDownPicker from "react-native-dropdown-picker";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ProcessDetails} from "./ProcessDetails";
import {scaleFontSize, width, formatBytes, formatUptime, getClosestProc} from "./Utilities";


const Stack = createNativeStackNavigator();

const secondaryLine = (process, currentSort) => {
    if (currentSort.includes("PID")) {
        return "PID: " + process.pid
    } else if (currentSort.includes("Uptime")) {
        return "Uptime: " + formatUptime(process.uptime)
    } else if (currentSort.includes("CPU")) {
        return "CPU Utilization: " + process.cpuUtilization + "%"
    } else if (currentSort.includes("Name")) {
        return "Uptime: " + formatUptime(process.uptime)
    } else if (currentSort.includes("Memory")) {
        return formatBytes(process.bytes)
    } else if (currentSort.includes("Score")) {
        return "Resource Utilization Score: " + process.reasorceUtilizationLevel
    }
}



function HomeScreen({navigation}) {
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [drownDownValue, setDrownDownValue] = useState("PID");
  const [processList, setProcessList] = useState([
        new Process("Proc1", 1, 4902934, 234, 20, 1),
        new Process("Proc2", 2, 49034, 23434, 30, 2),
        new Process("Proc3", 3, 4034, 23, 20, 5),
        new Process("Proc4", 4, 436, 232, 5, 2),
        new Process("Proc5", 5, 4336, 123, 2, 5),
        new Process("Proc6", 6, 4363546753546786867354, 4000, 4, 9,3),
        new Process("EpicProc", 7, 8343, 290, 10, 1,2),
        new Process("EpicProc2", 8, 2389, 3010, 2, 18.2),
  ])
    const [totalCPUUsage, setTotalCPUUsage] = useState(0.0);
    const [numProcesses, setNumProcesses] = useState(0);
    const [totalBytes, setTotalBytes] = useState(0);
    const [acceptingData, setAcceptingData] = useState(false);
    const [highUseProcs, setHighUseProcs] = useState(0);
    const [lowUseProcs, setLowUseProcs] = useState(0);


    const fetchProcess = async () => {
        try{
            const response = await fetch("http://149.125.108.134:8000/processes");
            const data = await response.json();
            console.log(data.message);
            const processArray = Object.entries(data.message).map(([pid, proc]) => new Process(
                proc.name,
                proc.pid,
                proc.memory_info,
                proc.uptime,
                proc.cpu_percent,
                proc.severity,
                ));
            setProcessList(processArray);
        }
        catch(error){
            console.log("Failed to receive processes", error);
        }
    }

    const toggleAcceptingData = () => {
        let toggled = !acceptingData
        setAcceptingData(toggled);
    }

    const ProcessDisplay = ({process, navigation, currentSort}) => (
        <SafeAreaView style={{alignItems: "center", flex: 1}}>
            <TouchableOpacity style={styles.processContainer} onPress={() => navigation.navigate("ProcessDetails", {
                process:  process,
                closeCpu: getClosestProc(processList, process, "cpuUtilization"),
                closePID: getClosestProc(processList, process, "pid"),
                closeUptime: getClosestProc(processList, process, "uptime"),
                closeMemory: getClosestProc(processList, process, "bytes"),
                allProcesses: processList,
            })}>
                <Text style={styles.processText}>{process.name}</Text>
                <Text style={styles.processText}>{secondaryLine(process, currentSort)}</Text>
            </TouchableOpacity>
            <View style={{height: '1%'}}></View>
        </SafeAreaView>
    );


    useEffect(() =>{
        fetchProcess();

        const interval = setInterval(() => {
            if (acceptingData) {
                fetchProcess();
                let cpuUsage = 0
                let processes = 0
                let totalBytes = 0
                let highRescource = 0
                let lowRescource = 0

                for (const process of processList) {
                    cpuUsage += process.cpuUtilization
                    processes++
                    totalBytes += process.bytes
                    if (process.reasorceUtilizationLevel >= 0.5) {
                        highRescource++
                    } else if (process.reasorceUtilizationLevel <= 0.2) {
                        lowRescource++
                    }
                }

                console.log("Recieved Succesfully")
                setHighUseProcs(highRescource)
                setLowUseProcs(lowRescource)
                setTotalBytes(totalBytes)
                setNumProcesses(processes)
                setTotalCPUUsage(cpuUsage)
            }
        }, 3000);

        return () => clearInterval(interval);

    }, [acceptingData])

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
        } else if (drownDownValue === "Process Name Descending") {
            new_list.sort((a, b) => b.name.localeCompare(a.name));
        } else if (drownDownValue === "Memory Ascending") {
            new_list.sort((a, b) => a.bytes - b.bytes);
        } else if (drownDownValue === "Memory Descending") {
            new_list.sort((a, b) => b.bytes - a.bytes);
        } else if (drownDownValue === "Resource Score Ascending") {
            new_list.sort((a, b) => (a.reasorceUtilizationLevel > b.reasorceUtilizationLevel) - (b.reasorceUtilizationLevel - a.reasorceUtilizationLevel));
        } else {
            new_list.sort((a, b) => (b.reasorceUtilizationLevel > a.reasorceUtilizationLevel) - (a.reasorceUtilizationLevel - b.reasorceUtilizationLevel));
        }

        setProcessList(new_list);
    }, [drownDownValue, dropDownOpen]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height: '5%'}}></View>
        <View style={{paddingLeft: width * .025, paddingRight: width * .025}}>
            <DropDownPicker
                placeholder={"Choose Method To Sort Processes"}
                searchPlaceholderTextColor={"teal"}
                textStyle={{color: 'teal'}}
                style={{}}
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
                    {label: "Memory Ascending", value: "Memory Ascending"},
                    {label: "Memory Descending", value: "Memory Descending"},
                    {label: "Resource Score Ascending", value: "Resource Score Ascending"},
                    {label: "Resource Score Descending", value: "Resource Score Descending"},
                ]}
                setOpen={setDropDownOpen}
                setValue={setDrownDownValue}
            />
        </View>
        <View style={{height: '1%'}}></View>
        <View style={{height: '.4%', backgroundColor: "darkgreen"}}></View>
        <View style={{height: '1%'}}></View>
      <FlatList
          data={processList}
          renderItem={({item}) => <ProcessDisplay process={item} navigation={navigation} currentSort={drownDownValue}/>}
          keyExtractor={process => String(process.uniqueId)}
          horizontal={false}
      />
        <View style={{height: '1%'}}></View>
        <View style={{height: '.4%', backgroundColor: "darkgreen"}}></View>
        <View style={{height: '1%'}}></View>
        <View style={{height: '30%'}}>
            <View style={styles.verticalStyle}>
                <View style={styles.horizontalStyle}>
                    <Text style={styles.infoText}>{"CPU Usage: " + totalCPUUsage + "%"}</Text>
                </View>
                <View style={styles.horizontalSpacing}/>
                <View style={styles.horizontalStyle}>
                    <Text style={styles.infoText}>{numProcesses + " Processes"}</Text>
                </View>
            </View>
            <View style={styles.verticalSpacing}/>
            <View style={styles.verticalStyle}>
                <View style={styles.horizontalStyle}>
                    <Text style={styles.infoText}>{formatBytes(totalBytes) + " For All Processes"}</Text>
                </View>
                <View style={styles.horizontalSpacing}/>
                <View style={styles.horizontalStyle}>
                    <Text style={styles.infoText}>{highUseProcs + " High Resource Use Processes"}</Text>
                </View>
            </View>
            <View style={styles.verticalSpacing}/>
            <View style={styles.verticalStyle}>
                <View style={styles.horizontalStyle}>
                    <Text style={styles.infoText}>{lowUseProcs + " Low Resource Use Processes"}</Text>
                </View>
                <View style={styles.horizontalSpacing}/>
                <TouchableOpacity style={[styles.horizontalStyle, {backgroundColor: (acceptingData) ? "darkgreen" : "darkred"}]} onPress={() => toggleAcceptingData()}>
                    <Text style={styles.infoText}>{((acceptingData) ? "" : "Not ") + "Accepting Process Info"}</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    backgroundColor: 'lightgrey',
    //alignItems: 'center',
    justifyContent: 'center',
    //width: '100%',
  },
    processContainer: {
        backgroundColor: 'teal',
        width: '95%',
        borderRadius: 5,
        marginBottom: 5,
        borderWidth: 2,

    },
    processText: {
        fontSize: scaleFontSize(12),
        color: "lightblue",
    },
    verticalStyle: {
      flexDirection: 'row',
        width: '95%',
        height: '31%',
        alignSelf: 'center',
    },
    verticalSpacing: {
      height: '2%'
    },
    horizontalStyle: {
      width: '49.5%',
        height: '100%',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'darkgreen',
        borderRadius: 5,
        borderWidth: 2,
    },
    horizontalSpacing: {
      width: '1%'
    },
    infoText: {
        fontSize: scaleFontSize(9),
        color: 'lightgreen',
        textAlign: 'center',
    }
});
