import React from 'react'

export default function OriginHome() {
  return (
    <div className='flex justify-center items-center'>
      <div className='bg-slate-800 h-screen w-1/5 min-w-40 flex flex-col justify-between flex-shrink'>
        <div>
          <div className='text-3xl text-slate-100 font-extrabold ml-5 mt-5'>KMS</div>
          <div className='text-xl text-slate-100 opacity-50 font-medium ml-5'>Keep me safe</div>
          <div className='text-xl text-slate-100 opacity-50 font-medium m-5 mt-12'>관리자 메뉴</div>
          <div className='text-xl text-slate-100 opacity-50 font-medium ml-5 mb-3 hover:text-white hover:opacity-100'>👤 회원관리</div>
          <div className='text-xl text-slate-100 opacity-50 font-medium ml-5 hover:text-white hover:opacity-100'>🔎 솔루션</div>
        </div>
        <div className='text-sm text-slate-400 self-end mr-32 mb-3 opacity-50'>
          부산 금정구 부산대학교 <br /> K-digital 5기  <br /> 김수정, 이지원, 윤석현
        </div>
      </div>
      {/* 수정 1  overflow-y-auto */}
      <div className='flex-col justify-start items-center h-auto w-4/5 overflow-y-auto'>
        <nav className='flex justify-end items-center h-1/10 p-5'>
          <div className='text-xl font-semibold text-slate-800 text-center mr-3 hover:underline'>Login</div>
          <div className='text-xl font-semibold text-slate-800 text-center hover:underline'>Sign up</div>
        </nav>

        <body className='bg-slate-200 h-8/10 p-5'>
          <div className='text-xl font-semibold text-slate-800'>전체 현장 관리</div>
          <div className='flex-col justify-center items-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
              <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 md:col-span-2 sm:col-span-3 mt-3 mr-3'>
                <div className='flex justify-between items-center'>
                  <div className='text-lg text-slate-500 font-medium m-3'>전체 등록 인원</div>
                  <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                  </svg>
                </div>
                {/* 데이터에서 총인원수 여기다 넣기 */}
                <div className='text-2xl text-slate-500 font-semibold ml-3'>105명</div>
              </div>
              <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 md:col-span-2 sm:col-span-3 mt-3 mr-3'>
                <div className='flex justify-between items-center'>
                  <div className='text-lg text-slate-500 font-medium m-3'>정상 인원</div>
                  <svg className="mr-3 p-1 w-9 h-9 fill-white border rounded-full bg-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M702-480 560-622l57-56 85 85 170-170 56 57-226 226Zm-342 0q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 260Zm0-340Z" />
                  </svg>
                </div>
                {/* 데이터에서 정상인원수 여기다 넣기 */}
                <div className='text-2xl text-slate-500 font-semibold ml-3'>100명</div>
              </div>
              <div className='rounded-md border border-red-400 shadow hover:bg-red-300 bg-red-400 h-24 w-full lg:col-span-1 md:col-span-2 sm:col-span-3 mt-3'>
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

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
              <div className='flex-col justify-center items-center rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-44 mt-3 mr-3 w-full lg:col-span-2 md:col-span-2 sm:col-span-3'>
                <div className='text-lg text-slate-500 font-medium m-3'>현재 현황</div>
                <div className='flex justify-center items-center'>
                  <div className='bg-slate-100 h-28 w-32'>
                    <div className='text-lg text-slate-700 text-center font-medium m-3'>전체 인원</div>
                    {/* 데이터에서 정상인원수 여기다 넣기 */}
                    <div className='text-2xl text-slate-700 text-center font-semibold m-3'>105명</div>
                  </div>
                  <div className='bg-slate-100 h-28 w-32'>
                    <div className='text-lg text-slate-700 text-center font-medium m-3'>위험 인원</div>
                    {/* 데이터에서 위험의심인원수 여기다 넣기 */}
                    <div className='text-2xl text-slate-700 text-center font-semibold m-3'>5명</div>
                  </div>
                  <div className='rounded-md border-black border-2 h-28 w-36 ml-5'>원형 차트 넣기</div>
                  <div className='mt-20 ml-2 text-sm font-medium'>위험인원 / 전체인원 %</div>
                </div>
              </div>
              <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-44 w-full lg:col-span-1 md:col-span-2 sm:col-span-3 mt-3'>그래프 넣기</div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
              <div className='flex-col justify-center items-center'>
                <div div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 md:col-span-3 sm:col-span-3 mt-3'>
                  <div className='text-md text-slate-500 font-medium m-3'>위험 작업자 리스트</div>
                  <div className='text-base text-slate-500 font-semibold m-3'>회원 이상자 목록</div>
                </div>
                <div div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-24 w-full lg:col-span-1 md:col-span-3 sm:col-span-3 mt-1'>
                  <div className='text-md text-slate-500 font-medium m-3'>외부 날씨</div>
                  {/* 데이터에서 외부온도 여기다 넣기 */}
                  <div className='text-2xl text-slate-500 font-semibold m-3'>10'</div>
                </div>
              </div>
              <div className='rounded-md border border-gray-200 shadow bg-white hover:bg-gray-100 h-48 w-full lg:col-span-2 md:col-span-2 sm:col-span-3 mt-3'>지도 넣기</div>
            </div>
          </div>
        </body>

        <footer className='bg-slate-300 h-1/10 p-3'>
          <div className='text-slate-500 text-sm'>Keep Me Safe</div>
          <div className='mt-2 text-slate-500 text-sm'>© 2024 Kangnam & Inconus, Inc. All Rights Reserved.</div>
        </footer>
      </div>
    </div>
  )
}
