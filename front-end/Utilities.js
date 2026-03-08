import {Dimensions} from 'react-native';
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const scaleFontSize = (fontSize) => (height / 500) * fontSize;

const byte_formats = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
export const formatBytes = (bytes) => {
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

export const formatUptime = (uptime) => {
    let hours = Math.floor(uptime / 3600)
    let minutes =  Math.floor(uptime / 60) - (60 * hours)
    let seconds = Math.floor(uptime % 60)

    let sec_str = String(seconds)
    if (minutes || hours) {
        if (sec_str.length === 1) {
            sec_str = "0" + sec_str
        }
    }

    let returnStr = ""
    if (hours >= 1) {
        returnStr += String(hours) + ":"
    }
    if (minutes >= 1) {
        returnStr += ((hours && String(minutes).length !== 2) ? ("0" + String(minutes)) : (String(minutes))) + ":"
    }
    returnStr += sec_str
    return returnStr
}