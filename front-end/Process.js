import {StyleSheet, Text, SafeAreaView, View,TouchableOpacity} from "react-native";
import {scaleFontSize} from "./Utilities";

let counter = 0
export class Process {
    constructor(name, pid, bytes, uptime, cpuUtilization, rulScore) {
        this.name = name;
        this.pid = pid
        if (bytes !== undefined && bytes !== null && !isNaN(bytes)) {
            this.bytes = Number(bytes)
        } else {
            this.bytes = 0
        }
        if (uptime !== undefined && uptime !== null && !isNaN(uptime)) {
            this.uptime = Number(uptime)
        } else {
            this.uptime = 0
        }
        if (cpuUtilization !== undefined && cpuUtilization !== null && !isNaN(cpuUtilization)) {
            this.cpuUtilization = Number(cpuUtilization)
        } else {
            this.cpuUtilization = 0
        }
        this.reasorceUtilizationLevel = rulScore
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

