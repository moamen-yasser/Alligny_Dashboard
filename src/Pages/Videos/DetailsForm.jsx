import { Button, Group } from '@mantine/core';
import { useForm } from 'react-hook-form';
import SelectBox from '../../Forms/SelectBox';
import { useGetSubjectsMutation } from '../../Service/Apis/subjectApi';
import { showNotification } from '../../utils/notification';

const DetailsForm = ({setActive}) => {
    const { control, handleSubmit, formState: { isValid } } = useForm({
        mode: 'onChange', 
        defaultValues: {
            academicYear: '',
            semester: '',
        },
    });

    const [getSubjects, {isLoading: isLoadingGetSubject}] = useGetSubjectsMutation();

    const onSubmit = async (data) => {
        const formattedData = {
            AcademicYear: parseInt(data?.academicYear),
            Semester: data.semester === '1' ? 'One' : 'Two'
        };

        try {
            const response = await getSubjects(formattedData);
            if (response?.data) {
                localStorage.setItem('subjects', JSON.stringify(response?.data));
                localStorage.setItem('yearAndSemester', JSON.stringify(formattedData));
                setActive(1);
                showNotification.success(response);
            }
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
            showNotification.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 lg:pr-[50%]'>
                <SelectBox
                    name="academicYear"
                    control={control}
                    label="Academic Year"
                    placeholder="Select Academic Year"
                    data={[
                        { value: '1', label: 'Year 1' },
                        { value: '2', label: 'Year 2' },
                        { value: '3', label: 'Year 3' },
                        { value: '4', label: 'Year 4' },
                    ]}
                    rules={{ required: 'Academic Year is required' }}
                    required
                />

                <SelectBox
                    name="semester"
                    control={control}
                    label="Semester"
                    placeholder="Select Semester"
                    data={[
                        { value: '1', label: 'Semester 1' },
                        { value: '2', label: 'Semester 2' },
                    ]}
                    rules={{ required: 'Semester is required' }}
                    required
                    mt="md"
                />

                <Group mt="md" className='!flex !justify-center !w-full'>
                    <Button 
                        type="submit" 
                        disabled={!isValid}
                        className={`!mt-4 !bg-textSecondColor !font-bold !text-lg !w-[80%] !h-[50px] !text-white hover:!bg-hoverColor !rounded-xl !py-2 !px-6`}
                        loading={isLoadingGetSubject}
                        loaderProps={{ type: "dots" }}
                    >
                        Next
                    </Button>
                </Group>
            </form>
        </div>
    )
}

export default DetailsForm
