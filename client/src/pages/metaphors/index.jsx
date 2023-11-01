import React, { useState, useEffect } from "react";
import { MetaphorTable } from "../../components/metaphorTable";
import { SearchField } from "../../components/searchField";
import { HeaderBar } from "../../components/headerBar";
import GetAllMetaphors from "../../api/services/getAllMetaphors";

export function MetaphorPage() {
  const [metaphors, setMetaphors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetAllMetaphors();
        setMetaphors(res.data.hits.hits);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <HeaderBar text="Metaphors" />
      <SearchField setData={setMetaphors} />
      <MetaphorTable data={metaphors} />
    </div>
  );
}
