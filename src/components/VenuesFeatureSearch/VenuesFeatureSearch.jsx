import { useState } from "react"

const VenuesFeatureSearch = ({ filterVenuesByFeature }) => {

    const [selectedFeature, setSelectedFeature] = useState('')

    const handleFeatureChange = e => {
        const selectedValue = e.target.value
        setSelectedFeature(selectedValue)
        filterVenuesByFeature(selectedValue)
    }

    return (
        <form className="VenuesFeatureSearch">
            <select value={selectedFeature} onChange={handleFeatureChange}>
                <option value="">Seleccione una característica</option>
                <option value="Parking">Parking</option>
                <option value="Aire Acondicionado">Aire Acondicionado</option>
                <option value="Alquiler de material">Alquiler de material</option>
                <option value="Microfonía">Microfonía</option>
                <option value="Amplificadores">Amplificadores</option>
                <option value="Wifi">Wifi</option>
                <option value="Almacén">Almacén</option>
                <option value="Cafetería">Cafetería</option>
                <option value="Batería">Batería</option>
                <option value="Estudio de Grabación">Estudio de Grabación</option>
            </select>
        </form>
    )
}

export default VenuesFeatureSearch