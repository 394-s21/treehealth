const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function JsonParser (rawData, columnName, distictColor, desc, units){
    // Limit on number of data points total in graph
    var dataLimit = 500;

    // Initialize array of data, loop counter, line color, and size of scatter plot point
    var dataArr = [];
    var counter = 0;
    var color = distictColor;
    var scattSize = 1;

    var prev = 0

    for (const [key, value] of Object.entries(rawData)) {
        // If dataLimit is passed, don't push any more data into graph
        if(counter > dataLimit) {
            break;
        }

        // fetch Date and Time from raw data
        let dateVal = value['Date']
        let timeVal = value['Time']

        if(!dateVal || !timeVal || /[a-z]/i.test(dateVal) || /[a-z]/i.test(timeVal)) {
            continue;
        }

        // convert to float if data exists
        if (value[columnName] != "") {
            var curr = parseFloat(value[columnName]);
        } else {
            var curr = undefined;
        }

        // Fetch individual parts of time string and reformat
        let year = getTimePortion(dateVal, "/", 2);
        let month = months[parseInt(getTimePortion(dateVal, "/", 1))];
        let day = getTimePortion(dateVal, "/", 0);
        let hour = timeVal;

        let monthStr = month + " " + year;
        let dayStr = month + " " + day + " " + hour;
        let hourStr = month + " " + day + " " + hour;

        // If data not present, color red on graph and increase size of scatter plot point so that it appears bigger
        if (curr === undefined) {
            curr = prev;
            color = 'red';
            scattSize = 3;
        }

        // Add data point to graph
        dataArr.push({
            time: hourStr + "|" + dayStr + "|" + monthStr + "|" + year,
            data: curr,
            size: scattSize,
            color: color,
            desc: desc,
            units: units
        });

        // Reset variables for next iteration
        color = distictColor;
        scattSize = 1;
        counter++;
        prev = curr
    }
    return dataArr;
}

function getTimePortion(time, key, num) {
    // Fetch portion of time String
    if(typeof time === 'string' || time instanceof String) {
        var dummy = time;
        for(var i = 0; i < num; i++) {
            var index = dummy.indexOf(key);
            dummy = dummy.substring(index + 1);
        }
        var index = dummy.indexOf(key);
        if(index == -1) return dummy;
        return dummy.substring(0, index);
    }
    return "error"
}
