import { Modal, Button, Text } from '@mantine/core';
import { HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

export function ConfirmModal({
  opened,
  close,
  title,
  description,
  handleConfirm,
  actionText,
  isLoading
}) {
  const { t } = useTranslation();
  const isApprove = actionText?.toLowerCase() === "approve";

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="md"
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
      classNames={{
        content: "!bg-white dark:!bg-slate-800 border dark:border-slate-700 !rounded-xl shadow-xl",
        header: "!hidden"
      }}
    >
      <div className="space-y-6 p-1">
        <Text className="!text-xl !font-bold text-slate-900 dark:text-white">
          {title}
        </Text>

        <div className={`flex items-center gap-4 p-4 rounded-xl border ${isApprove
          ? "bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-800/60"
          : "bg-red-50/50 border-red-100 dark:bg-red-900/10 dark:border-red-800/60"
          }`}>
          <div className="flex-shrink-0">
            {isApprove ? (
              <HiCheckCircle className="text-green-600 dark:text-green-400" size={24} />
            ) : (
              <HiExclamationTriangle className="text-red-600 dark:text-red-400" size={24} />
            )}
          </div>
          <Text className={`!text-sm !font-medium !leading-relaxed ${isApprove ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"
            }`}>
            {description}
          </Text>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="default"
            className="!h-10 px-8 !border-slate-200 dark:!border-slate-700 !bg-white dark:!bg-slate-800 !text-slate-600 dark:!text-slate-400 hover:!bg-slate-50 dark:hover:!bg-slate-700 transition-all"
            disabled={isLoading}
            onClick={close}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleConfirm}
            color={isApprove ? "#09C648" : "red"}
            className="!h-10 px-8 hover:opacity-90 transition-all shadow-sm"
            loading={isLoading}
            loaderProps={{
              color: 'white',
              size: 'sm',
              type: 'dots'
            }}
          >
            {t(actionText?.toLowerCase() || 'approve')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}