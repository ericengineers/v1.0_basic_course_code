import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import Video from '../Video';
import V1 from '../../assets/1.mp4'
import V2 from '../../assets/2.mp4'
import V3 from '../../assets/3.mp4'

// import required modules
export default function VideoSwiper() {
    return (
        <>
            <Swiper
                direction={'vertical'}

                className="mySwiper"
            >
                <SwiperSlide>

                    {({ isActive }) => (
                        isActive && <Video src={V1} />
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({ isActive }) => (
                        isActive && <Video src={V2} />
                    )}
                </SwiperSlide>
                <SwiperSlide>
                {({ isActive }) => (
                        isActive && <Video src={V3} />
                    )}
                </SwiperSlide>

            </Swiper>
        </>
    );
}