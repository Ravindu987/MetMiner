import React, {useState, useEffect} from "react";
import axios from "axios";
import { MetaphorTable } from "../../components/metaphorTable";
import {SearchField} from "../../components/searchField";
import { HeaderBar } from "../../components/headerBar";


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
            <HeaderBar text="Metaphors" />
            <SearchField setData={setMetaphors}/>
            <MetaphorTable data={metaphors} />
        </div>
    );
}