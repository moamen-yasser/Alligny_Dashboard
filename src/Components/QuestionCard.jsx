import { Card, Text, Group, Badge } from "@mantine/core";
import PropTypes from 'prop-types';

const QuestionCard = ({ question, index }) => {
    return (
        <Card className="!mb-4 !shadow-smoothCard hover:!shadow-smoothCardHover transition-shadow duration-300 
            !px-8 !py-4 !rounded-lg !flex-1 !min-w-[45%] !mx-2 !bg-white !cursor-pointer">
            <Text size="lg" weight={500} className="!mb-2 !text-textSecondColor !font-bold !text-xl">
                {index + 1}. {question.questionText}
            </Text>

            <Group spacing="sm" className="!my-3 !w-full !flex !flex-row !gap-4 !items-center !text-textSecondColor !font-semibold !text-lg">
                {question.answers.map((option, optionIndex) => (
                    <Badge 
                        key={optionIndex} 
                        color="blue" 
                        variant="light" 
                        radius="sm" 
                        className="!w-full !text-left !p-3 !cursor-pointer hover:!bg-blue-500 hover:!text-white transition-all duration-300 !flex !justify-start"
                    >
                        {`${String.fromCharCode(65 + optionIndex)}) ${option}`}
                    </Badge>
                ))}
            </Group>

            <div className="!mt-auto"> 
                <Group spacing="sm" className="!flex !items-center !gap-4 !pt-4 !border-t !border-gray-200">
                    <Text className="!text-base !font-semibold !text-textSecondColor">
                        Correct Answer:
                    </Text>
                    <Badge 
                        variant="filled" 
                        radius="sm" 
                        style={{
                            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                            boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        className="!font-bold !p-3 !text-xs hover:!shadow-lg"
                    >
                        {question.correctAnswer}
                    </Badge>
                </Group>
            </div>
        </Card>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.shape({
        questionText: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default QuestionCard;