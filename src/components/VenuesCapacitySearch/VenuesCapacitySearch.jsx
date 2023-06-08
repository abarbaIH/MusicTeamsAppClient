import { useState } from "react"

const VenuesCapacitySearch = ({ filterVenuesByCapacity }) => {

    const [capacityQuery, setCapacityQuery] = useState('')

    const handleQueryChange = e => {
        const inputValue = e.target.value
        setCapacityQuery(inputValue)
        filterVenuesByCapacity(parseInt(inputValue))
    }

    return (
        <div className="VenuesCapacitySearch" >
            <input type="number" placeholder="Capacidad mínima" value={capacityQuery} onChange={handleQueryChange} style={{ padding: "10px", width: "90%" }} />
        </div>
    )
}

export default VenuesCapacitySearch
