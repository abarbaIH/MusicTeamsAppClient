import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = (props) => {
    const markerPosition = { lat: props.latitud, lng: props.longitud };

    const containerStyle = {
        maxWidth: '100%',
        maxheight: '100%',
    };

    const mapStyle = {
        width: '500px',
        height: "300px"


        // height: '100%',
    };

    return (
        <div style={containerStyle}>
            <Map
                google={props.google}
                zoom={15}
                style={mapStyle}
                containerStyle={mapStyle}
                initialCenter={markerPosition}
            >
                <Marker position={markerPosition} />
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'TU_API_KEY_AQUI',
})(MapContainer);




