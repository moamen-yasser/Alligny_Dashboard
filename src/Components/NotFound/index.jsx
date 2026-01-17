import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F6] dark:bg-slate-900 px-4 overflow-hidden">
            <Container className="text-center relative">
                {/* Large Background Text */}
                <div className="absolute inset-0 flex justify-center items-center -top-20 md:-top-32 pointer-events-none select-none opacity-20 dark:opacity-10">
                    <span className="text-[150px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-tr from-main to-subMain animate-pulse">
                        404
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Title className="text-4xl md:text-6xl font-extrabold text-textSecondColor dark:text-white mb-4 animate-[fadeIn_0.8s_ease-out]">
                        Oops! You're lost.
                    </Title>
                    <Text size="lg" className="max-w-lg mx-auto mb-10 text-gray dark:text-gray-400 font-medium animate-[fadeIn_1s_ease-out]">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        Let's get you back on track.
                    </Text>
                    <Group justify="center" className="animate-[fadeIn_1.2s_ease-out]">
                        <Button
                            size="xl"
                            radius="xl"
                            className="!bg-gradient-to-r !from-main !to-subMain hover:!shadow-smoothCardHover !transition-all !duration-500 !px-10 !h-14 !text-lg !font-bold"
                            onClick={() => navigate('/')}
                        >
                            Return Home
                        </Button>
                    </Group>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-main/10 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-subMain/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            </Container>
        </div>
    );
}

// Add these to index.css if not already there or use style tag
// For the blob animation if not in tailwind
