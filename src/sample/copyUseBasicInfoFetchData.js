import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { workerInfo } from '../component/Atom'; // workerInfo는 사용자 정보를 저장하는 Recoil 상태입니다.

export function UseBasicInfoFetchData(url, logData) {

  // fetch로 받아온 작업자의 기본 데이터를 atom 변수에 저장하여 사용
  const [workers, setWorkers] = useRecoilState(workerInfo);

  // fetch로 작업자의 기본 데이터 받아오기 
  useEffect(() => {
    fetch((url), {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log("결과", data.body);

        // 'data.body' 배열에 접근하여 'map' 함수 적용 
        // (받아온 res중 body부분이 배열-배열의 형태에 대해서만 map함수가 가능)

        // 방법 1) name, age, department를 각각 변수로 받아와서 사용
        // setName(data.body.map(worker => worker.workerName));
        // setAge(data.body.map(worker => worker.age));
        // setDepartment(data.body.map(worker => worker.department));

        // 방법 2) name, age, department를 포함하는 하나의 변수 workers를 이용하여 데이터를 받아와서 사용 
        // setWorkers(data.body)


        // registerDate를 workers 상태에 포함시킵니다.
        // const updatedWorkers = data.body.map(worker => ({
        //   ...worker,
        //   registerDate: worker.registerDate
          
        // }));
        
        // 방법 3) json으로 받아온 데이터(data.body : data의 body부분에 workers의 데이터가 배열로 존재)를 atom변수에 저장하여 사용
        setWorkers(data.body)
      })
      .catch(error => console.error("에러 발생:", error));
  }, [setWorkers])
}