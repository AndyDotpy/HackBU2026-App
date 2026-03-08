import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatBytes, formatUptime, scaleFontSize, getClosestProc} from "./Utilities";
import {useState} from "react";


export const ProcessDetails = ({route, navigation}) => {
    const {process, closeCpu, closePID, closeUptime, closeMemory, allProcesses} = route.params
    const [currProcess, setCurrProcess] = useState(process);
    const [currCloseCpu, setCurrCloseCpu] = useState(closeCpu);
    const [currCloseUptime, setCurrCloseUptime] = useState(closeUptime);
    const [currCloseMemory, setCurrCloseMemory] = useState(closeMemory);
    const [currClosePID, setCurrClosePID] = useState(closePID);

    const [jumpIndex, setJumpIndex] = useState(0);
    const [jumpProc, setJumpProc] = useState(closeCpu);

    const jump = () => {
        let nextCloseCpu = getClosestProc(allProcesses, jumpProc, "cpuUtilization")
        let nextCloseUpTime = getClosestProc(allProcesses, jumpProc, "uptime")
        let nextCloseMemory = getClosestProc(allProcesses, jumpProc, "bytes")
        let nextClosePID = getClosestProc(allProcesses, jumpProc, "pid")

        setCurrProcess(jumpProc)
        setJumpIndex(0)
        setJumpProc(nextCloseCpu)
        setCurrCloseCpu(nextCloseCpu)
        setCurrCloseUptime(nextCloseUpTime)
        setCurrCloseMemory(nextCloseMemory)
        setCurrClosePID(nextClosePID)
    }

    const killProcess = async (pid) => {
        try {
            const response = await fetch(`http://172.20.10.3:8000/kill/${pid}`, {
                method: "POST"
            });

            const data = await response.json();
            console.log(data);
        }
        catch(error){
            console.log("Failed to kill process", error);
        }
    };

    return (
    <SafeAreaView style={styles.container}>
        <View style={{height: '3%'}}></View>
        <Text style={styles.titleText}>Process Information</Text>

        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.mainProcessArea}>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Proc Name: " + currProcess.name}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Process ID: " + currProcess.pid}</Text>
                </View>
            </View>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Uptime: " + formatUptime(currProcess.uptime)}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Size: " + formatBytes(currProcess.bytes)}</Text>
                </View>
            </View>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"CPU Utilization: " + currProcess.cpuUtilization + "%"}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Resource Utilization Level: " + currProcess.reasorceUtilizationLevel}</Text>
                </View>
            </View>
        </View>
        <View style={styles.verticalSpacing}></View>
        <TouchableOpacity
            onPress={() => {killProcess(currProcess.pid); navigation.goBack()}}
            style={{backgroundColor: 'cyan', height: '5%', width: '95%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2}}>
            <Text style={styles.bottomText}>Kill Process</Text>
        </TouchableOpacity>
        <View style={styles.verticalSpacing}></View>
        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
        <Text style={styles.titleText}>Similar Processes</Text>
        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.jumpRow}>
            <View style={styles.jumpLeftElement}>
                <Text style={styles.mainProcessText}>{currCloseCpu.name + " with " + currCloseCpu.cpuUtilization + "% CPU Utilization"}</Text>
            </View>
            <View style={styles.jumpCenterSpace}></View>
            <TouchableOpacity style={[styles.jumpRightElement,
                {backgroundColor: (jumpIndex === 0) ? "darkgrey" : "lightblue"}]}
                onPress={() => {setJumpIndex(0); setJumpProc(currCloseCpu)}}>
                <Text style={styles.mainProcessText}>{(jumpIndex === 0) ? "Selected" : "Select"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.jumpRow}>
            <View style={styles.jumpLeftElement}>
                <Text style={styles.mainProcessText}>{currClosePID.name + " with PID of " + currClosePID.pid}</Text>
            </View>
            <View style={styles.jumpCenterSpace}></View>
            <TouchableOpacity style={[styles.jumpRightElement,
                {backgroundColor: (jumpIndex === 1) ? "darkgrey" : "lightblue"}]}
                              onPress={() => {setJumpIndex(1); setJumpProc(currClosePID)}}>
                <Text style={styles.mainProcessText}>{(jumpIndex === 1) ? "Selected" : "Select"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.jumpRow}>
            <View style={styles.jumpLeftElement}>
                <Text style={styles.mainProcessText}>{currCloseUptime.name + " with uptime of " + formatUptime(currCloseUptime.uptime)}</Text>
            </View>
            <View style={styles.jumpCenterSpace}></View>
            <TouchableOpacity style={[styles.jumpRightElement,
                {backgroundColor: (jumpIndex === 2) ? "darkgrey" : "lightblue"}]}
                              onPress={() => {setJumpIndex(2); setJumpProc(currCloseUptime)}}>
                <Text style={styles.mainProcessText}>{(jumpIndex === 2) ? "Selected" : "Select"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.jumpRow}>
            <View style={styles.jumpLeftElement}>
                <Text style={styles.mainProcessText}>{currCloseMemory.name + " with storage taken of " + formatBytes(currCloseMemory.bytes)}</Text>
            </View>
            <View style={styles.jumpCenterSpace}></View>
            <TouchableOpacity style={[styles.jumpRightElement,
                {backgroundColor: (jumpIndex === 3) ? "darkgrey" : "lightblue"}]}
                              onPress={() => {setJumpIndex(3); setJumpProc(currCloseMemory)}}>
                <Text style={styles.mainProcessText}>{(jumpIndex === 3) ? "Selected" : "Select"}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.verticalSpacing}></View>
        <TouchableOpacity
            onPress={() => jump()}
            style={{backgroundColor: 'darkgray', height: '5%', width: '95%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2}}>
            <Text style={styles.bottomText}>Jump To Selected</Text>
        </TouchableOpacity>
        <View style={styles.verticalSpacing}></View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{backgroundColor: 'grey', height: '5%', width: '95%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2}}>
            <Text style={styles.bottomText}>Back To Processes</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    bottomText: {
        fontSize: scaleFontSize(10),
        color: 'black'
    },
    titleText: {
        fontSize: scaleFontSize(20),
        color: 'cyan',
        alignSelf: 'center',
    },
    mainProcessArea: {
        height: '30%',
        width: '95%',
        borderRadius: 5,
        borderWidth: 2,
    },
    mainProcessVert: {
        flexDirection: 'row',
        width: '100%',
        height: '33.33333333333%',
        alignSelf: 'center',
    },
    mainProcessHorizontal: {
        width: '50%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
    },
    mainProcessText: {
        fontSize: scaleFontSize(10),
        textAlign: 'center',
        color: 'blue',
    },
    verticalSpacing: {
        height: '1%'
    },
    jumpRow: {
        flexDirection: 'row',
        width: '95%',
        height: '7%'
    },
    jumpLeftElement: {
        width: '71%',
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        justifyContent: 'center',
    },
    jumpCenterSpace: {
        width: '1%',
    },
    jumpRightElement: {
        width: '28%',
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: 'lightblue',
        textAlign: 'center',
        justifyContent: 'center',
    },
})