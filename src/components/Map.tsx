import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";
import { Button } from "react-bootstrap";

const Map = () => {
  const apiKey = String(process.env.REACT_APP_GOOGLE_MAP_APIKEY);

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const center = {
    lat: 35.1828775,
    lng: 137.1118566,
  };

  const samplePosition = {
    lat: 35.1833377,
    lng: 137.1134278,
  };
  const sampleStyle = {
    background: "white",
    fontSize: 7.5,
  };
  

  return (
    <>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          <InfoWindow position={samplePosition}>
            <div style={sampleStyle}>
              <p>エライザちゃんの自転車</p>
              <Button>トークルーム</Button>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
