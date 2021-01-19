/* global kakao */
import React, { useEffect, useState } from 'react';

const Map = ({ cafeInfo }) => {
  useEffect(() => {
    if (cafeInfo) {
      const places = new kakao.maps.services.Places(); // 카카오맵에서 장소를 검색하는 라이브러리
      const callback = (result, status) => {
        // 카카오맵에서 장소를 검색한 후 실행
        if (status === kakao.maps.services.Status.OK) {
          let position, text;
          if (result.length > 1) {
            let filtered = [],
              cafeAddr = cafeInfo.cafeAddress.split(' ');

            for (let i = 0; i < cafeAddr.length; i++) {
              if (filtered.length === 1) {
                break;
              }
              filtered = result.filter((cafe) => {
                return cafe.road_address_name.includes(cafeAddr[i]);
              });
            }
            position = new kakao.maps.LatLng(filtered[0].y, filtered[0].x);
            text = [filtered[0].place_name, filtered[0].road_address_name];
          } else {
            position = new kakao.maps.LatLng(result[0].y, result[0].x);
            text = [result[0].place_name, result[0].road_address_name];
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
      places.keywordSearch(cafeInfo.cafeName, callback);
    }
  }, [cafeInfo]);

  return <div id="staticMap"></div>;
};

export default Map;
