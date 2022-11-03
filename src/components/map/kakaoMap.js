import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getLocation } from "../../util/map/index";
import Timer from "../timer/timer";

export default function KakaoMap() {
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();

  const db = getDatabase();
  const userRef = ref(
    db,
    `userInfo/${JSON.parse(localStorage.getItem("user")).uid}`
  );

  const getData = () => {
    onValue(userRef, (response) => {
      return response.val();
    });
  };

  React.useEffect(() => {
    getLocation().then((response) => {
      setLat(response.latitude);
      setLng(response.longitude);
      console.log(response);
    });
    console.log(getData());
  }, []);

  return (
    <>
      {lat ? (
        <>
          <Timer />
          <Map
            center={{ lat: lat, lng: lng }}
            style={{ width: "100%", height: "360px" }}
          >
            <MapMarker position={{ lat: lat, lng: lng }}>
              <span style={{ color: "#000" }}>현재 나의 위치</span>
            </MapMarker>
          </Map>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
