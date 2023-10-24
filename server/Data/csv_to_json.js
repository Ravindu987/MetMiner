const fs = require("fs");
let scvData = []
fs.readFile("server/Data/data.csv", "utf-8", (err, data) => {
    if (err) throw err;
    // console.log(data);
    scvData = data.split("\n");
    for (let i = 0; i < scvData.length; i++) {
        scvData[i] = scvData[i].replace("\r", "").split(",");
    }
    let headers = scvData.shift();
    let jsonData = []
    json_index = {"index": {"_index": "sinhala-metaphors"}}
    for (let i = 0; i < scvData.length; i++) {
        jsonData.push(json_index);
        let temp = {};
        for (let j = 0; j < headers.length; j++) {
            temp[headers[j]] = scvData[i][j];
        }
        jsonData.push(temp);
    }
    function appendData() {
        if (jsonData.length) {
            fs.appendFile("server/Data/data.json", JSON.stringify(jsonData.shift())+"\n", (err) => {
                if (err) throw err;
                appendData();
            });
        }
    }
    appendData(); 
});