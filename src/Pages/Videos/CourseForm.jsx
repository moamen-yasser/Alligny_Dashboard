import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiFillCloseCircle } from 'react-icons/ai';
import ValidationSchema from '../../Forms/ValidationSchema';
import FileUploadInput from '../../Forms/FileUploadInput';
import TextInputField from '../../Forms/TextInputField';
import { useUploadFileMutation, useUploadChaptersMutation } from '../../Service/Apis/subjectApi';
import { showNotification } from '../../utils/notification';
import PropTypes from 'prop-types';

const ChapterForm = ({ control, index, remove, errors, isRemovable }) => (
    <div className="mb-4 p-4 border rounded-lg relative">
        {isRemovable && (
            <Button
                type="button"
                onClick={() => remove(index)}
                className="!absolute !top-2 !right-2 !p-1 !bg-transparent"
            >
                <AiFillCloseCircle color="red" size={25} />
            </Button>
        )}

        <TextInputField
            control={control}
            name={`chapters.${index}.chapterTitle`}
            placeholder="Add Chapter Title"
            error={errors.chapters?.[index]?.chapterTitle?.message}
            label="Chapter Title"
            login={true}
        />

        <TextInputField
            control={control}
            name={`chapters.${index}.chapterDescription`}
            placeholder="Add Chapter Description"
            error={errors.chapters?.[index]?.chapterDescription?.message}
            label="Chapter Description"
        />

        <FileUploadInput
            control={control}
            name={`chapters.${index}.chapterFile`}
            placeholder="Upload Chapter File"
            error={errors.chapters?.[index]?.chapterFile?.message}
            label="Chapter File"
        />
    </div>
);

ChapterForm.propTypes = {
    control: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired,
    errors: PropTypes.object,
    isRemovable: PropTypes.bool.isRequired
};

const AddChapterButton = ({ append }) => (
    <div
        onClick={() => append({ chapterTitle: '', chapterDescription: '', chapterFile: null })}
        className={`mt-4 px-0 lg:px-12 text-main text-sm lg:text-xl font-paragarphFont font-semibold flex justify-center items-center gap-1 w-full
        sm:text-base sm:w-auto before:h-0 before:m-2 before:border before:border-main before:flex-1 after:h-0 after:m-2 
        after:border after:border-main after:flex-1 
        transition ease-in-out duration-300 cursor-pointer hover:text-hoverColor`}
    >
        <IoIosAddCircleOutline /> Add a New Chapter
    </div>
);

AddChapterButton.propTypes = {
    append: PropTypes.func.isRequired
};

const FormActions = ({ onCancel, isValid, isLoading }) => (
    <div className="flex justify-end space-x-4 !mt-8">
        <Button
            type="button"
            variant="outline"
            className="!text-gray border !border-gray !rounded-lg !px-6 !py-2"
            onClick={onCancel}
            disabled={isLoading}
        >
            Cancel
        </Button>
        <Button
            type="submit"
            className="!bg-main !text-white hover:!bg-hoverColor !rounded-lg !px-6 !py-2"
            disabled={!isValid || isLoading}
            loading={isLoading}
            loaderProps={{ type: 'dots' }}
        >
            Confirm
        </Button>
    </div>
);

FormActions.propTypes = {
    onCancel: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const useCourseForm = ({ setActive, setSubjectID, setSubjectTitle }) => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(ValidationSchema),
        defaultValues: {
            chapters: [{ chapterTitle: '', chapterDescription: '', chapterFile: null }],
        },
    });

    const [uploadChapters, { isLoading: isLoadingChapter }] = useUploadChaptersMutation();
    const [uploadFile, { isLoading: isLoadingFile }] = useUploadFileMutation();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'chapters',
    });

    const handleSubmit = async (data) => {
        const selectedSubject = JSON.parse(localStorage.getItem('selectedSubject') || '{}');
        const subjectId = selectedSubject?.selectedSubject?.id;
        const subjectTitle = selectedSubject?.selectedSubject?.title;

        if (!subjectId) {
            showNotification.error('No subject selected');
            return;
        }

        try {
            // Step 1: Create all chapters first (without files)
            const chaptersPayload = data?.chapters?.map(chapter => ({
                title: chapter?.chapterTitle,
                description: chapter?.chapterDescription,
                subjectId: subjectId
            }));

            // Upload chapters data
            const createResponse = await uploadChapters({
                body: chaptersPayload
            }).unwrap();

            // Step 2: Upload PDF files for each chapter
            const uploadResults = await Promise.allSettled(
                createResponse?.map(async (chapter, index) => {
                    if (data.chapters[index]?.chapterFile) {
                        const formData = new FormData();
                        formData.append('file', data?.chapters[index]?.chapterFile);
                        await uploadFile({
                            id: chapter?.id, // Use the chapter ID from response
                            body: formData
                        }).unwrap();
                    }
                    return chapter;
                })
            );

            // Process results
            const successfulUploads = uploadResults.filter(r => r.status === 'fulfilled');
            const failedUploads = uploadResults.filter(r => r.status === 'rejected');

            if (failedUploads.length === 0) {
                showNotification.success(`${successfulUploads.length} chapters with PDFs uploaded successfully`);
            } else {
                const errorMessages = failedUploads.map((f, i) =>
                    `Chapter ${i + 1}: ${f.reason?.message || 'File upload failed'}`);
                showNotification.warning(
                    `Chapters created but ${failedUploads.length} file uploads failed:\n${errorMessages.join('\n')}`
                );
            }

            form.reset();
            setActive(3);
            setSubjectID(subjectId);
            setSubjectTitle(subjectTitle);

        } catch (error) {
            showNotification.error('Upload failed: ' + (error.data?.message || error.message));
            return [];
        }
    };
    return { form, fields, append, remove, handleSubmit, isLoadingChapter, isLoadingFile };
};

const CourseForm = ({ setActive, setSubjectID, setSubjectTitle }) => {
    const {
        form: { control, handleSubmit, reset, formState: { errors, isValid } },
        fields,
        append,
        remove,
        isLoadingChapter,
        isLoadingFile,
        handleSubmit: onSubmit
    } = useCourseForm({ setActive, setSubjectID, setSubjectTitle });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-8">
                    <div className="flex-1 w-3/4 space-y-4">
                        <div>
                            {fields?.map((lesson, index) => (
                                <div key={lesson.id}>
                                    <label className="block text-lg font-bold text-main ml-1 mb-1">
                                        Chapter {index + 1}
                                    </label>
                                    <ChapterForm
                                        control={control}
                                        index={index}
                                        remove={remove}
                                        errors={errors}
                                        isRemovable={fields.length > 1}
                                    />
                                </div>
                            ))}

                            <AddChapterButton append={append} />
                        </div>

                        <FormActions
                            onCancel={reset}
                            onSubmit={handleSubmit(onSubmit)}
                            isValid={isValid}
                            isLoading={isLoadingChapter || isLoadingFile}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};


CourseForm.propTypes = {
    setActive: PropTypes.func.isRequired,
    setSubjectID: PropTypes.func.isRequired,
    setSubjectTitle: PropTypes.func.isRequired
};
export default CourseForm;