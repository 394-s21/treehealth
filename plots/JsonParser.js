export default function JsonParser (rawData, columnName, distictColor){

    //var rawSFMData = require('../data/SFM2I102_sycamore.json');
    //var spruceData = require('../data/102_norwayspruce.json');

    var DataHourly = [];
    var DataDaily = [];
    var missing = [];
    var counter = 0;
    // TODO: get color from args
    var color = distictColor;
    var scattSize = 1;


    var prev = 0

    for (const [key, value] of Object.entries(rawData)) {

        if (value[columnName] != "") {
            var curr = parseFloat(value[columnName]);
        } else {
            var curr = undefined;
        }

        let dateVal = key.split(",")[0].replace(/\s+/g, '')
        let timeVal = key.split(",")[1].replace(/\s+/g, '')

        if (dateVal == "2/2/2021") {
            if (curr === undefined) {
                missing.push(counter);
                curr = prev;
                color = 'red';
                scattSize = 3;
            }
            DataHourly.push({
                time: timeVal.substring(0, timeVal.length-3),
                data: curr,
                size: scattSize,
                color: color
            })
            // TODO: get color from args
            color = distictColor;
            scattSize = 1;
            counter++;
        }

        if (timeVal == "0:00:00") {
            // TODO: Maybe add the color and scatterplot stuff to daily data?
            DataDaily.push({time: dateVal, data: curr})
        }

        prev = curr
    }
    return [DataHourly, DataDaily];
}
