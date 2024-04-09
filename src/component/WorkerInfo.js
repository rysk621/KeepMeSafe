import LineChartForAll from './LineChartForAll'
import NavBar from '../UI/NavBar'
import Footer from '../UI/Footer';

import React, { useEffect, useState } from 'react'

// 정의한 atom(state)을 컴포넌트에서 useRecoilState() Hook을 사용하여 구독하고 workers 데이터를 담기(hook으로 데이터를 저장)
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { workerInfo } from './Atom';
import { UseWebSocketData } from './UseWebSocketData';
import { UseBasicInfoFetchData } from './UseBasicInfoFetchData';
import WorkerDetail from './WorkerDetail';

export default function WorkerInfo() {
    const [menuOpen, setMenuOpen] = useState(false);

    // 작업자 데이터(기본 인적사항 데이터 + Log데이터 + WebSocket데이터) 받는 방법
    const [workers, setWorkers] = useRecoilState(workerInfo);
    UseWebSocketData("ws://10.125.121.204:8080/ws/emul")
    UseBasicInfoFetchData("http://10.125.121.204:8080/worker")

    console.log("workers Data", workers)

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
                <div className='flex-col justify-end items-center bg-slate-200 sm:p-3 min-h-screen'>
                    <div className='flex justify-end items-center pt-2 pb-2'>
                        <button onClick={() => { setFilterStatus("ALL") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-3 text-xs sm:text-lg">
                            ▼ ALL
                        </button>
                        <button onClick={() => { setFilterStatus("SAFE") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-3 text-xs sm:text-lg">
                            ▼ SAFE
                        </button>
                        <button onClick={() => { setFilterStatus("CAUTION") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-3 text-xs sm:text-lg">
                            ▼ CAUTION
                        </button>
                        <button onClick={() => { setFilterStatus("WARNING") }}
                            variant="outlined"
                            className="hover:underline text-slate-800 mr-3 sm:mr-5 text-xs sm:text-lg">
                            ▼ WARNING
                        </button>
                    </div>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-4 gap-3 bg-slate-200 sm:p-3'>

                        {/* 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용  */}
                        {/* 방법 3) json으로 받아온 데이터를 atom변수에 저장하여 사용 */}
                        {/* {workers.map((worker, index) => ( */}

                        {/* 방법 4) filterStatus에 따라 카드 반환 */}
                        {filteredWorkers.map((worker, index) => (
                            // 상태 받아와서 border색 지정
                            <div key={worker.id} className={`flex-col justify-center items-center border-4 rounded-md w-full bg-white h-full min-w-68 overflow-y-hidden
                                                    ${worker.status === "WARNING" ? "border-red-500" 
                                                      : worker.status === "CAUTION" ? "border-amber-400" : "border-green-400"}`}
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
                                        borderTop: `28px solid ${worker.status === "WARNING" ? "rgb(239, 68, 68)" 
                                                                : worker.status === "CAUTION" ? "rgb(251, 191, 36)" : "rgb(74, 222, 128)"}`, // 삼각형 색상
                                        borderLeft: '28px solid transparent',
                                        borderRight: '0px solid transparent',
                                    }} />

                                    <div>
                                        {/* 상태 받아와서 상태 넣기 */}
                                        <div className={`w-auto mt-5 text-center rounded-full mr-2 px-1.5
                                    ${worker.status === 'WARNING' ? 'bg-red-200 text-red-400'
                                      : worker.status === 'CAUTION' ? 'bg-amber-200 text-amber-400'
                                      : 'bg-green-100 text-green-400'}`}>
                                            {(worker.status.substring(0, 4))}
                                            {/* {worker.status} */}
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-center items-center h-auto m-2'>
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
                <Footer />
            </div>
        </div>
    )
}
