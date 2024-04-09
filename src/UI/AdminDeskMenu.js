import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminDeskMenu() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault() // Link의 기본 동작을 방지

        // localStorage에서 accessToken 삭제
        localStorage.removeItem('loginToken');

         // 로그인 페이지로 프로그래매틱 리디렉션
         navigate('/');
    }

    return (
        // 데스크탑 화면에서 "마이페이지"와 "로그아웃" 버튼 표시
        <div>
            <div className='flex w-auto'>
                <div className='flex justify-center items-center hover:bg-slate-200 hover:rounded-md p-2'>
                    <svg className="w-6 h-6 mr-1.5 fill-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                    </svg>
                    <div className='text-nowrap'>마이페이지</div>
                </div>
                <div className='flex justify-center items-center hover:bg-slate-200 hover:rounded-md p-3'>
                    <svg className="w-6 h-6 mr-1.5 fill-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M440-440v-400h80v400h-80Zm40 320q-74 0-139.5-28.5T226-226q-49-49-77.5-114.5T120-480q0-80 33-151t93-123l56 56q-48 40-75 97t-27 121q0 116 82 198t198 82q117 0 198.5-82T760-480q0-64-26.5-121T658-698l56-56q60 52 93 123t33 151q0 74-28.5 139.5t-77 114.5q-48.5 49-114 77.5T480-120Z" />
                    </svg>
                    <button onClick={handleLogout} className='text-nowrap'>로그아웃</button>
                </div>
            </div>
        </div>
    )
}
