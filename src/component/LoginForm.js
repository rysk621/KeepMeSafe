import React, { useState } from 'react'
import inconusImage from '../assets/image/inconus.png';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
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

        <div className="lg:w-1/2 xl:w-4/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <div className="text-2xl xl:text-3xl font-extrabold">
              Keep Me Safe
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  {/* <div class="bg-white p-2 rounded-full">
                                <svg class="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div> */}
                  <div className="bg-white p-2 rounded-full">
                    <svg className="fill-slate-800 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                  </div>
                  <span className="ml-4">
                    구글 아이디로 로그인
                  </span>
                </button>

                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="fill-slate-800 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M400 480H48c-26.4 0-48-21.6-48-48V80c0-26.4 21.6-48 48-48h352c26.4 0 48 21.6 48 48v352c0 26.4-21.6 48-48 48zM199.6 178.5c0-30.7-17.6-45.1-39.7-45.1-25.8 0-40 19.8-40 44.5v154.8c0 25.8 13.7 45.6 40.5 45.6 21.5 0 39.2-14 39.2-45.6v-41.8l60.6 75.7c12.3 14.9 39 16.8 55.8 0 14.6-15.1 14.8-36.8 4-50.4l-49.1-62.8 40.5-58.7c9.4-13.5 9.5-34.5-5.6-49.1-16.4-15.9-44.6-17.3-61.4 7l-44.8 64.7v-38.8z" />
                    </svg>
                  </div>
                  <span className="ml-4">
                    카카오톡 아이디로 로그인
                  </span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div
                  className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  이메일로 로그인
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email" placeholder="아이디" onChange={handleInputId} />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password" placeholder="비밀번호" onChange={handleInputPw} />
                <button type="button" onClick={() => handleSubmit()}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
