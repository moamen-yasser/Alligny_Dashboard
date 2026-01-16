import { useForm } from 'react-hook-form';
import SelectBox from '../../Forms/SelectBox';
import { Button, Group } from '@mantine/core';

const SelectSubject = ({ setActive }) => {
    const subjectsData = JSON.parse(localStorage.getItem('subjects') || '{}');
    const subjects = subjectsData?.data || [];
    
    const subjectOptions = subjects.map(subject => ({
        value: subject.id.toString(),
        label: subject.title
    }));

    const { control, handleSubmit, formState: { isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            subjectName: '',
        },
    });

    const onSubmit = (data) => {
        const selectedSubject = subjects.find(
            subject => subject.id.toString() === data.subjectName
        );

        if (selectedSubject) {
            localStorage.setItem('selectedSubject', JSON.stringify({selectedSubject}));
            setActive(2);
        } else {
            console.error('Selected subject not found in subjects data');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 lg:pr-[50%]'>
                <SelectBox
                    name="subjectName"
                    control={control}
                    label="Subject Name"
                    placeholder="Select Subject"
                    data={subjectOptions}
                    rules={{ required: 'Subject Name is required' }}
                    required
                />

                <Group mt="md" className='!flex !justify-center !w-full'>
                    <Button 
                        type="submit" 
                        disabled={!isValid || subjectOptions.length === 0}
                        className={`!mt-4 !bg-textSecondColor !font-bold !text-lg !w-[80%] !h-[50px] !text-white hover:!bg-hoverColor !rounded-xl !py-2 !px-6`}
                        loaderProps={{ type: "dots" }}
                    >
                        Next
                    </Button>
                </Group>
            </form>
        </div>
    )
}

export default SelectSubject;