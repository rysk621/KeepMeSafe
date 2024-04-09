import React, { useState } from 'react'
import inconusImage from '../assets/image/inconus.png';
import { useNavigate } from 'react-router-dom';

export default function LoginForm2() {
  // 로그인 시 입력되는 아이디와 비밀번호를 위한 변수 선언
  const [inputId, setInputId] = useState("")
  const [inputPw, setInputPw] = useState("")

  // 입력 받은 현재 아이디를 변수에 저장
  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  // 입력 받은 현재 비밀번호를 변수에 저장
  const handleInputPw = (e) => {
    setInputPw(e.target.value)
  }

  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log("id:", inputId, "pw:", inputPw)

    // 빈칸인지 확인
    if (inputId.trim() === "" || inputPw.trim() === "") {
      alert("아이디와 비밀번호를 제대로 입력해주세요")
      return
    }

    fetch("http://10.125.121.204:8080/login", {
      method: "POST",
      body: JSON.stringify({
        id: inputId,
        password: inputPw
      })
    })
      .then((res) => {
        // 로그인 성공 시 메인 홈 페이지로 이동
        if (res.ok) {
          const accessToken = res.headers.get("Authorization")
          // console.log(accessToken)

          // 로그인 시 해당 관리자의 토큰을 localStorage에 저장
          localStorage.setItem('loginToken', accessToken);

          navigate("/home")
        }
        else {
          alert("아이디와 비밀번호가 다릅니다")
        }
      })
      .catch(err => console.error("에러:", err))
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

        {/* 사진이 오른쪽에 위치 */}
        <div className="flex-1 relative hidden lg:flex w-full bg-cover bg-center bg-no-repeat bg-[url('./assets/image/watchBg.jpg')]">
          <img src={inconusImage} alt="Inconus" style={{ width: "auto", height: "28px" }} className='absolute bottom-2 left-2 text-end align-text-bottom' />
          <p className='absolute bottom-2 right-2 text-end align-text-bottom text-gray-400 opacity-50'>
            부산 해운대구 센텀동로 71 709호 | T.051.744.7844 | F.051.744.7845 <br />
            Copyright 2022. KANGNAM & INCONUS inc. all rights reserved.
          </p>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="p-6">
            <div className='flex justify-center items-center'>
            <svg className='w-8 h-9 fill-blue-300 mr-2'  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M256 32c-17.7 0-32 14.3-32 32v2.3 99.6c0 5.6-4.5 10.1-10.1 10.1c-3.6 0-7-1.9-8.8-5.1L157.1 87C83 123.5 32 199.8 32 288v64H544l0-66.4c-.9-87.2-51.7-162.4-125.1-198.6l-48 83.9c-1.8 3.2-5.2 5.1-8.8 5.1c-5.6 0-10.1-4.5-10.1-10.1V66.3 64c0-17.7-14.3-32-32-32H256zM16.6 384C7.4 384 0 391.4 0 400.6c0 4.7 2 9.2 5.8 11.9C27.5 428.4 111.8 480 288 480s260.5-51.6 282.2-67.5c3.8-2.8 5.8-7.2 5.8-11.9c0-9.2-7.4-16.6-16.6-16.6H16.6z"/>
            </svg>
              <div className="text-2xl xl:text-3xl font-extrabold text-center">Keep Me Safe</div>
            </div>
            <div className="mx-auto max-w-xs mt-8">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email" placeholder="아이디" onChange={handleInputId} />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password" placeholder="비밀번호" onChange={handleInputPw} />
              <button type="button" onClick={() => handleSubmit()}
                className="mt-5 tracking-wide font-semibold bg-blue-400 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg className="fill-white w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
                <div className="ml-3">
                  로그인
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 사진이 왼쪽에 위치 */}
        {/* <div className="flex-1 relative hidden lg:flex w-full bg-cover bg-center bg-no-repeat bg-[url('./assets/image/watchBg.jpg')]">
          <img src={inconusImage} alt="Inconus" style={{ width: "auto", height: "28px" }} className='absolute bottom-2 left-2 text-end align-text-bottom' />
          <p className='absolute bottom-2 right-2 text-end align-text-bottom text-gray-500'>
            부산 해운대구 센텀동로 71 709호 | T.051.744.7844 | F.051.744.7845 <br />
            Copyright 2022. KANGNAM & INCONUS inc. all rights reserved.
          </p>
        </div> */}

      </div>
    </div>
  )
}
  