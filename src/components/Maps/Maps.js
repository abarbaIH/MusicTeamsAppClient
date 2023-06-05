import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const MapContainer = (props) => {
    const markerPosition = { lat: props.latitud, lng: props.longitud };

    return (
        <Map
            google={props.google}
            zoom={15}
            style={{ width: '400px', height: '200px' }}
            initialCenter={markerPosition}
        >
            <Marker position={markerPosition} />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBtcHMH1nPzZAD52ednZWNzL5WlEcyEjSI'
})(MapContainer);

