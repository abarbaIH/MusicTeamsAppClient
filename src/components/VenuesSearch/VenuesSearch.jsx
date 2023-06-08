import { useState } from "react"

const VenuesSearch = ({ filterVenuesByName }) => {

    const [nameQuery, setNameQuery] = useState('')

    const handleQueryChange = e => {
        const inputValue = e.target.value
        setNameQuery(inputValue)
        filterVenuesByName(inputValue)
    }

    return (
        <form className="VenueSearch">
            <input type="text" placeholder="Filtra por nombre..." value={nameQuery} onChange={handleQueryChange} style={{ padding: "10px", width: "90%" }} />
        </form>
    )
}

export default VenuesSearch