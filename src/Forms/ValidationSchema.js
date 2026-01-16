import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    // subjectImage: yup
    //     .mixed()
    //     .required('Subject Image is required')
    //     .test('fileType', 'Only image files are allowed', (value) => {
    //         if (!value) return false; // Ensure a file is uploaded
    //         return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    //     }),
    // subjectTitle: yup.string().required('Subject Title is required'),
    // subjectDescription: yup.string().required('Subject Description is required'),
    chapters: yup
        .array()
        .of(
            yup.object().shape({
                chapterTitle: yup
                .string()
                .required('Chapter Title is required')
                .min(5, 'Chapter Title must be at least 5 characters')
                .max(50, 'Chapter Title must not exceed 50 characters'),
                chapterDescription: yup
                .string()
                .required('Chapter Description is required')
                .min(20, 'Chapter Description must be at least 20 characters')
                .max(500, 'Chapter Description must not exceed 500 characters'),
                chapterFile: yup
                    .mixed()
                    .required('Chapter File is required')
                    .test('fileType', 'Only PDF or Text files are allowed', (value) => {
                        if (!value) return false; 
                        return value.type === 'application/pdf', 'text/plain';
                    }),
            })
        )
        .min(1, 'At least one chapter is required'), 
});

export default ValidationSchema;