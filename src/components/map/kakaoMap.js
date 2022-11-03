import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getLocation } from "../../util/map/index";
import Timer from "../timer/timer";

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
        <>
          <Timer />
          <Map
            center={{ lat: lat, lng: lng }}
            style={{ width: "70%", height: "500px", margin: "0 auto" }}
          >
            <MapMarker position={{ lat: lat, lng: lng }}>
              <span style={{ color: "#000" }}>현재 나의 위치</span>
            </MapMarker>
          </Map>
        </>
      ) : (
        <div>GPS기능이 지원되지 않는 기기입니다.</div>
      )}
    </>
  );
}
