import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '10px'
};

const position = {
    lat: 24.098379,
    lng: 90.328712
};

const onLoad = marker => {
    console.log('Marker: ',marker);
}

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyD1BK9AIZQ91dALtw_CeqcB0VyubSNFrjU"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={10}
            >

            <Marker
                onLoad={onLoad}
                position={position}/>

            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)