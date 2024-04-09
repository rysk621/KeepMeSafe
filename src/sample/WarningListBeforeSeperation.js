import React, { useState, useEffect } from 'react'
import { RecoilState, useRecoilState, useResetRecoilState } from 'recoil';
import { useWebSocket } from '../component/WebSocketHook'; // useWebSocket 훅 임포트
import { workerInfo } from '../component/Atom';

// import { SampleWorker } from '../sample/SampleWorker'

export default function WarningListBeforeSeperation() {

    // webSocket으로 회원의 log 데이터 받아오기 
    // useWebSocket 훅을 사용하여 웹소켓을 연결하고 데이터를 수신하면 data상태를 업데이트하고 해당 데이터를 recoil 상태인 workerLog변수에 저장
    const { data: webSocketData, error: webSocketError, isConnected } = useWebSocket('ws://10.125.121.204:8080/ws/emul'); // 웹소켓 통신을 위한 훅 사용

    // 데이터 사용 방법 3) 받아온 데이터를 atom 변수에 저장하여 사용
    const [workers, setWorkers] = useRecoilState(workerInfo);

    // webSocket으로 회원의 log데이터 받아오기 
    useEffect(() => {
        if (webSocketData && webSocketData.length > 0) {
            // webSocket으로 받아온 데이터는 텍스트 형식이므로 json형식으로 변환해서 받기
            const jsonData = JSON.parse(webSocketData);
            console.log("WebSocket으로 받은 데이터:", jsonData);
            
            // workers 상태를 업데이트합니다.
            const updatedWorkers = workers.map(worker => {
                // webSocket으로 받아온 데이터의 usercode와 workers의 id가 같은 사람을 찾아 해당 사람의 데이터에 접근
                const matchedData = jsonData.find(data => data.usercode === worker.id);
                if (matchedData) {
                    // workers 데이터에 registerDate 속성을 추가하여 업데이트합니다.
                    return { ...worker, registerDate: matchedData.registerDate };
                }
                return worker;
            });
            setWorkers(updatedWorkers);
        }
        // 데이터가 update 될때 마다 useEffect함수 실행
    }, [webSocketData, setWorkers]);

    // fetch로 작업자의 기본 데이터 받아오기 
    useEffect(() => {
        fetch('http://10.125.121.204:8080/worker', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log("결과", data);

                // 'data.body' 배열에 접근하여 'map' 함수 적용 
                // (받아온 res중 body부분이 배열-배열의 형태에 대해서만 map함수가 가능)

                // 방법 1) name, age, department를 각각 변수로 받아와서 사용
                // setName(data.body.map(worker => worker.workerName));
                // setAge(data.body.map(worker => worker.age));
                // setDepartment(data.body.map(worker => worker.department));

                // 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용 
                // setWorkers(data.body)

                // registerDate를 workers 상태에 포함시킵니다.
                const updatedWorkers = data.body.map(worker => ({
                    ...worker,
                    registerDate: worker.registerDate
                }));
                // 방법 3) json으로 받아온 데이터(data.body : data의 body부분에 workers의 데이터가 배열로 존재)를 atom변수에 저장하여 사용
                setWorkers(data.body)
            })
            .catch(error => console.error("에러 발생:", error));
    }, [setWorkers])

    // 데이터 사용 방법 2) sample worker list만을 담고 있는 컴포넌트를 따로 만들어서 가져와서 사용
    // SampleData에서 sampleList를 꺼내 쓰기 위해서 (props를 안쓰는 이유? 정적이기 때문에, 데이터가 바뀌지 않아서)
    // const [sample, setSemple] = useState(SampleWorker)

    // 데이터 사용 방법 1) 컴포넌트 내에서 직접 데이터 생성 및 사용
    // const sampleList = [
    //     {
    //         name: '이지원',
    //         department: "전기공",
    //         status: "위험"
    //     },
    //     {
    //         name: '윤석현',
    //         department: "목수",
    //         status: "안전"
    //     },
    //     {
    //         name: '김수정',
    //         department: "철근공",
    //         status: "위험"
    //     },
    //     {
    //         name: '허선행',
    //         department: "콘크리트공",
    //         status: "안전"
    //     },
    //     {
    //         name: '이지연',
    //         department: "배관공",
    //         status: "위험"
    //     },
    //     {
    //         name: '강태규',
    //         department: "철근공",
    //         status: "안전"
    //     },
    //     {
    //         name: '박상민',
    //         department: "전기공",
    //         status: "위험"
    //     },
    //     {
    //         name: '문형호',
    //         department: "목수",
    //         status: "안전"
    //     },
    //     {
    //         name: '옥지현',
    //         department: "콘크리트공",
    //         status: "위험"
    //     }
    // ]

    // 상태에 대한 정렬 (default는 ALL - 'ALL', 'CAUTION', 'SAFE')
    const [statusSortOrder, setStatusSortOrder] = useState("ALL")

    // 상태 헤더 클릭 이벤트 핸들러
    const handleSortByStatus = () => {
        setStatusSortOrder(prevOrder => {
            if (prevOrder === 'ALL') return 'CAUTION'; // 정렬 순서 all -> caution
            if (prevOrder === 'CAUTION') return 'SAFE'; // 정렬 순서 caution -> safe
            return 'ALL'; // 'SAFE' 다음은 'ALL'로 순환 : 정렬 순서 safe -> all
        });
    };

    // Sort 방법 1) workers 배열 복사 및 조건에 따라 정렬
    // const sortedWorkers = 
    //     [...workers].filter(worker =>  // [...workers]: 이는 workers 배열의 복사본을 생성 - 원본 배열의 수정을 막기 위함
    //                     sortOrder === "ALL" || worker.status === sortOrder) // sortOrder가 'ALL'일 경우 모든 workers 요소를 포함시키고, 그렇지 않을 경우 sortOrder와 일치하는 status를 가진 workers 요소만 포함
    //                             .sort((a, b) => { // 배열의 요소 정렬 : 두 요소 a,b를 비교하여 정렬 순서 결정
    //                                 return 0 // 비교 함수에서 return 0 = a와 b사이에 순서 변경 X -> filter된 결과에서 추가적으로 정렬 하지 않음(a가 b보다 앞에 위치 : 음수, b가 a보다 앞에 위치 : 양수 반환)
    //                             })

    // Sort 방법 2) 정렬 로직: CAUTION 우선 혹은 SAFE 우선
    const sortedWorkers = [...workers].sort((a, b) => {
        if (a.status === b.status) return 0; // 상태가 같으면 순서 변경 없음

        if (statusSortOrder === "CAUTION") {
            return a.status === "CAUTION" ? -1 : 1; // CAUTION 상태가 우선
        } else if (statusSortOrder === "SAFE") {
            return a.status === "SAFE" ? -1 : 1; // SAFE 상태가 우선
        }else return 0; // 기본 상태(정렬 순서가 설정되지 않음)
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2 max-h-52 w-full">
            <div className='max-h-52'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 bg-slate-100 sticky top-0">
                        <tr>
                            <th scope="col" className="text-center w-24 h-10">
                                작업자 이름
                            </th>
                            <th scope="col" className="text-center w-24 h-10">
                                부서
                            </th>
                            <th scope="col" className="text-center w-24 h-10 hover:underline" onClick={handleSortByStatus}>
                                상태 ▼ <br /> {statusSortOrder === "CAUTION" ? "(CAUTION 우선)" : statusSortOrder === "SAFE" ? "(SAFE 우선)" : ""}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 방법 2) 타 컴포넌트에 정의된 데이터를 가져와 변수 sample에 저장 후 사용 */}
                        {/* {sample && sample.map((s, index) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="text-center w-24 h-10 font-medium text-gray-900 whitespace-nowrap">
                                    {s.name}
                                </th>
                                <td className="text-center w-24 h-10">
                                    {s.department}
                                </td>
                                <td className="flex justify-center items-center w-full h-10">
                                    <div className={`w-10 h-6 flex justify-center items-center rounded-full text-center font-medium 
                                                    ${s.status === '위험' ? 'bg-red-200 text-red-400' : 'bg-green-100 text-green-400'}`}>
                                        {s.status}
                                    </div>
                                </td>
                            </tr>
                        ))} */}

                        {/* 방법 3) recoil 변수에 저장된 데이터를 사용 */}
                        {/* {workers[0].map((worker, index) => ( */}
                        {sortedWorkers.map((worker, index) => (
                            <tr key={worker.id} className="bg-white border-b">
                                <th scope="row" className="text-center w-24 h-10 font-medium text-gray-900 whitespace-nowrap">
                                    {worker.workerName}
                                </th>
                                <td className="text-center w-24 h-10">
                                    {worker.department}
                                </td>
                                <td className="flex justify-center items-center w-full h-10">
                                    <div className={`px-1.5 w-auto h-6 flex justify-center items-center rounded-full text-center font-medium 
                                                    ${worker.status === 'CAUTION' ? 'bg-red-200 text-red-400' : 'bg-green-100 text-green-400'}`}>
                                        {worker.registerDate}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
