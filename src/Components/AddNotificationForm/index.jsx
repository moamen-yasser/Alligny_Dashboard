import { Modal, Flex } from "@mantine/core";
import DynamicForm from "./DynamicForm";
import DynamicFormFields from "./DynamicFormFields";
import { useTranslation } from "react-i18next";

const AddNotificationForm = ({ opened, close, refetch }) => {
    const { form } = DynamicFormFields();
    const { t } = useTranslation();

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={<div><h3 className="text-xl font-bold text-main">{t('add_notification')}</h3></div>}
            centered
            closeOnEscape={false}
            closeOnClickOutside={false}
            withCloseButton={false}
            size="md"
            radius="lg"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            classNames={{
                header: "dark:!bg-slate-900",
                content: "dark:!bg-slate-900 border dark:border-slate-700",
            }}
        >
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap={4}
                className="w-full"
            >
                <DynamicForm
                    fields={form.fields}
                    validationSchema={form.validationSchema}
                    onSubmit={async (data) => {
                        try {
                            await form.onSubmit(data);
                            if (refetch) refetch();
                            close();
                        } catch (error) {
                            // Error handled in DynamicFormFields
                        }
                    }}
                    isLoading={form.isLoading}
                    defaultValues={form.defaultValues}
                    close={close}
                />
            </Flex>
        </Modal>
    );
};

export default AddNotificationForm;
