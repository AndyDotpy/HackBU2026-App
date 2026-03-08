import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const byte_formats = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
const formatBytes = (bytes) => {
    let format_index = 0
    while (bytes >= 1024) {
        bytes /= 1024
        format_index++
    }
    if (format_index >= byte_formats.length) {
        return "Larger than a Yottabyte"
    }
    return String(Math.floor(bytes * 100) / 100) + " " + byte_formats[format_index]
}

const formatUptime = (uptime) => {
    let hours = Math.floor(uptime / 3600)
    let minutes =  Math.floor(uptime / 60) - (60 * hours)
    let seconds = Math.floor(uptime % 60)

    let returnStr = ""
    if (hours >= 1) {
        returnStr += String(hours) + ":"
    }
    if (minutes >= 1) {
        returnStr += String(minutes) + ":"
    }
    returnStr += String(seconds)
    return returnStr
}

export const ProcessDetails = ({route, navigation}) => {
    const {process} = route.params

    return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor: 'grey',}}>
            <Text>{process.name}</Text>
            <Text>{"Process ID: " + process.pid}</Text>
            <Text>{"Uptime: " + formatUptime(process.uptime)}</Text>
            <Text>{"Size: " + formatBytes(process.bytes)}</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        //width: '100%',
    },
})