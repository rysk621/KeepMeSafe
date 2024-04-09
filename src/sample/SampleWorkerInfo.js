import React, { useEffect, useState } from 'react'
import { SampleWorker } from './SampleWorker'

import LineChartForStatus from '../component/LineChartForStatus'
import NavBar from '../UI/NavBar'

export default function SampleWorkerInfo() {
    // 방법 2) sample worker list만을 담고 있는 컴포넌트를 따로 만들어서 가져와서 사용
    const [sample, setSample] = useState(SampleWorker)
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            {/* worker page에서 메뉴바가 열렸을 때, 화면의 너비가 768px보다 크다면 NavBar과 worker body부분을 동시에 메뉴바 크기만큼 밀려난다 */}
            {/* 데스크 모드일때는 (화면의 너비가 1200px보다 클때는) worker page의 NavBar부분과 Body부분이 MenuBar의 너비인 화면의 1/5를 제외한 4/5만큼을 차지하게 한다 */}
            {/* 반대로 모바일 화면이라 MenuBar가 열리지 않았다면, worker의 NavBar과 Body부분이 화면의 너비를 꽉차게 보이도록 한다 */}
            <div className={`${menuOpen ? 'xl:ml-1/5 md:ml-60' : 'w-full'}`}>
                <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                {/* Sample Data로 테스트 */}
                <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-200 p-3'>
                    {sample && sample.map((s, index) => (
                        <div key={index} className={`flex-col justify-center items-center border-4 rounded-md w-full bg-white 
                                            ${s.status === "위험" ? "border-red-400" : "border-green-400"}`}>
                            <div className='flex justify-start items-center'>
                                <svg className="w-20 h-20 fill-orange-200 m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z" />
                                </svg>
                                {/* 방법 2) sample worker list만을 담고 있는 컴포넌트를 따로 만들어서 가져와서 사용 */}
                                <div className='w-3/4'>
                                    이름 : {s.name} <br />
                                    나이 : {s.age} <br />
                                    직무 : {s.department}
                                </div>
                                <div className={`w-1/4 mt-16 text-center rounded-full mr-2
                                        ${s.status === '위험' ? "bg-red-200 text-red-400" : "bg-green-100 text-green-400"}`}>
                                    {s.status}
                                </div>
                            </div>
                            <div className='flex justify-center items-center h-auto m-2'>
                                <LineChartForStatus />
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}
