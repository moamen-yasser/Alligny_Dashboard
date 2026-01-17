import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useUrlPagination = (key = "page", initialPage = 1) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get(key)) || initialPage;

    const setPage = useCallback((newPage) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (newPage <= 1) {
                next.delete(key);
            } else {
                next.set(key, newPage.toString());
            }
            return next;
        }, { replace: true });
    }, [key, setSearchParams]);

    return [page, setPage];
};
