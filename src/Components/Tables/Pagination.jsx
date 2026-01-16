import { useEffect } from "react";
import { Pagination } from "@mantine/core";

const PaginationComp = ({ activePage, setPage, total, size }) => {
  useEffect(() => {
    if (total < activePage) {
      setPage(total);
    }
  }, [total, activePage, setPage]);

  const handlePageChange = (page) => {
    setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <Pagination
      value={activePage || 1}
      onChange={handlePageChange}
      total={total}
      color="#50C5C8"
      size={size}
      className="flex justify-center items-center"
    />
  );
};

export default PaginationComp;
