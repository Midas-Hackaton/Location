import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getLocation } from "../../util/map/index";

export default function KakaoMap() {
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
  React.useEffect(() => {
    getLocation().then((response) => {
      setLat(response.latitude);
      setLng(response.longitude);
      console.log(response);
    });
  }, []);

  return (
    <>
      {lat ? (
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: lat, lng: lng }}>
            <span style={{ color: "#000" }}>현재 나의 위치</span>
          </MapMarker>
        </Map>
      ) : (
        <></>
      )}
    </>
  );
}
