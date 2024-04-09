import { Map, MapMarker } from "react-kakao-maps-sdk";
// import workerLocationImgSrc from "../assets/image/worker.png"
import workerLocationImgSrc from "../assets/image/worker.png"

import { useRecoilState } from "recoil";
import { workerInfo } from "./Atom";
import { UseWebSocketData } from "./UseWebSocketData";
import { UseBasicInfoFetchData } from "./UseBasicInfoFetchData";

export default function KakaoMap() {
    // 각 마커별로 인포윈도우 열림 상태를 개별적으로 관리하기 위해 workers상태 내에 isInfoWindowOpen 속성 추가/업데이트
    // 마커에 마우스오버 시 인포윈도우 상태를 업데이트하는 함수
    const handleMouseOver = (index) => { // index : 마우스가 올라간 worker인덱스
        const updatedWorkers = workers.map((worker, workerIndex) => {
            if (workerIndex === index) {
                // 마우스오버된 마커의 인덱스에 해당하는 worker의 isInfoWindowOpen을 true로 설정
                return { ...worker, isInfoWindowOpen: true };
            }
            return worker;
        });
        setWorkers(updatedWorkers);
    };

    // 마커에 마우스아웃 시 인포윈도우 상태를 업데이트하는 함수
    const handleMouseOut = (index) => { // index : 마우스가 떠난 worker인덱스
        const updatedWorkers = workers.map((worker, workerIndex) => {
            if (workerIndex === index) {
                // 마우스가 떠난 마커의 인덱스에 해당하는 worker의 isInfoWindowOpen을 false로 설정
                return { ...worker, isInfoWindowOpen: false };
            }
            return worker;
        });
        setWorkers(updatedWorkers);
    };

    const [workers, setWorkers] = useRecoilState(workerInfo);

    UseWebSocketData("ws://10.125.121.204:8080/ws/emul")
    UseBasicInfoFetchData("http://10.125.121.204:8080/worker")
    console.log("-----------", workers)
    return (
        <div>

            {/* 지도에 보여줄 위치 지정(위도, 경도) */}
            <Map
                center={{ lat: 35.23444444444444, lng: 129.07833333333332 }} // map centre
                style={{
                    width: "100%",
                    height: "320px",
                    borderRadius: '6px',
                }}
            >

                {/* 작업자들의 데이터를 순회돌면서 각각 작업자의 위치를 찍음 */}
                {workers.map((worker, index) => (

                    <MapMarker
                        // 각 고유값을 주기 위해 key값을 설정
                        key={`${worker.id}-${worker.list[worker.list.length - 1].latitude}-${worker.list[worker.list.length - 1].longitude}`}
                        // key={index}
                        position={{ lat: worker.list[worker.list.length - 1].latitude, lng: worker.list[worker.list.length - 1].longitude }}
                        image={{
                            src: workerLocationImgSrc, // 이미지 URL
                            size: { width: 36, height: 36 }, // 이미지 크기 설정
                        }}

                        // clickable={true} // 마커 클릭 가능
                        onMouseOver={() => handleMouseOver(index)} // 마우스가 올라가면 해당 작업자의 index를 넘겨 이벤트 함수 실행
                        onMouseOut={() => handleMouseOut(index)} // 마우스가 떠나면 해당 작업자의 index를 넘겨 이벤트 함수 실행
                    >

                        {worker.isInfoWindowOpen &&
                            <div style={{
                                display: "block",
                                background: "#50627F",
                                color: "#fff",
                                textAlign: "center",
                                height: "48px",
                                lineHeight: "22px",
                                borderRadius: "4px",
                                padding: "0px 50px",
                            }}>
                                {worker.workerName}
                                {worker.status}
                            </div>
                        }
                        {/* {/* {worker.isInfoWindowOpen && <div style={{ padding: "5px", color: "#000" }}>{worker.latitude}, {worker.longitude}</div>}  */}
                    </MapMarker>
                ))}

            </Map>
        </div>
    )
}
