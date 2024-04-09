import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { workerInfo } from '../component/Atom'; // workerInfo는 사용자 정보를 저장하는 Recoil 상태
import { useWebSocket } from '../component/WebSocketHook';

export function UseWebSocketData(wsUrl) {
  // webSocket으로 회원의 log 데이터 받아오기 
  // useWebSocket 훅을 사용하여 웹소켓을 연결하고 데이터 수신
  const { data: webSocketData, error: webSocketError, isConnected } = useWebSocket(wsUrl); // 웹소켓 통신을 위한 훅 사용

  // fetch으로 받아온 작업자의 기본 데이터를 atom 변수에 저장하여 사용
  const [workers, setWorkers] = useRecoilState(workerInfo);

  // webSocket으로 회원의 log데이터 받아오기 
  useEffect(() => {
    if (webSocketData && webSocketData.length > 0) {
      try {
        // webSocket으로 받아온 데이터는 텍스트 형식이므로 json형식으로 변환해서 받기
        const jsonData = JSON.parse(webSocketData);
        console.log("Data From WebSocket:", jsonData);

        // workers 상태를 업데이트합니다.
        const updatedWorkers = workers.map(worker => {
          // webSocket으로 받아온 데이터의 usercode와 workers의 id가 같은 사람을 찾아 해당 사람의 데이터에 접근
          const matchedData = jsonData.find(data => data.usercode === worker.id);
          if (matchedData) {
            
            // workers 데이터에 registerDate 속성을 추가하여 업데이트합니다.
          //   return { ...worker, registerDate: matchedData.registerDate,
          //                       status: matchedData.status,
          //                       heartbeat: matchedData.heartbeat,
          //                       temperature: matchedData.temperature,
          //                       outTemp: matchedData.outTemp,
          //                       latitude: matchedData.latitude,
          //                       longitude: matchedData.longitude};
          // }
          // return worker;

          // 일치하는 데이터가 있으면, 해당 worker의 list 배열에 새로운 로그 데이터를 추가합니다.
          const updatedList = worker.list ? [...worker.list, {
            latitude: matchedData.latitude,
            longitude: matchedData.longitude,
            heartbeat: matchedData.heartbeat,
            temperature: matchedData.temperature,
            outTemp: matchedData.outTemp,
            regidate: matchedData.registerDate,
          }] : [{
            latitude: matchedData.latitude,
            longitude: matchedData.longitude,
            heartbeat: matchedData.heartbeat,
            temperature: matchedData.temperature,
            outTemp: matchedData.outTemp,
            regidate: matchedData.registerDate,
          }];

          return { ...worker, list: updatedList, status: matchedData.status };
        }
        return worker;
        });
        setWorkers(updatedWorkers);
      } catch (error) {
        console.error("Web Socket data parshing Error: ", error)
      }
    }
    // 데이터가 update 될때 마다 useEffect함수 실행
  }, [webSocketData, setWorkers]);
}

