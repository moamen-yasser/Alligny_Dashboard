import { Pagination } from "@mantine/core";

const PaginationComp = ({ activePage, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const handlePageChange = (page) => {
        onPageChange(page);

        const scrollContainer = document.querySelector('.overflow-y-auto');
        if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="flex justify-center mt-8">
            <Pagination
                value={activePage}
                onChange={handlePageChange}
                total={totalPages}
                color="#50C5C8"
                size="md"
                className="flex justify-center items-center"
            />
        </div>
    );
};

export default PaginationComp;
