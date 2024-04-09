import React, { useState } from 'react';
import NavBar from '../UI/NavBar';
import Footer from '../UI/Footer';

import constructure from '../assets/image/constructure.png'; 
import structure from "../assets/image/structure.png";
import machine from "../assets/image/machine.png";
import collapse from "../assets/image/collapse.png";

export default function SolutionCopy() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(''); // 선택된 아이콘에 따른 이미지 경로 상태

    // 아이콘 클릭 이벤트 핸들러
    const handleIconClick = (imagePath) => {
        setSelectedImage(imagePath);
    };

    return (
        <div>
            <div className={`${menuOpen ? 'xl:ml-1/5 md:ml-60' : 'w-full'}`}>
                <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                {/* 전체 컨테이너를 수직 방향(flex-col)으로 설정 */}
                <div className='flex flex-col justify-center items-center bg-slate-200 p-3 h-auto min-h-screen'>
                    <div className='flex justify-center items-center rounded-full p-2 m-2 bg-slate-500 opacity-40 overflow-hidden'>
                        <div className='text-xl text-white font-bold mr-3'>안전모, 안전대 착용! 작업 전 안전점검(TBM)</div>
                        <div className='text-xl font-extrabold text-amber-500'> 생명을 지킵니다</div>
                    </div>
                    <div className='flex justify-center items-center overflow-hidden'>
                        <div className='text-3xl font-bold mr-3 min-w-96'>건설현장 사망사고 위험요인</div>
                        <div className='text-4xl font-extrabold text-amber-400 min-w-56'>핵심안전수칙</div>
                        <div className='text-3xl font-extrabold min-w-16'>보기</div>
                    </div>
                    {/* 이모지들을 가로 방향으로 배열하는 부분 */}
                    <div className='flex space-x-4 m-5'>
                        <div className='text-xl cursor-pointer hover:underline rounded-full' onClick={() => handleIconClick(constructure)}>전체▼</div>
                        <div className='text-xl cursor-pointer hover:underline' onClick={() => handleIconClick(structure)}>건축 구조물▼</div>
                        <div className='text-xl cursor-pointer hover:underline' onClick={() => handleIconClick(machine)}>기계 장비▼</div>
                        <div className='text-xl cursor-pointer hover:underline' onClick={() => handleIconClick(collapse)}>붕괴 화재▼</div>
                    </div>
                    {/* 선택된 이미지를 표시하는 부분 */}
                    {selectedImage && (
                        <img src={selectedImage} alt="Selected" className="w-auto" />
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}
