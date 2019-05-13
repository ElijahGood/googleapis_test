const express = require('express');
const bodyParser = require('body-parser');
let request = require('request');
const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/'


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (res, req, next) => {
    request(apiUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let jsonArray = JSON.parse(body).lighthouseResult.audits;
                
                // let jsonArray = JSON.parse(tmpArray);
                
                // let i = 0;
                // for (var key in jsonArray) {

                //     console.log(`${i}) => key: ${key}\n value: ${jsonArray[str].title}\n`);
                //     i++;
                // }

                let j = 0;
                for (let key in jsonArray) {
                    const tmpJson = jsonArray[key];
                    if (tmpJson.details && tmpJson.details['type'] === 'opportunity') {
                        // console.log(`${j}) Obj: ${tmpJson.details['overallSavingsMs']}\n`);
                        console.log(`${j}) res: name= ${tmpJson.title}, savings= ${tmpJson.details.overallSavingsMs};`);
                        j++;
                    }
                    
                    // if (jsonArray[key].details[] === 'opportunity') {
                    //     console.log(jsonArray[key].title);
                        
                    // }
                }
                console.log(jsonArray);
            } 
        });
   
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server runs on ${port} port`));