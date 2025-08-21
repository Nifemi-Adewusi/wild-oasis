import Filter from '../../ui/Filter'
import TableOperations from '../../ui/TableOperations'


const options = [
  {
    type: "all",
    value: "All",
    },
    {
        type: "no-discount",
        value:"No Discount"
    },
    {
        type:"with-discount",
        value:"With Discount"
    }
];
function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterKey="discount" options={options}/>
        </TableOperations>
    )
}

export default CabinTableOperations
