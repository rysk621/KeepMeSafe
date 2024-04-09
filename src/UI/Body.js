import React, { useState } from 'react'
import DoughnutChartForCount from '../component/DoughnutChartForCount'
import WorkerList from '../component/WorkerList'
import CautionWorkerList from '../component/CautionWorkerList'
import WarningWorkerList from '../component/WarningWorkerList'
import WarningListBeforeSeperation from '../sample/WarningListBeforeSeperation'
import KakaoMap from '../component/KakaoMap'

import { UseBasicInfoFetchData } from '../component/UseBasicInfoFetchData'
import { UseWebSocketData } from '../component/UseWebSocketData'
import { workerInfo } from '../component/Atom'
import { useRecoilState } from 'recoil'

export default function Body() {

  // const today = new Date()
  // const week = ['일', '월', '화', '수', '목', '금', '토']

  const [workers, setWorkers] = useRecoilState(workerInfo);
  UseBasicInfoFetchData("http://10.125.121.204:8080/worker")
  UseWebSocketData("ws://10.125.121.204:8080/ws/emul")

  const [isCautionModalOpen, setIsCautionModalOpen] = useState(false); // 모달 상태 관리
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false); // 모달 상태 관리

  // 모달을 띄우고 닫는 함수
  const handleCautionModalOpen = () => setIsCautionModalOpen(true);
  const handleWarningModalOpen = () => setIsWarningModalOpen(true);


  const total = workers.length
  const safe = workers.filter(worker => worker.status == "SAFE").length
  const caution = workers.filter(worker => worker.status == "CAUTION").length
  const warning = workers.filter(worker => worker.status == "WARNING").length

  return (
    <div className='bg-slate-200 h-auto p-5'>
      <div className='text-xl font-semibold text-slate-800'>전체 현장 관리</div>
      <div className='flex-col justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2'>
          {/* 전체 등록 인원 */}
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 md:w-full lg:col-span-1 md:col-span-2 sm:col-span-4 mt-3 min-w-52'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-slate-500 font-medium m-3'>전체 등록 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
              </svg>
            </div>
            {/* 데이터에서 가져온 총 인원수 */}
            <div className='flex text-2xl text-slate-500 font-semibold ml-3'>{total}
              <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>명</div>
            </div>
          </div>

          {/* 정상 인원 */}
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 md:w-full lg:col-span-1 md:col-span-2 sm:col-span-4 mt-3 min-w-52'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-slate-500 font-medium m-3'>정상 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z" />
              </svg>
            </div>
            {/* 데이터에서 가져온 정상 인원수 */}
            <div className='flex text-2xl text-slate-500 font-semibold ml-3'>{safe}
              <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>명</div>
            </div>
          </div>

          {/* 위험 의심 인원 */}
          {/* <div className='rounded-md border border-red-400 shadow hover:bg-red-300 bg-red-400 h-24 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-white font-medium m-3'>위험 의심 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-red-400 border rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M800-520q-17 0-28.5-11.5T760-560q0-17 11.5-28.5T800-600q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520Zm-40-120v-200h80v200h-80ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
              </svg>
            </div>
            {/* 데이터에서 가져온 위험의심 인원수 *
            <div className='flex text-2xl text-white font-semibold ml-3'>{caution}
              <div className='text-lg text-white font-medium flex justify-center items-end'>명</div>
            </div>
          </div> */}

          {/* 위험 의심 인원 */}
          <div className='rounded-md shadow hover:bg-amber-300 bg-amber-400 h-24 md:w-full lg:col-span-1 md:col-span-2 sm:col-span-4 mt-3 min-w-52' onClick={handleCautionModalOpen}>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-white font-medium m-3'>위험 의심 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-amber-400 border rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M800-520q-17 0-28.5-11.5T760-560q0-17 11.5-28.5T800-600q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520Zm-40-120v-200h80v200h-80ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
              </svg>
            </div>
            {/* 데이터에서 가져온 위험의심 인원수 */}
            <div className='flex text-2xl text-white font-semibold ml-3'>{caution}
              <div className='text-lg text-white font-medium flex justify-center items-end'>명</div>
            </div>
          </div>
          {isCautionModalOpen && <CautionWorkerList isOpen={isCautionModalOpen} isClose={() => setIsCautionModalOpen(false)} workers={workers} />}

          {/* 위험 인원 */}
          <div className='rounded-md shadow hover:bg-red-300 bg-red-400 h-24 md:w-full lg:col-span-1 md:col-span-2 sm:col-span-4 mt-3 min-w-52' onClick={handleWarningModalOpen}>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-white font-medium m-3'>위험 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-red-400 border rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
              </svg>
            </div>
            {/* 데이터에서 가져온 위험 인원수 */}
            <div className='flex text-2xl text-white font-semibold ml-3'>{warning}
              <div className='text-lg text-white font-medium flex justify-center items-end'>명</div>
            </div>
          </div>
        {isWarningModalOpen && <WarningWorkerList isOpen={isWarningModalOpen} isClose={() => setIsWarningModalOpen(false)} workers={workers} />}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          {/* 작업자 리스트 */}
          <div className='flex-col justify-start items-center rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-auto md:w-full lg:col-span-2 sm:col-span-3 mt-3 min-w-40'>
            <div className='text-lg text-slate-500 font-medium m-3 self-start'>작업자 리스트</div>
            <div className='flex flex-col sm:flex-row justify-center items-center m-3 w-auto'>
              <WorkerList />
            </div>
          </div>

          {/* 현재 현황 */}
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-auto md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
            <div className='text-lg text-slate-500 font-medium m-3'>현재 현황</div>
            <div className='flex justify-center items-center mb-2 lg:h-56 h-72'>
              <DoughnutChartForCount safe={safe} caution={caution} warning={warning} />
              <div className='hidden md:block md:mt-40 p-2 text-md text-slate-400 font-medium text-nowrap lg:hidden'>
                전체인원 : {total} <br />
                정상인원 : {safe} <br />
                위험의심 : {caution} <br />
                위험인원 : {warning} <br />
                <div className='font-semibold mt-2'>{`${(warning / total * 100).toFixed(3)}%`}</div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          {/* 위험 작업자 리스트 */}
          {/* <div className='lg:col-span-1 sm:col-span-3'>
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 mt-3'>
              <div className='text-md text-slate-500 font-medium m-3'>현재 시간</div>
              <div className='flex justify-start items-center'>
                <div className='flex text-2xl text-slate-500 font-semibold ml-3'>{`${today.getHours()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>시</div>
                </div>
                <div className='flex text-2xl text-slate-500 font-semibold ml-1'>{`${today.getMinutes()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>분</div>
                </div>
                <div className='flex text-2xl text-slate-500 font-semibold ml-1'>{`${today.getSeconds()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>초</div>
                </div>
              </div>
            </div>

            {/* 현재 일자 
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
              <div className='text-md text-slate-500 font-medium m-3'>현재 일자</div>
              <div className='flex justify-start items-center'>
                <div className='flex text-2xl text-slate-500 font-semibold ml-3'>{`${today.getFullYear()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>년</div>
                </div>
                <div className='flex text-2xl text-slate-500 font-semibold ml-1'>{`${today.getMonth()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>월</div>
                </div>
                <div className='flex text-2xl text-slate-500 font-semibold ml-1'>{`${today.getDate()}`}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>일</div>
                </div>
                <div className='flex text-xl text-slate-500 font-semibold ml-1'>{week[`${today.getDay()}`]}
                  <div className='text-lg text-slate-500 font-medium flex justify-center items-end'>요일</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* 지도 */}
          <div id="KakaoMap"
            className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-80 lg:col-span-3 sm:col-span-3 mt-3'>
            <KakaoMap />
          </div>
        </div>
      </div>
    </div>
  )
}