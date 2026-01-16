import { useState } from 'react';
import { Button, Stepper } from '@mantine/core';
import Lottie from 'lottie-react';
import CourseForm from './CourseForm'; 
import DetailsForm from './DetailsForm';
import SelectSubject from './SelectSubject';
import AddedJson from "./AddJson.json";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

const StepperForm = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0); 
    const[subjectID, setSubjectID] = useState(null);
    const[subjectTitle, setSubjectTitle] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isSmallMobile = useMediaQuery('(max-width: 480px)');

    return (
        <section className={`py-8 ${isMobile ? 'px-1' : 'px-0'}`}>
            <div className={`w-full ${isMobile ? 'max-w-md p-4'  : 'max-w-9xl py-4'} mx-auto bg-white rounded-lg shadow-none`}>
                <Stepper 
                    active={active} 
                    allowNextStepsSelect={false} 
                    color="#023336"
                    className={`${isMobile ? 'px-1' : 'px-8'}`}
                    size={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
                >
                    <Stepper.Step label="First step" description="Select Academic Year & Semester ">
                        <DetailsForm setActive={setActive} />
                    </Stepper.Step>

                    <Stepper.Step label="Second step" description="Select Subject">
                        <SelectSubject setActive={setActive} />
                    </Stepper.Step>

                    <Stepper.Step label="Third step" description="Add Subject Content">
                        <CourseForm setActive={setActive} setSubjectID={setSubjectID} setSubjectTitle={setSubjectTitle} />
                    </Stepper.Step>

                    <Stepper.Completed>
                        <div className="flex justify-center items-center flex-col mt-8 w-full">
                            <div className={`${isSmallMobile ? 'w-32' : isMobile ? 'w-40' : 'w-48'} flex justify-center items-center`}>
                                <Lottie animationData={AddedJson} loop={true} />
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        navigate(`/chapters?id=${subjectID}&title=${subjectTitle}`);
                                        setActive(0);
                                    }}
                                    className={`!bg-main !text-white !font-semibold !mt-8 !w-fit ${isSmallMobile ? '!text-base !py-1.5 !px-6' : isMobile ? '!text-lg !py-2 !px-8' : '!text-lg !py-2 !px-10'}`}
                                >
                                    Done
                                </Button>
                            </div>
                        </div>
                    </Stepper.Completed>
                </Stepper>
            </div>
        </section>
    );
};

export default StepperForm;
