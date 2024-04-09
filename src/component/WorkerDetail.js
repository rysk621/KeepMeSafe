import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import LineChartForHeartBeat from './LineChartForHeartBeat';
import LineChartForTemp from './LineChartForTemp';
// import TextField from '@mui/material/TextField';

// (({theme}) => {...}) 함수를 사용하여 스타일 정의
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { // dialog의 내용 부분을 감싸는 컨테이너의 기본 클라스
        padding: theme.spacing(2), // padding 설정
    },
    '& .MuiDialogActions-root': { // action버튼이 있는 부분을 감싸는 컨테이너의 기본 클라스
        padding: theme.spacing(1), // padding 설정
    },
}));

export default function WorkerDetail({ worker, historyData, open, handleClose }) {
    //   const [open, setOpen] = React.useState(false);

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            <BootstrapDialog

                onClose={handleClose}
                aria-labelledby="workerDetailInfo"
                open={open}

                maxWidth="md" // 모달의 최대 너비를 'md'로 설정
                fullWidth={true} // 모달의 너비를 화면 폭에 맞춤
                sx={{
                    '& .MuiDialog-paper': { // Dialog의 내부 paper 요소에 스타일 적용
                        width: '80%', // 모달의 너비
                        maxHeight: '80vh', // 모달의 최대 높이
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="workerName">
                    <div className='flex justify-start items-center text-xl'>
                        {worker.workerName}

                        {/* 상태 받아와서 상태 넣기 */}
                        <div className={`w-auto text-center rounded-full ml-2 px-1.5 text-lg
                                    ${worker.status === 'WARNING' ? 'bg-red-200 text-red-400'
                                    : worker.status === 'CAUTION' ? 'bg-amber-200 text-amber-400'
                                    : 'bg-green-100 text-green-400'}`}>
                            {/* {(worker.status.substring(0, 4))} */}
                            {worker.status}
                        </div>
                    </div>

                </DialogTitle>
                <IconButton
                    aria-label="closeButton"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers >
                    <Typography gutterBottom component="div" className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                        <div className='border-r-2 mr-3 text-lg'>나이 : {worker.year}</div>
                        <div className='border-r-2 mr-3 text-lg'>직무 : {worker.department}</div>
                        <div className='text-lg border-r-2 mr-3 lg:border-none'>직급 : {worker.role}</div>
                    </Typography>
                    <Typography gutterBottom component="div" className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                        <div className='flex justify-start items-center border-r-2 mr-3 text-lg'>현재 심박수 : <div className='text-red-400 ml-2'>{worker.list[worker.list.length - 1].heartbeat}</div></div>
                        <div className='flex justify-start items-center border-r-2 mr-3 text-lg'>현재 체온 : <div className='text-sky-400 ml-2'>{worker.list[worker.list.length - 1].temperature}</div></div>
                        <div className='flex justify-start items-center text-lg border-r-2 mr-3 lg:border-none'>외부온도 : <div className='text-lime-600 ml-2'>{worker.list[worker.list.length - 1].outTemp}</div></div>
                    </Typography>
                    <Typography gutterBottom style={{ marginTop: '20px' }}>
                        <LineChartForHeartBeat worker={worker} />
                        <LineChartForTemp worker={worker} />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        닫기
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}