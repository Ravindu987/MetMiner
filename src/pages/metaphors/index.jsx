import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MetaphorTable } from "../../components/metaphorTable";
import {SearchField} from "../../components/searchField";

export function MetaphorPage() {

    const [metaphors, setMetaphors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/all-metaphors")
            .then((res) => {
                setMetaphors(res.data.hits.hits);
            })
            .catch((err) => {
                console.log(err);
            })
        }, []);

    
    return (
        <div>
        <h1>Metaphor List</h1>
        <SearchField setData={setMetaphors}/>
        <MetaphorTable data={metaphors} />
        </div>
    );
}