import {StyleSheet, Text, SafeAreaView, View,TouchableOpacity} from "react-native";
import {scaleFontSize} from "./Utilities";

let counter = 0
export class Process {
    constructor(name, pid, bytes, uptime, cpuUtilization) {
        this.name = name;
        this.pid = pid
        this.bytes = bytes
        this.uptime = uptime
        this.cpuUtilization = cpuUtilization
        this.uniqueId = counter++
    }
}


const styles = StyleSheet.create({
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

