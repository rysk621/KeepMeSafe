import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuBar() {

  return (
    <div>
      {/* 메뉴바의 z-index 값을 높여서 메뉴바가 다른 컨텐츠보다 항상 앞에 나타나도록 구현 가능 -> 메뉴바의 z-index가 다른 컨텐츠보다 높아야 함*/}
      <div className='fixed left-0 top-0 z-50 w-1/5'>
        <div className='flex flex-col justify-between h-screen w-full min-w-60 bg-slate-800'>
          <div>
            <div className='flex justify-between items-center'>
              <Link to="/home" className='text-3xl text-slate-100 font-extrabold ml-5 mt-5'>KMS</Link>
            </div>
            <div className='text-xl text-slate-100 opacity-50 font-medium ml-5'>Keep me safe</div>
            <div className='text-xl text-slate-100 opacity-50 font-medium m-5 mt-12'>관리자 메뉴</div>
            {/* <div className='text-xl text-slate-100 opacity-50 font-medium ml-5 mb-3 hover:text-white hover:opacity-100'>👤 회원관리</div> */}
            <Link to="/worker" className='flex items-center text-xl text-slate-100 opacity-50 font-medium ml-5 hover:text-white hover:opacity-100'>
              <svg className="w-6 h-6 mr-2 fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <div>회원관리</div>
            </Link>
            {/* <Link to="/solution" className='flex text-xl text-slate-100 opacity-50 font-medium ml-5 mt-3 hover:text-white hover:opacity-100'> */}
            <Link to="/solution" className='flex text-xl text-slate-100 opacity-50 font-medium ml-5 mt-3 hover:text-white hover:opacity-100'>
              <svg className="w-6 h-7 mr-2 fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M96 0C60.7 0 32 28.7 32 64V288H144c6.1 0 11.6 3.4 14.3 8.8L176 332.2l49.7-99.4c2.7-5.4 8.3-8.8 14.3-8.8s11.6 3.4 14.3 8.8L281.9 288H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-6.1 0-11.6-3.4-14.3-8.8L240 275.8l-49.7 99.4c-2.7 5.4-8.3 8.8-14.3 8.8s-11.6-3.4-14.3-8.8L134.1 320H32V448c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V160H288c-17.7 0-32-14.3-32-32V0H96zM288 0V128H416L288 0z" />
              </svg>
              <div>솔루션</div>
            </Link>
          </div>
          <div className='text-sm text-slate-400 mb-3 ml-5 opacity-50 text-nowrap truncate'>
            부산 금정구 부산대학교 <br /> K-digital 5기  <br /> 김수정, 이지원, 윤석현
          </div>
        </div>
      </div>
    </div>
  )
}
