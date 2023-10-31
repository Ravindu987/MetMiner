import React, {useState, useEffect} from "react";
import axios from "axios";
import { AllTable } from "../../components/allTable";
import { SearchFieldAll } from "../../components/searchFieldAll";
import { HeaderBar } from "../../components/headerBar";


export function AllPage() {

    const [all, setAll] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/all-lines")
            .then((res) => {
                setAll(res.data.hits.hits);
            })
            .catch((err) => {
                console.log(err);
            })
        }, []);

    
    return (
        <div>
            <HeaderBar text="All" />
            <SearchFieldAll setData={setAll} setPage={setPage}/>
            <AllTable data={all} page={page} setPage={setPage}/>
        </div>
    );
}