import React, { useState } from 'react'

import NavBar from './NavBar'
import Body from './Body'
import Footer from './Footer'

export default function DashBoard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex justify-end static'>
      {/* NavBar에서 MenuBar을 동시에 표시하게 수정 */}
      {/* <MenuBar /> */}

      {/* 데스크 모드에서 메뉴가 열렸으면 width를 4/5만큼, 메뉴가 닫혔으면 width를 full로 준다 */}
      {/* 방법 1) */}
      {/* <div className={`flex-col justify-start items-center h-screen ${menuOpen ? 'lg:w-4/5' : 'lg:w-full'} w-full `}> */}

      {/* 방법 2) */}
      {/* MenuBar가 열렸을 때, 화면 너비가 768px 이상이라면 NavBar와 Body를 같이 MenuBar 너비만큼 밀려나오게 하고 */}
      {/* 화면 너비가 클때는 (992px 이상이라면) MenuBar 너비가 화면의 1/5로 고정이니 NavBar와 Body의 너비를 화면의 나머지인 4/5만큼 차지하게 한다 */}
      {/* 반대로 모바일 화면이라 MenuBar가 열리지 않았을 때는 NavBar과 Body가 전체 너비를 차지하도록 한다*/}
      <div className={`flex-col justify-start items-center h-screen ${menuOpen ? 'lg:w-4/5 md:ml-60' : 'lg:w-full'} w-full`}>
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Body />
        <Footer />
      </div>
    </div>
  )
}
