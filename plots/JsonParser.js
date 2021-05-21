export default function JsonParser (rawData, columnName, distictColor, desc, units){

    //var rawSFMData = require('../data/SFM2I102_sycamore.json');
    //var spruceData = require('../data/102_norwayspruce.json');

    var DataHourly = [];
    var DataDaily = [];
    var missingHourly = [];
    var missingDaily = [];
    var counter = 0;
    var color = distictColor;
    var scattSize = 1;


    var prev = 0

    for (const [key, value] of Object.entries(rawData)) {

        if (value[columnName] != "") {
            var curr = parseFloat(value[columnName]);
        } else {
            var curr = undefined;
        }

        // let dateVal = key.split(",")[0].replace(/\s+/g, '')
        // let timeVal = key.split(",")[1].replace(/\s+/g, '')
        let dateVal = value['Date']
        let timeVal = value['Time']

        // TODO: modify parser to insert 0s to match dd/mm/yyyy format
        // TODO: do the same thing with time too probably
        if (dateVal == "2/2/2021" || dateVal == "02/02/2018") {
            if (curr === undefined) {
                missingHourly.push(counter);
                curr = prev;
                color = 'red';
                scattSize = 3;
            }
            DataHourly.push({
                time: timeVal,
                data: curr,
                size: scattSize,
                color: color,
                desc: desc,
                units: units
            })
            color = distictColor;
            scattSize = 1;
            counter++;
        }

        if (timeVal == "0:00" || timeVal == "00:00") {
            if (curr === undefined) {
                missingDaily.push(counter);
                curr = prev;
                color = 'red';
                scattSize = 3;
            }
            DataDaily.push({
                time: dateVal,
                data: curr,
                size: scattSize,
                color: color,
                desc: desc,
                units: units
            })
            color = distictColor;
            scattSize = 1;
        }

        prev = curr
    }
    return [DataHourly, DataDaily];
}
