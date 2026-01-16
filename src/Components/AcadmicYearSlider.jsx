import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/bundle';
import { useMediaQuery } from "@mantine/hooks";
import { useState } from 'react';
import PropTypes from 'prop-types';

const AcadmicYearSlider = ({onSlideClick}) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isSmallMobile = useMediaQuery("(max-width: 480px)");
    const [activeSlide, setActiveSlide] = useState("");

    const slides = [
        { id: 1, content: 'First Year'},
        { id: 2, content: 'Second Year'},
        { id: 3, content: 'Third Year'},
        { id: 4, content: 'Fourth Year' },
    ];

    const handleSlideClick = (id) => {
        setActiveSlide(id);
        onSlideClick(id);
    };

    const isAllAcademicYearActive = activeSlide === "";

    return (
        <div className={`w-full flex ${isMobile ? 'flex-col' : 'flex-row'} items-center ${isMobile ? 'gap-4' : 'justify-between gap-12'} ${isSmallMobile ? 'px-3' : isMobile ? 'px-6' : 'px-12'} py-2`}>
            <div
                style={{
                    background: isAllAcademicYearActive 
                        ? 'linear-gradient(to right, #FF637B, #06939C)' 
                        : 'transparent',
                    padding: '2px',
                    borderRadius: '9999px',
                }}
                onClick={() => handleSlideClick("")}
                className={`flex items-center justify-center text-center cursor-pointer ${isMobile ? 'w-full max-w-[300px]' : 'w-56'} ${isMobile ? 'mb-2' : '-mr-6'}`}
            >
                <div
                    style={{
                        backgroundColor: isAllAcademicYearActive ? "white" : "#f8f8f6", 
                        borderRadius: '9999px',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.375rem 0',
                    }}
                    className= {` ${!isAllAcademicYearActive ? 'border border-gray-300' : ''} `}
                >
                    <span
                        className={`font-bold ${isSmallMobile ? 'text-sm' : ''}`}
                        style={isAllAcademicYearActive ? {
                            background: 'linear-gradient(to right, #FF637B, #06939C)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                        } : {
                            color: '#6b7280',
                        }}
                    >
                        All Academic Year
                    </span>
                </div>
            </div>

            <Swiper
                spaceBetween={isSmallMobile ? 10 : 20}
                keyboard={true}
                modules={[Keyboard, Mousewheel, Navigation]}
                className={`flex flex-row ${isMobile ? 'w-full' : ''}`}
                slidesPerView={isSmallMobile ? 1.5 : isMobile ? 2.2 : "auto"}
                breakpoints={{
                    480: {
                        slidesPerView: 5,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4, 
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 4, 
                        spaceBetween: 20,
                    },
                }}
            >
                {slides?.map((slide) => {
                    const isActive = activeSlide === slide.id;
                    
                    return (
                        <SwiperSlide
                            key={slide?.id}
                            style={{
                                background: isActive 
                                    ? 'linear-gradient(to right, #FF637B, #06939C)' 
                                    : 'transparent',
                                padding: isActive ? '2px' : '0',
                                borderRadius: '9999px',
                            }}
                            className="cursor-pointer"
                            onClick={() => handleSlideClick(slide?.id)}
                        >
                            <div
                                style={{
                                    backgroundColor: isActive ? 'white' : 'transparent',
                                    borderRadius: '9999px',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.375rem 0.5rem',
                                }}
                                className={`font-bold ${!isActive ? 'border border-gray-300' : ''} ${isSmallMobile ? 'text-xs' : isMobile ? 'text-sm' : 'text-base'}`}
                            >
                                <span
                                    style={isActive ? {
                                        background: 'linear-gradient(to right, #FF637B, #06939C)',
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                    } : {
                                        color: '#6b7280',
                                    }}
                                >
                                    {slide?.content}
                                </span>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
AcadmicYearSlider.propTypes = {
    onSlideClick: PropTypes.func.isRequired,
};
export default AcadmicYearSlider;