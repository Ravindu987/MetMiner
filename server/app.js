const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { Client } = require('elasticsearch')

const client = new Client({
    node: "https://localhost:9200"
})

app.get("/all-metaphors", async (req, res) => {
    const result = await client.search({  
        index: "sinhala-metaphors",
        body: {      
            "query": {
                "term": {
                    "Metaphor_present_or_not": "yes"
                }
            }    
        }            
    });
    console.log(result) 
    res.json(result)
    });

app.post("/metaphors-by-poet", async (req, res) => {
    const {poet} = req.body;
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
        "query": {
            "bool": {
                "must": [
                {
                    "match": {
                    "Poet": poet
                    }
                },
                {
                    "match": {
                    "Metaphor_present_or_not": "Yes"
                    }
                }
                ]
            }
            }
        },
    });

    console.log(result)
    res.json(result);
})

app.post("/search-key", async (req, res) => {
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
        query: {
            bool: {
            should: [
                {
                match: { "Poem_Name": { query: word, operator: "AND" } },
                },
                {
                match: { "Line": { query: word, operator: "AND" } },
                },
                {
                match: { "Poet": { query: word, operator: "AND" } },
                },
                {
                match: { "Year": { query: word, operator: "AND" } },
                },
                {
                match: { "Metaphorical_Terms": { query: word, operator: "AND" } },
                },
                {
                match: { "Source_Domain": { query: word, operator: "AND" } },
                },
                {
                match: { "Target_Domain": { query: word, operator: "AND" } },
                }
            ],
            },
        },
        },
    });

    console.log(result)
    res.json(result);
});



app.listen(3001, () => console.log("App listening on http://localhost:3001"));
