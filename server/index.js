const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/?url=https://habr.com/'
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/get_data', cors(), async (req, res) => {
    let fetchedData = new Object();
    try {
        const dataReq = await axios.get(apiUrl);
        const jsonArray = dataReq.data.lighthouseResult.audits;
        
        console.log(`Array from request:`+jsonArray);

        let j = 0;
        for (let key in jsonArray) {
            const tmpJson = jsonArray[key];
            console.log(tmpJson);
            if (tmpJson.details && tmpJson.details['type'] === 'opportunity' && typeof tmpJson.displayValue !== 'undefined') {
                fetchedData[j] = {"title" : tmpJson.title, "savings" : tmpJson.details.overallSavingsMs, "score" : tmpJson.score, "displayValue" : tmpJson.displayValue};
                // console.log(fetchedData[j]);
                j++;
            }
        }
        console.log(`Sum= ${j}`);
        res.send(fetchedData);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Oopps..!`);
    }
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server runs on ${port} port`));