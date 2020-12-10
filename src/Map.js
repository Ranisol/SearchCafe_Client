/* global kakao */
import React, { useState } from 'react';

const Map = ({ cafeInfo }) => {
  console.log(cafeInfo);
  const places = new kakao.maps.services.Places(); // 카카오맵에서 장소를 검색하는 라이브러리
  const callback = (result, status) => {
    // 카카오맵에서 장소를 검색한 후 실행
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      let position, text;
      if (result.length > 1) {
        // position = new kakao.maps.LatLng(result[0].y, result[0].x);
        // text = [result[0].place_name, result[0].road_address_name];
      }
      const staticMapContainer = document.getElementById('staticMap'); // 지도를 표시할 div
      const staticMapOption = {
        center: position, // 지도 중심좌표
        level: 3, // 지도 확대 레벨
        marker: {
          position, // 검색한 위치에 마커 생성
          text, // 마커에 띄울 텍스트
        },
      };

      const staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption
      );
    }
  };
  places.keywordSearch(cafeInfo.cafeAddress, callback);
  return <div id="staticMap" style={{ width: '300px', height: '300px' }}></div>;
};

export default Map;
