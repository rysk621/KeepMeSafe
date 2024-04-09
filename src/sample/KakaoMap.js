import { Map, MapMarker } from "react-kakao-maps-sdk";
// import workerLocationImgSrc from "../assets/image/worker.png"
import workerLocationImgSrc from "../assets/image/worker.png"

export default function KakaoMap() {

    return (
        <div>
            {/* 지도에 보여줄 위치 지정(위도, 경도) */}
            <Map
                center={{ lat: 37.506320759000715, lng: 127.05368251210247 }} // map centre
                style={{
                    width: "100%",
                    height: '192px',
                    borderRadius: '6px',
                }}
            >
                {/* 핀 찍힐 위치 */}
                <MapMarker
                    position={{ lat: 35.23444444444444, lng: 129.07833333333332 }}
                    image={{
                        src: workerLocationImgSrc, // 이미지 URL
                        size: { width: 36, height: 36 }, // 이미지 크기 설정
                    }}
                >
                </MapMarker>
            </Map>
        </div>
    )
}
