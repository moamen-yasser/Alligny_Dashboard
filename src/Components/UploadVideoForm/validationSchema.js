import * as Yup from "yup";

export const uploadVideoValidationSchema = Yup.object().shape({
    video: Yup.mixed()
        .required("Video file is required")
        .test("fileSize", "File size must be less than 50MB", (value) => {
            if (!value) return false;
            return value.size <= 50 * 1024 * 1024; // 50MB
        })
        .test("fileType", "Only video files are allowed", (value) => {
            if (!value) return false;
            return value.type.startsWith('video/');
        }),
    description: Yup.string()
        .required("Description is required")
        .min(3, "Description must be at least 3 characters")
        .max(500, "Description must not exceed 500 characters"),
    section: Yup.string()
        .required("Video position is required")
        .oneOf(['top', 'down'], "Please select either Up or Down section"),
});
