import { useState } from "react"

const VenuesCapacitySearch = ({ filterVenuesByCapacity }) => {

    const [capacityQuery, setCapacityQuery] = useState('')

    const handleQueryChange = e => {
        const inputValue = e.target.value
        setCapacityQuery(inputValue)               // OJO las actualizaciones de estado son asincronas, no bloqueantes
        filterVenuesByCapacity(parseInt(inputValue)) // Convertir el valor a un número entero antes de filtrar
    }

    return (
        <div className="VenuesCapacitySearch">
            <input type="number" placeholder="Capacidad mínima" value={capacityQuery} onChange={handleQueryChange} />
        </div>
    )
}

export default VenuesCapacitySearch
