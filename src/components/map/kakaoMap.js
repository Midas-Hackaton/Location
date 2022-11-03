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
          <Map
            center={{ lat: lat, lng: lng }}
            style={{ width: "70%", height: "500px", margin: "0 auto" }}
          >
            <MapMarker position={{ lat: lat, lng: lng }}>
              <span>현재 나의 근무지</span>
            </MapMarker>
          </Map>
        </>
      ) : (
        <div>GPS가 지원되지 않는 기기입니다.</div>
      )}
    </>
  );
}
