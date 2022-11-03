import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getLocation } from "../../util/map/index";

export default async function KakaoMap() {
  const gsLocation = await getLocation();
  console.info(`gsLocation: ${JSON.stringify(gsLocation)}`);
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
