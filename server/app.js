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


// Get All Lines
app.get("/all-lines", async (req, res) => {
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 700,
        body: {
            "query": {
                "match_all": {}
            }
        },
    });

    console.log(JSON.stringify(result))
    res.json(result);
});


// Get All lines by a poet
app.post("/all-by-poet", async (req, res) => {
    const poet = req.body.poet;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 700,
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
});


// Search all by a key word
app.post("/search-all", async (req, res) => {
    console.log("Here")
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 700,
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
            ]
            }
        }
    }
    });

    console.log(JSON.stringify(result))
    res.json(result);
});


// Search all by a key word and poet
app.post("/search-all-poet", async (req, res) => {
    const {word, poet} = req.body;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 700,
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


// Get all metaphors
app.get("/all-metaphors", async (req, res) => {
    const result = await client.search({  
        index: "sinhala-metaphor-corpus",
        size: 100,
        body: {      
            "query": {
                "term": {
                    "Metaphor_present_or_not": "yes"
                }
            }    
        }            
    });
    console.log(JSON.stringify(result)) 
    res.json(result)

});


// Get all metaphors by a poet
app.post("/metaphors-by-poet", async (req, res) => {
    const poet = req.body.poet;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 100,
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
});


// Search all metaphors by a key word
app.post("/search-all-metaphors", async (req, res) => {
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
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


// Search all metaphors by a key word and poet
app.post("/search-all-metaphors-poet", async (req, res) => {
    const {word, poet} = req.body;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
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
            },
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


// Get all lines in a time period
app.post("/search-time-period", async (req, res) => {
    const start = req.body.start;
    const end = req.body.end;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        size: 700,
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


// Search by a keyword in poem name
app.post("/search-poem", async (req, res) => {
    const {word} = req.body;
    const result = await client.search({
        index: "sinhala-metaphor-corpus",
        body: {
            "query": {
                "match": {
                    "Poem_Name": word
                }
            } 
        },
    });

    console.log(JSON.stringify(result))
    res.json(result);
});


app.listen(3001, () => console.log("App listening on http://localhost:3001"));
