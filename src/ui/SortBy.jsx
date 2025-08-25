/* eslint-disable no-unused-vars */

import { useSearchParams } from "react-router-dom"
import Select from "./Select"

/* eslint-disable react/prop-types */
function SortBy({ options, filterKey }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(filterKey);

  const handleChange = (e) => {
    // Sets A Key Value Pair For The Param in the URL
    searchParams.set(filterKey, e.target.value);
    // Sets Search Param to the Updated Key Value Param on change
    setSearchParams(searchParams);
  };
  return <Select value={value} onChange={handleChange} options={options} />;
}

export default SortBy;
