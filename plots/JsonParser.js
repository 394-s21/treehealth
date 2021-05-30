const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function JsonParser (rawData, columnName, distictColor, desc, units){

    var dataLimit = 500;

    var dataArr = [];
    var counter = 0;
    var color = distictColor;
    var scattSize = 1;

    var prev = 0

    for (const [key, value] of Object.entries(rawData)) {
        if(counter > dataLimit) {
            break;
        }
        let dateVal = value['Date']
        let timeVal = value['Time']

        if(!dateVal || !timeVal || /[a-z]/i.test(dateVal) || /[a-z]/i.test(timeVal)) {
            continue;
        }

        if (value[columnName] != "") {
            var curr = parseFloat(value[columnName]);
        } else {
            var curr = undefined;
        }

        let year = getTimePortion(dateVal, "/", 2);
        let month = months[parseInt(getTimePortion(dateVal, "/", 1))];
        let day = getTimePortion(dateVal, "/", 0);
        let hour = timeVal;

        let monthStr = month + " " + year;
        let dayStr = month + " " + day + " " + hour;
        let hourStr = month + " " + day + " " + hour;

        if (curr === undefined) {
            curr = prev;
            color = 'red';
            scattSize = 3;
        }

        dataArr.push({
            time: hourStr + "|" + dayStr + "|" + monthStr + "|" + year,
            data: curr,
            size: scattSize,
            color: color,
            desc: desc,
            units: units
        });

        color = distictColor;
        scattSize = 1;
        counter++;
        prev = curr
    }
    return dataArr;
}

function getTimePortion(time, key, num) {
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
