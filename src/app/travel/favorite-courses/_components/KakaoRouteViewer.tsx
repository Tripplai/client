'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Coord {
  x: number;
  y: number;
}

interface Props {
  origin: Coord;
  destination: Coord;
  waypoints?: Coord[];
}

const fetchKakaoRoute = async (
  origin: Coord,
  destination: Coord,
  waypoints: Coord[] = []
) => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_NAVI_KEY;
  if (!REST_API_KEY) throw new Error('KAKAO API 키가 정의되지 않았습니다.');

  const waypointsStr = waypoints.map(wp => `${wp.x},${wp.y}`).join('|');

  const url = new URL('https://apis-navi.kakaomobility.com/v1/directions');
  url.searchParams.append('origin', `${origin.x},${origin.y}`);
  url.searchParams.append('destination', `${destination.x},${destination.y}`);
  if (waypointsStr) url.searchParams.append('waypoints', waypointsStr);
  url.searchParams.append('priority', 'RECOMMEND');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
    },
  });

  if (!res.ok) throw new Error('경로 요청 실패');
  const data = await res.json();
  return data.routes?.[0];
};

export default function KakaoRouteViewer({
  origin,
  destination,
  waypoints = [],
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const kakaoMapRef = useRef<any>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapContainerRef.current) return;

    window.kakao.maps.load(() => {
      const kakao = window.kakao;
      const map = new kakao.maps.Map(mapContainerRef.current, {
        center: new kakao.maps.LatLng(origin.y, origin.x),
        level: 5,
      });
      kakaoMapRef.current = map;

      // ✅ 마커 생성 함수
      const addMarker = (coord: Coord, label: string) => {
        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(coord.y, coord.x),
          title: label,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:13px;">${label}</div>`,
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      };

      // ✅ 마커 표시
      addMarker(origin, '출발지');
      waypoints.forEach((wp, idx) => addMarker(wp, `경유지 ${idx + 1}`));
      addMarker(destination, '도착지');

      // ✅ 경로 폴리라인 표시
      fetchKakaoRoute(origin, destination, waypoints).then(route => {
        const roads = route?.sections?.[0]?.roads || [];
        if (!roads.length) {
          console.warn('경로 데이터 없음');
          return;
        }

        const path = roads.flatMap((road: { vertexes: number[] }) => {
          const result: any[] = [];
          for (let i = 0; i < road.vertexes.length; i += 2) {
            const lng = road.vertexes[i];
            const lat = road.vertexes[i + 1];
            if (lng !== undefined && lat !== undefined) {
              result.push(new kakao.maps.LatLng(lat, lng));
            }
          }
          return result;
        });

        const polyline = new kakao.maps.Polyline({
          path,
          strokeWeight: 5,
          strokeColor: '#FF5C5C',
          strokeOpacity: 0.9,
          strokeStyle: 'solid',
        });

        polyline.setMap(map);
      });
    });
  }, [origin, destination, waypoints]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
}
