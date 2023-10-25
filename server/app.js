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


app.get("/all-lines", async (req, res) => {
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
            "query": {
                "match_all": {}
            }
        },
    });

    console.log(JSON.stringify(result))
    res.json(result);
});


app.get("/all-metaphors", async (req, res) => {
    const result = await client.search({  
        index: "sinhala-metaphors",
        size: 100,
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
    const poet = req.body.poet;
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

    console.log(JSON.stringify(result))
    res.json(result);
})

app.post("/all-by-poet", async (req, res) => {
    const poet = req.body.poet;
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
            "query": {
                "match": {
                    "Poet": poet
                }
            } 
        },
    });

    console.log(JSON.stringify(result))
    res.json(result);
})

app.post("/search-time-period", async (req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
            "query": {
                "range": {
                "Year": {
                    "gte": start,
                    "lte": end
                }
                }
            }                           
        }
    });

    console.log(JSON.stringify(result))
    res.json(result)
});

app.post("/search-all", async (req, res) => {
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

app.post("/search-all-metaphors", async (req, res) => {
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphors",
        size: 100,
        body :
        {query: {
          "bool": {
            "must": [
              {
                "multi_match": {
                  "query": word,
                  "fields": ["Poem_Name", "Line"]
                }
              }
            ],
            "filter": [
              {"term": {
                "Metaphor_present_or_not": "yes"
                }
            }
            ]
          }
        }
    }
    });

    console.log(JSON.stringify(result))
    res.json(result);
});

app.post("/search-all-metaphors-poet", async (req, res) => {
    const {word, poet} = req.body;
    const result = await client.search({
        index: "sinhala-metaphors",
        size: 100,
        body :
        {query: {
          "bool": {
            "must": [
              {
                "multi_match": {
                  "query": word,
                  "fields": ["Poem_Name", "Line"]
                }
              }
            ],
            "filter": [
              {"match": {
                "Poet": poet
                }
            }
            ]
          }
        }
    }
    });

    console.log(JSON.stringify(result))
    res.json(result);
});


app.post("/search-poem", async (req, res) => {
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
            "query": {
                "match": {
                    "Peom_Name": word
                }
            } 
        },
    });

    console.log(result)
    res.json(result);
});


app.post("/search-advanced", async (req, res, next) => {
    const {queryArgs} = req.body;

    let queryArgKeys = Object.keys(queryArgs)    
    let queries = []
    
    for (let i = 0; i < queryArgKeys.length; i++) {
        queries.push({
            match: { [queryArgKeys[i]]: { query: queryArgs[queryArgKeys[i]], operator: "AND" } },
        })
    }
    const result = await client.search({
        index: "sinhala-metaphors",
        body: {
            query: {
                bool: {
                    must:queries
                }
            }
        }
    });

    console.log(result)
    res.json(result);
});


app.listen(3001, () => console.log("App listening on http://localhost:3001"));
