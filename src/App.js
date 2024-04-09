import DashBoard from "./UI/DashBoard";
import Login from "./component/Login";
import WorkerInfo from "./component/WorkerInfo";
// import OriginHome from "./sample/OriginHome";

import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { useState } from "react";
import Solution from "./component/Solution";

import SolutionCopy from "./component/Solution copy";

// 보호된 라우트 컴포넌트
// children은 React에서 부모 컴포넌트가 자식 컴포넌트를 전달할 때 사용하는 특별한 prop
function PrivateRoute({ children }) {
  const token = localStorage.getItem('loginToken');
  
  // 로그인 토큰이 없으면 로그인 페이지로 리디렉션
  if (!token) {
    alert("해당 페이지 접근 권한이 없습니다. \n로그인 페이지로 이동합니다.")
    return <Navigate to="/" replace />;
  }

  // 로그인 토큰이 있으면 요청한 페이지를 그대로 렌더링
  return children;
}

function App() {
  return (
    // Recoil 초기 연동 : RecoilRoot
    <RecoilRoot>
    {/* <OriginHome /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path='/home' element={<DashBoard />} />
          <Route path="/worker" element={<WorkerInfo />} /> */}

          {/* 권한이 있을 경우 페이지 라우팅이 되도록 PrivateRoute사용 */}
          <Route path="/" element={<Login />} />
          <Route path='/home' element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/worker" element={<PrivateRoute><WorkerInfo /></PrivateRoute>} />
          <Route path="/solution" element={<PrivateRoute><Solution /></PrivateRoute>} />

          
          <Route path="/s" element={<PrivateRoute><SolutionCopy /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

// // PrivateRoute 컴포넌트에서 children 대신 component prop을 사용하여 자식 컴포넌트를 전달 : 보호된 라우트 컴포넌트에서 `component` prop을 사용

// function PrivateRoute({ component: Component }) {
//   const token = localStorage.getItem('loginToken');
  
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   // `Component`를 사용하여 자식 컴포넌트를 렌더링
//   return <Component />;
// }

// // 사용 예시
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path='/home' element={<PrivateRoute component={Home} />} />
//         <Route path="/worker" element={<PrivateRoute component={WorkerInfo} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
