/* eslint-disable no-unused-vars */

import { useSearchParams } from "react-router-dom"
import Select from "./Select"

/* eslint-disable react/prop-types */
function SortBy({ options, filterKey }) {
    const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.set()
    // setSearchParams.get
    const handleChange = (e) => {
        searchParams.set(filterKey, e.target.value)
        setSearchParams(searchParams)
    }
    return <Select onChange={handleChange} options={options}/>
}

export default SortBy
