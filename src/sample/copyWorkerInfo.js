import LineChartForAll from './copyLineChartForAll'
import NavBar from '../UI/NavBar'

import React, { useEffect, useState } from 'react'

// 정의한 atom(state)을 컴포넌트에서 useRecoilState() Hook을 사용하여 구독하고 workers 데이터를 담기(hook으로 데이터를 저장)
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { workerInfo } from '../component/Atom';
import { UseWebSocketData } from './copyUseWebSocketData';
import { UseBasicInfoFetchData } from './copyUseBasicInfoFetchData';
import WorkerDetail from './copyWorkerDetail';

// import UseLogFetchData from './UseLogFetchData';
// import { useFetcher } from 'react-router-dom';

export default function WorkerInfo() {
    const [menuOpen, setMenuOpen] = useState(false);

    // const [logData, setLogData] = useState()
    // useEffect(() => {
    //     console.log("logData Fetch함수가 호출되었습니다.");

    //     fetch('http://10.125.121.204:8080/workerlog', {
    //         method: "GET",
    //     })
    //         // .then(res => res.json())
    //         .then(data => {
    //             setLogData(data)
    //         })
    // }, [])

    // useEffect(() => {
    //     if (!logData) return;
    //     console.log("logData", logData)
    // }, [logData])


    // object 데이터를 파싱하여 원하는 데이터에 접근
    // const [heartbeats, setHeartbeats] = useState([])
    // useEffect(() => {

    //     if (!logData) return;
    //     // 데이터를 파싱하여 각 사용자의 모든 heartbeat를 추출하고 저장
    //     const parsedHeartbeats = Object.keys(logData).reduce((individual, key) => {
    //         // logData[key]는 해당 사용자의 모든 데이터를 포함하는 배열입니다.
    //         // 배열을 파싱하여 각 항목의 heartbeat만 추출합니다.
    //         const userHeartbeats = JSON.parse(logData[key]).map(userData => userData.heartbeat);
    //         individual[key] = userHeartbeats; // 사용자 ID를 키로 하여 heartbeat 배열을 저장

    //         return individual;
    //     }, {});
    //     setHeartbeats(parsedHeartbeats);
    // }, []);
    // useEffect(() => {
    //     if (!heartbeats) return;
    //     console.log("heartbeat", heartbeats)
    // }, [heartbeats])


    // const [historyData, setHistoryData] = useState([])

    // useEffect(() => {

    //     if (!logData) return;
    //     // 데이터를 파싱하여 각 사용자의 모든 heartbeat와 temperature를 추출하고 저장
    //     const parsedData = Object.keys(logData).reduce((acc, key) => {
    //         // logData[key]는 해당 사용자의 모든 데이터를 포함하는 배열입니다.
    //         // 배열을 파싱하여 각 항목의 heartbeat와 temperature만 추출합니다.
    //         const userDetails = JSON.parse(logData[key]).map(({ heartbeat, temperature, outTemp, registerDate }) => ({
    //             heartbeat,
    //             temperature,
    //             outTemp,
    //             registerDate
    //         }));
    //         acc[key] = userDetails; // 사용자 ID를 키로 하여 데이터 배열을 저장
    //         return acc;
    //     }, {});

    //     setHistoryData(parsedData);
    // }, [logData]);


    // useEffect(() => {
    //     if (!historyData) return;
    //     console.log("historyData", historyData)
    // }, [historyData])


    // 방법 1) name, age, department를 각 변수로 각각의 데이터를 받아와서 사용
    // const [name, setName] = useState([])
    // const [age, setAge] = useState([])
    // const [department, setDepartment] = useState([])

    // 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용 
    // const [workers, setWorkers] = useState([]) // 초기값을 빈 배열로 생성

    // 방법 3) recoil 변수에 저장된 작업자 기본 데이터를 사용
    // const workers = useRecoilState(workerInfo)
    // console.log(workers[0])

    // 작업자 데이터 받는 방법 1) 컴포넌트 내에서 직접 fetch
    // worker page 이전인 home page에서 먼저 fetch가 된후에 변수를 사용해야하므로 아래 fetch 함수는 warining list 컴포넌트로 이동
    // useEffect(() => {
    //     fetch('http://10.125.121.204:8080/worker', {
    //         method: "GET"
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log("결과", data);

    //             // 'data.body' 배열에 접근하여 'map' 함수 적용 
    //             // (받아온 res중 body부분이 배열-배열의 형태에 대해서만 map함수가 가능)

    //             // 방법 1) name, age, department를 각각 변수로 받아와서 사용
    //             // setName(data.body.map(worker => worker.workerName));
    //             // setAge(data.body.map(worker => worker.age));
    //             // setDepartment(data.body.map(worker => worker.department));

    //             // 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용 
    //             // setWorkers(data.body)

    //             // 방법 3) json으로 받아온 데이터(data.body : data의 body부분에 workers의 데이터가 배열로 존재)를 atom변수에 저장하여 사용
    //             setWorkers(data.body)
    //         })
    //         .catch(error => console.error("에러 발생:", error));
    // }, [])


    // 작업자 데이터(기본+Log데이터) 받는 방법 2) webSocket과 fetch하는 컴포넌트를 불러와서 데이터 사용
    const [workers, setWorkers] = useRecoilState(workerInfo);
    UseWebSocketData("ws://10.125.121.204:8080/ws/emul")
    UseBasicInfoFetchData("http://10.125.121.204:8080/worker")

    console.log("workers", workers)


    // 정렬) 필터링 상태 추가
    const [filterStatus, setFilterStatus] = useState("ALL")

    // 정렬) 필터링된 workers 배열을 반환하는 함수
    const filteredWorkers = workers.filter((worker) => {
        // filterStatus가 ALL이면 workers의 모든 배열 반환
        if (filterStatus === 'ALL') return true;
        // 그게 아니라면 worker.status가 filterStatus와 같은 workers 배열을 반환
        return worker.status === filterStatus;
    })

    // 작업자의 카드를 선택했을 때 해당 작업자의 Dialog를 열 수있도록 관리 -> 각 작업자에 대해 open 상태 관리
    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleOpenDetail = (worker) => {
        setSelectedWorker(worker);
    };

    const handleCloseDetail = () => {
        setSelectedWorker(null);
    };

    return (
        <div>
            {/* worker page에서 메뉴바가 열렸을 때, 화면의 너비가 768px보다 크다면 NavBar과 worker body부분을 동시에 메뉴바 크기만큼 밀려난다 */}
            {/* 데스크 모드일때는 (화면의 너비가 1200px보다 클때는) worker page의 NavBar부분과 Body부분이 MenuBar의 너비인 화면의 1/5를 제외한 4/5만큼을 차지하게 한다 */}
            {/* 반대로 모바일 화면이라 MenuBar가 열리지 않았다면, worker의 NavBar과 Body부분이 화면의 너비를 꽉차게 보이도록 한다 */}
            <div className={`${menuOpen ? 'xl:ml-1/5 md:ml-60' : 'w-full'}`}>
                <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <div className='flex-col justify-end items-center  bg-slate-200 p-3'>
                    <div className='flex justify-end items-center'>
                        <button onClick={() => { setFilterStatus("ALL") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-5">
                            ▼ ALL
                        </button>
                        <button onClick={() => { setFilterStatus("SAFE") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-5">
                            ▼ SAFE
                        </button>
                        <button onClick={() => { setFilterStatus("CAUTION") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-5">
                            ▼ CAUTION
                        </button>
                    </div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-200 p-3'>

                        {/* 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용  */}
                        {/* 방법 3) json으로 받아온 데이터를 atom변수에 저장하여 사용 */}
                        {/* {workers.map((worker, index) => ( */}

                        {/* 방법 4) filterStatus에 따라 카드 반환 */}
                        {filteredWorkers.map((worker, index) => (
                            // 상태 받아와서 border색 지정
                            <div key={worker.id} className={`flex-col justify-center items-center border-4 rounded-md w-full bg-white h-full min-w-68 overflow-y-hidden
                                                    ${worker.status === "CAUTION" ? "border-red-500" : "border-green-400"}`}
                                style={{ position: 'relative' }}
                                // 각 작업자의 카드에 대한 클릭 이벤트 핸들러
                                onClick={() => { handleOpenDetail(worker) }}>
                                <div className='flex justify-start items-center'>
                                    <svg className="w-20 h-20 fill-orange-200 m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                        <path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
                                    </svg>
                                    <div className='w-3/4'>
                                        이름 : {worker.workerName} <br />
                                        나이 : {worker.year} <br />
                                        직무 : {worker.department}
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        right: '0', // 오른쪽 끝에 위치
                                        top: '0', // 상단에 위치
                                        width: '0px',
                                        height: '0px',
                                        borderTop: `28px solid ${worker.status === "CAUTION" ? "rgb(239, 68, 68)" : "rgb(74, 222, 128)"}`, // 삼각형 색상
                                        borderLeft: '28px solid transparent',
                                        borderRight: '0px solid transparent',
                                    }} />

                                    <div>
                                        {/* 상태 받아와서 상태 넣기 */}
                                        <div className={`w-auto mt-5 text-center rounded-full mr-2 px-1.5
                                    ${worker.status === 'CAUTION' ? "bg-red-200 text-red-400" : "bg-green-100 text-green-400"}`}>
                                            {/* {(worker.status.substring(0, 4))} */}
                                            {worker.status}
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-center items-center h-auto m-2'>
                                    {/* {worker.list.forEach((item) => {
                                        console.log(`heartbeat: ${item.heartbeat}, temperature: ${item.temperature}, outTemp: ${item.outTemp}, regidate: ${item.regidate}`)
                                    })} */}
                                    <LineChartForAll workerData={worker.list} />
                                </div>
                            </div>
                        ))}

                        {/* 현재 선택된 작업자의 정보 저장 -> workerDetail component로 전달 */}
                        {selectedWorker && (
                            <WorkerDetail
                                worker={selectedWorker}
                                open={true}
                                handleClose={handleCloseDetail}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
