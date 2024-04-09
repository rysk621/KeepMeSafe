import { useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { 
    xs: '90%', // 모바일에서는 화면의 90%
    sm: 500, // sm 브레이크포인트에서 너비 500px
    md: 600, // md 브레이크포인트에서 너비 600px
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CautionWorkerList({ isOpen, isClose, workers }) {
  const cautionWorkers = workers.filter(worker => worker.status === "CAUTION");

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          위험 의심 인원
        </Typography>
        <Box sx={{ overflow: 'auto', maxHeight: 300 }}> {/* 내용이 많을 경우 스크롤 가능하도록 설정 */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-2">
            <thead className="text-xs text-gray-700 bg-slate-100 sticky top-0">
              <tr>
                <th scope="col" className="text-center w-24 h-10">
                  작업자 이름
                </th>
                <th scope="col" className="text-center w-24 h-10">
                  부서
                </th>
              </tr>
            </thead>
            <tbody>
              {cautionWorkers.map((worker) => (
                <tr key={worker.id} className="bg-white border-b">
                  <td scope="row" className="text-center w-24 h-10 font-medium text-gray-900 whitespace-nowrap">
                    {worker.workerName}
                  </td>
                  <td className="text-center w-24 h-10">
                    {worker.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Modal>
  );
}
