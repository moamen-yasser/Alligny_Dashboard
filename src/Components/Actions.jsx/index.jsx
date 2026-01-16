import { Button, Tooltip, Group } from "@mantine/core";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const TableActions = ({
    id,
    status,
    handleAction,
    isLoadingApprove,
    isLoadingReject,
}) => {
    const isApproved = status === "Approved" || status === "active";
    const isRejected = status === "Rejected";

    return (
        <Group gap="xs" justify="center" wrap="nowrap">
            <Tooltip label="Approve" position="top" withArrow disabled={isApproved}>
                <Button
                    variant="transparent"
                    className={`!p-0 !min-w-fit !h-fit transition-transform !bg-transparent 
                        ${isApproved ? "!opacity-40 !cursor-not-allowed" : "hover:scale-110"}`}
                    onClick={() => handleAction(id, "approve")}
                    disabled={isApproved || isLoadingApprove || isLoadingReject}
                    loading={isLoadingApprove}
                    loaderProps={{ color: "#09C648", type: "dots", size: "xs" }}
                >
                    <AiFillCheckCircle color="#09C648" size={26} />
                </Button>
            </Tooltip>

            <Tooltip label="Reject" position="top" withArrow disabled={isRejected}>
                <Button
                    variant="transparent"
                    className={`!p-0 !min-w-fit !h-fit transition-transform !bg-transparent
                        ${isRejected ? "!opacity-40 !cursor-not-allowed" : "hover:scale-110"}`}
                    onClick={() => handleAction(id, "reject")}
                    disabled={isRejected || isLoadingApprove || isLoadingReject}
                    loading={isLoadingReject}
                    loaderProps={{ color: "red", type: "dots", size: "xs" }}
                >
                    <AiFillCloseCircle color="red" size={26} />
                </Button>
            </Tooltip>
        </Group>
    );
};

export default TableActions;