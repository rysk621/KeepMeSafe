// recoil에서 상태를 정의
// 컴포넌트에서 구독과 업데이트가 가능하며 atom의 값이 변경될 시 구독하고 있는 컴포넌트가 리렌더링 됩니다.

import { atom } from "recoil";

export const workerInfo = atom({
    key : "workerInfo",
    default : []
})
