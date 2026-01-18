import * as Yup from "yup";

export const getUploadVideoValidationSchema = (t) => Yup.object().shape({
    video: Yup.mixed()
        .required(t("video_required"))
        .test("fileSize", t("max_file_size"), (value) => {
            if (!value) return false;
            return value.size <= 50 * 1024 * 1024; // 50MB
        })
        .test("fileType", t("video_file_only"), (value) => {
            if (!value) return false;
            return value.type.startsWith('video/');
        }),
    description: Yup.string()
        .required(t("description_required"))
        .min(3, t("description_min", { count: 3 }))
        .max(500, t("description_max", { count: 500 })),
    section: Yup.string()
        .required(t("video_position_required"))
        .oneOf(['top', 'down'], t("invalid_position")),
});
