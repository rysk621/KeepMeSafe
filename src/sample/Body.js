import React from 'react'

import DoughnutChart from '../component/DoughnutChart'

export default function Body() {
  return (
    <div className='bg-slate-200 h-auto p-5'>
      <div className='text-xl font-semibold text-slate-800'>전체 현장 관리</div>
      <div className='flex-col justify-center items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-slate-500 font-medium m-3'>전체 등록 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
              </svg>
            </div>
            {/* 데이터에서 총인원수 여기다 넣기 */}
            <div className='text-2xl text-slate-500 font-semibold ml-3'>105명</div>
          </div>
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-slate-500 font-medium m-3'>정상 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z" />
              </svg>
            </div>
            {/* 데이터에서 정상인원수 여기다 넣기 */}
            <div className='text-2xl text-slate-500 font-semibold ml-3'>100명</div>
          </div>
          <div className='rounded-md border border-red-400 shadow hover:bg-red-300 bg-red-400 h-24 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>
            <div className='flex justify-between items-center'>
              <div className='text-lg text-white font-medium m-3'>위험 의심 인원</div>
              <svg className="mr-3 p-1 w-9 h-9 fill-red-400 border rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M800-520q-17 0-28.5-11.5T760-560q0-17 11.5-28.5T800-600q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520Zm-40-120v-200h80v200h-80ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
              </svg>
            </div>
            {/* 데이터에서 위험의심인원수 여기다 넣기 */}
            <div className='text-2xl text-white font-semibold ml-3'>5명</div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <div className='flex-col justify-start items-center rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-auto md:w-full lg:col-span-2 sm:col-span-3 mt-3 min-w-40'>
            <div className='text-lg text-slate-500 font-medium m-3 self-start'>현재 현황</div>
            <div className='flex flex-col sm:flex-row justify-center items-center m-3 w-auto'>
              <div className='flex justify-center items-center bg-slate-100 w-full ml-3'>
                <div className='flex flex-col justify-center items-center h-36 min-w-32'>
                  <div className='text-lg text-slate-700 text-center font-medium'>전체 인원</div>
                  {/* 데이터에서 전체인원수 여기다 넣기  */}
                  <div className='text-2xl text-slate-700 text-center font-semibold'>105명</div>
                </div>
              </div>
              <div className='flex justify-center items-center bg-slate-100 w-full sm:mr-3 mt-3 sm:mt-0'>
                <div className='flex flex-col justify-center items-center h-36 w-36 min-w-36'>
                  <div className='text-lg text-slate-700 text-center font-medium'>위험 인원</div>
                  {/* 데이터에서 위험의심인원수 여기다 넣기  */}
                  <div className='text-2xl text-slate-700 text-center font-semibold'>5명</div>
                </div>
              </div>

              {/* <div className='flex-col justify-center items-center bg-slate-100 h-32 w-28 ml-3 sm:w-full min-w-28'>
                <div className='text-lg text-slate-700 text-center font-medium m-3'>전체 인원</div>
                {/* 데이터에서 전체인원수 여기다 넣기 
                <div className='text-2xl text-slate-700 text-center font-semibold m-3'>105명</div>
              </div> */}
              {/* <div className='bg-slate-100 h-32 w-28 sm:w-full min-w-28 mr-3'>
                <div className='text-lg text-slate-700 text-center font-medium m-3'>위험 인원</div>
                {/* 데이터에서 위험의심인원수 여기다 넣기 
                <div className='text-2xl text-slate-700 text-center font-semibold m-3'>5명</div>
              </div> */}

              <div className='hidden lg:flex justify-center items-center border-2 border-black'>
                <DoughnutChart />
                <div className='mt-36 ml-2 text-sm font-medium text-nowrap'>0.048 %</div>
              </div>
            </div>
          </div>
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-44 md:w-full lg:col-span-1 sm:col-span-3 mt-3'>그래프 넣기</div>
        </div>

        {/* <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <div className='flex-col justify-center items-center'>
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 sm:col-span-3 mt-3'>
              <div className='text-md text-slate-500 font-medium m-3'>위험 작업자 리스트</div>
              <div className='text-base text-slate-500 font-semibold m-3'>회원 이상자 목록</div>
            </div>
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 sm:col-span-3 mt-1'>
              <div className='text-md text-slate-500 font-medium m-3'>외부 날씨</div>
               데이터에서 외부온도 여기다 넣기  
              <div className='text-2xl text-slate-500 font-semibold m-3'>10'</div>
            </div>
          </div>
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-48 w-full lg:col-span-2 sm:col-span-3 mt-3'>지도 넣기</div>
        </div> */}

        {/* 위 코드에서 div로 감싸면 gap이 한 번 더 먹어 화면이 줄어들때 너비가 안맞는 부분을 수정 */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          {/* 위험 작업자 리스트 */}
          <div className='lg:col-span-1 sm:col-span-3'>
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 mt-3'>
              <div className='text-md text-slate-500 font-medium m-3'>위험 작업자 리스트</div>
              <div className='text-base text-slate-500 font-semibold m-3'>회원 이상자 목록</div>
            </div>

            {/* 외부 날씨 */}
            <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 mt-1'>
              <div className='text-md text-slate-500 font-medium m-3'>외부 날씨</div>
              {/* 데이터에서 외부온도 여기다 넣기   */}
              <div className='text-2xl text-slate-500 font-semibold m-3'>10'</div>
            </div>
          </div>

          {/* 지도 */}
          <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-48 lg:col-span-2 sm:col-span-3 mt-3'>지도 넣기</div>
        </div>
      </div>
    </div>
  )
}