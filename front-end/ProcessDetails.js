import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatBytes, formatUptime, scaleFontSize} from "./Utilities";


export const ProcessDetails = ({route, navigation}) => {
    const {process} = route.params

    return (
    <SafeAreaView style={styles.container}>
        <View style={{height: '3%'}}></View>
        <Text style={styles.titleText}>Process Information</Text>

        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
        <View style={styles.verticalSpacing}></View>
        <View style={styles.mainProcessArea}>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Proc Name: " + process.name}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Process ID: " + process.pid}</Text>
                </View>
            </View>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Uptime: " + formatUptime(process.uptime)}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Size: " + formatBytes(process.bytes)}</Text>
                </View>
            </View>
            <View style={styles.mainProcessVert}>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Retrieved at " + process.timeStamp}</Text>
                </View>
                <View style={styles.mainProcessHorizontal}>
                    <Text style={styles.mainProcessText}>{"Resource Utilization Level: " + process.reasorceUtilizationLevel}</Text>
                </View>
            </View>
        </View>
        <View style={styles.verticalSpacing}></View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{backgroundColor: 'cyan', height: '5%', width: '95%', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2}}>
            <Text style={styles.bottomText}>Kill Process</Text>
        </TouchableOpacity>
        <View style={styles.verticalSpacing}></View>
        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
        <Text style={styles.titleText}>Similar Processes</Text>
        <View style={{height: '.4%', width: "100%", backgroundColor: "darkblue"}}></View>
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
        fontSize: scaleFontSize(9),
        textAlign: 'center',
        color: 'blue',
    },
    verticalSpacing: {
        height: '1%'
    },
})