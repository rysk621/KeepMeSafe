import React, { useEffect, useState } from 'react'

import NavBar from '../UI/NavBar'
import WorkerDetail from './WorkerDetail';
import Footer from '../UI/Footer';

export default function Solution() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
            <div className={`${menuOpen ? 'xl:ml-1/5 md:ml-60' : 'w-full'}`}>
                <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                <div className='flex justify-center items-center bg-slate-200 p-3 h-screen'>
                    <div>
                    <svg className='m-auto' style={{ display: "block", shapeRendering: "auto" }} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <g transform="translate(80,50)">
                                <g transform="rotate(0)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="1">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(71.21320343559643,71.21320343559643)">
                                <g transform="rotate(45)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.875">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(50,80)">
                                <g transform="rotate(90)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.75">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(28.786796564403577,71.21320343559643)">
                                <g transform="rotate(135)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.625">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(20,50.00000000000001)">
                                <g transform="rotate(180)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.5">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(28.78679656440357,28.786796564403577)">
                                <g transform="rotate(225)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.375">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(49.99999999999999,20)">
                                <g transform="rotate(270)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.25">
                                        <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
                                    </circle>
                                </g>
                            </g><g transform="translate(71.21320343559643,28.78679656440357)">
                                <g transform="rotate(315)">
                                    <circle cx="0" cy="0" r="6" fill="#ffffff" fill-opacity="0.125">
                                        <animateTransform attributeName="transform" type="scale" begin="0s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
                                    </circle>
                                </g>
                            </g>
                        </svg>
                        <div className='flex-col justify-center items-center'>
                            <div className='text-center text-lg font-semibold'>페이지 이용에 불편을 드려서 죄송합니다.</div>
                            <div className='text-center'>페이지가 만들어지고 있는 중이니, 잠시 후에 다시 이용해주시기 바랍니다.</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
