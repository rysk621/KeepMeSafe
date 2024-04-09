import React from 'react';
import MenuBar from './MenuBar';
import AdminMobileButton from './AdminMobileButton';
import AdminDeskMenu from './AdminDeskMenu';

import { useState, useEffect } from 'react';

export default function NavBar({ menuOpen, setMenuOpen }) {

  // props로 받아왔으니 선언하지 않고 받아온 변수로 사용 가능
  // const [menuOpen, setMenuOpen] = useState(false); // 메뉴바 초기 상태를 false로 설정
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // 모바일 화면인지 아닌지를 확인하는 변수

  useEffect(() => {
    const handleResize = () => {
      // const mobile = window.innerWidth <= 768;
      // const mobile = window.innerWidth <= 992;
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      // 모바일 화면에서만 메뉴바 초기 상태를 자동으로 닫힘으로 설정
      if (mobile) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true); // 데스크톱 화면에서는 메뉴를 항상 열린 상태로 유지
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 컴포넌트 마운트 시에도 실행하여 초기 상태 설정

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // SVG 버튼 스타일을 조건부로 설정
  const hamburgerButton = {
    // 이동하는 흐름을 나타냄
    transition: 'transform 0.3s ease',
    // 방법 1)
    // 모바일 모드이고 메뉴가 열렸을 때만 위치 이동 -> 메뉴가 열려있으면 x축으로 160px만큼 밀고 나오기, 그게 아니라면 제자리에 위치
    // transform: isMobile && menuOpen ? 'translateX(230px) md:translateX(0)' : 'translateX(0)',

    // 방법 2)
    // 메뉴가 열렸을 때, 너비 크기가 768px보다 작은 화면일 때는 햄버거 메뉴버튼만 밀려나오게하고 , 
    // 768px보다 큰 화면에서는 worker 컴포넌트에서 햄버거 메뉴버튼과 worker page의 body부분이 동시에 밀려나오게 해놨기 때문에 햄버거 메뉴버튼만 밀려나오지 않게 한다(그 위치에 그대로 있게함)
    transform: menuOpen ? (window.innerWidth < 768 ? 'translateX(230px)' : 'translateX(0)') : 'translateX(0)',
    // transform:  menuOpen ? 'translateX(230px)' : 'translateX(0)',
  };


  return (
    <nav className='flex justify-between items-center h-16 p-5 relative'>
      <svg
        style={hamburgerButton}
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 960 960"
        onClick={handleMenuToggle}>
        <path d="M120 240v80h720v-80H120zm0 200v80h720v-80H120zm0 200v80h720v-80H120z" />
      </svg>
      {menuOpen && <MenuBar />}

      {isMobile ? (
        // 모바일 화면에서 메뉴 토글 버튼 및 MenuBar 표시
        <AdminMobileButton />
      ) : (
        // 데스크탑 화면에서 "마이페이지"와 "로그아웃" 버튼 표시
        <AdminDeskMenu />
      )}
    </nav>
  )
}