import { Card, Text, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mantine/hooks";

const SubjectCard = ({ image, data, chapterListing }) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Card
            className="!shadow-smoothCard hover:!shadow-smoothCardHover transition-shadow duration-300 !rounded-lg flex flex-col justify-center items-center !max-h-auto w-full dark:!bg-slate-900 dark:border dark:border-slate-700"
            p={0}
        >
            <Card.Section className='w-full px={0} py={0}'>
                <div className={`${isMobile ? 'max-h-[320px]' : chapterListing ? "max-h-[200px] !w-52 !h-40 pl-20 pt-5" : "max-h-[205px]"} overflow-hidden w-full`}>
                    <img
                        src={image}
                        alt={data?.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            </Card.Section>

            <div className={`w-full px-3 text-left h-[110px] ${isMobile ? 'pb-1' : ''}`}>
                <Text className={`!mt-2 !capitalize !text-textSecondColor dark:!text-white !font-[900] !line-clamp-2 ${isMobile ? '!text-base' : '!text-lg'}`}>
                    {`${data?.title}.`}
                </Text>
                <Text className={`!mt-1 !text-textSecondColor dark:!text-slate-200 !font-medium !line-clamp-2 ${isMobile ? '!text-xs' : '!text-sm'}`}>
                    {`${data?.description}.`}
                </Text>
            </div>

            <Button
                className={`!mt-2 !text-white !w-[90%] !mb-2 !rounded-lg 
                    !bg-gradient-to-r from-[#023336] to-[#045056] 
                    hover:from-[#045056] hover:to-[#023336] 
                    ${isMobile ? '!py-1 !text-sm' : '!py-1.5'}`}
                onClick={() => navigate(`/${chapterListing ? 'questions' : 'chapters'}?id=${data?.id}&title=${data?.title}`)}
            >
                {`View All ${chapterListing ? "Questions" : "Chapters"}`}
            </Button>
        </Card>
    );
};



export default SubjectCard;
