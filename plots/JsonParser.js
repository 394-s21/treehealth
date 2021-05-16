export default function JsonParser (fileName, columnName){

    //var rawSFMData = require('../data/SFM2I102_sycamore.json');
    //var spruceData = require('../data/102_norwayspruce.json');

    var rawData = require('../data/' + fileName);

    var DataHourly = []
    var DataDaily = []

    var prev = 0

    for (const [key, value] of Object.entries(rawData)) {

        if (value[columnName] != "") {
            var curr = parseFloat(value[columnName])
        } else {
            var curr = prev
        }

        let dateVal = key.split(",")[0].replace(/\s+/g, '')
        let timeVal = key.split(",")[1].replace(/\s+/g, '')

        if (dateVal == "2/2/2021") {
            DataHourly.push({time: timeVal.substring(1, timeVal.length-3), data: curr})
        }

        if (timeVal == "0:00:00") {
            DataDaily.push({time: dateVal, data: curr})
        }

        prev = curr
    }
    return [DataHourly, DataDaily];
}
