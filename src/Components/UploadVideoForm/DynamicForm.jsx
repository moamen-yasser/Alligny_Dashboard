import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mantine/core";
import { useForm, Controller, useWatch } from "react-hook-form";
import { HiOutlineCloudArrowUp, HiOutlineXMark } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const DynamicForm = ({
    fields = [],
    validationSchema,
    onSubmit: customSubmit,
    isLoading,
    defaultValues,
    close,
}) => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: validationSchema ? yupResolver(validationSchema) : undefined,
        mode: "onChange",
        defaultValues,
    });

    const formValues = useWatch({ control });

    const onSubmit = (data) => customSubmit(data);

    return (
        <form id="uploadVideoForm" onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid grid-cols-1">
                {fields?.map((fieldItem) => {
                    const shouldRender =
                        formValues && typeof fieldItem.condition === "function"
                            ? fieldItem.condition(formValues)
                            : true;

                    if (!shouldRender) return null;

                    return (
                        <div
                            key={fieldItem.id}
                            className="!mb-3"
                        >
                            <Controller
                                name={fieldItem.name}
                                control={control}
                                render={({ field }) =>
                                    fieldItem.component({
                                        field,
                                        error: errors[fieldItem.name]?.message,
                                        setValue
                                    })
                                }
                            />
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex items-center justify-center py-3 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    radius="md"
                    leftSection={<HiOutlineXMark size={20} />}
                    onClick={close}
                    className="!w-full !h-12 !font-semibold !text-base !text-slate-600 dark:!text-slate-400 !border-main hover:!bg-slate-100 dark:hover:!bg-slate-800"
                    disabled={isLoading}
                >
                    {t('no_cancel')}
                </Button>
                <Button
                    type="submit"
                    variant="filled"
                    radius="md"
                    leftSection={<HiOutlineCloudArrowUp size={20} />}
                    className={`!w-full !h-12 !font-semibold !text-base !text-white 
                        ${isLoading ? "!bg-subMain !cursor-not-allowed" : "!bg-main"}`}
                    disabled={isLoading}
                    loading={isLoading}
                    loaderProps={{ type: "dots" }}
                >
                    {t('upload_video')}
                </Button>
            </div>
        </form>
    );
};

export default DynamicForm;
