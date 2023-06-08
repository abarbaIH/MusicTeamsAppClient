import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {
    const markerPosition = { lat: props.latitud, lng: props.longitud };



    return (
        <Map
            google={props.google}
            zoom={15}
            style={{ width: "500px", height: "270px" }}
            initialCenter={markerPosition}
            className='map'
        >
            <Marker position={markerPosition} />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBx72KESknoGr4R_KweexoTWPO_sq1Zph0',
})(MapContainer);




