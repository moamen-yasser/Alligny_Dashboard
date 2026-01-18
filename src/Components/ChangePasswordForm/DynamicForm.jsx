import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mantine/core";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

const DynamicForm = ({
    fields = [],
    validationSchema,
    onSubmit: customSubmit,
    isLoading,
    defaultValues,
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
        <form id="changePasswordForm" onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                                        formState: { setValue }
                                    })
                                }
                            />
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex items-center justify-center py-3 gap-4">
                <Button
                    type="submit"
                    variant="filled"
                    radius="md"
                    className={`!w-full !h-12 !font-semibold !font-title !text-lg !text-white 
                        ${isLoading ? "!bg-subMain !cursor-not-allowed" : "!bg-main"}`}
                    disabled={isLoading}
                    loading={isLoading}
                    loaderProps={{ type: "dots" }}
                >
                    {t('change_password')}
                </Button>
            </div>
        </form>
    );
};

export default DynamicForm;