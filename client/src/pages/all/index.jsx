import React, { useState, useEffect } from "react";
import { AllTable } from "../../components/allTable";
import { SearchFieldAll } from "../../components/searchFieldAll";
import { HeaderBar } from "../../components/headerBar";
import GetAllLines from "../../api/services/getAllLines";

export function AllPage() {
  const [all, setAll] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetAllLines();
        console.log(res);
        setAll(res.data.hits.hits);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <HeaderBar text="All" />
      <SearchFieldAll setData={setAll} setPage={setPage} />
      <AllTable data={all} page={page} setPage={setPage} />
    </div>
  );
}
