import { useState } from "react"

const VenuesCapacitySearch = ({ filterVenuesByCapacity }) => {

    const [capacityQuery, setCapacityQuery] = useState('')

    const handleQueryChange = e => {
        const inputValue = e.target.value
        setCapacityQuery(inputValue)
        filterVenuesByCapacity(parseInt(inputValue))
    }

    return (
        <div className="VenuesCapacitySearch">
            <input type="number" placeholder="Capacidad mínima" value={capacityQuery} onChange={handleQueryChange} />
        </div>
    )
}

export default VenuesCapacitySearch
