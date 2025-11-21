import { useCallback, useEffect, useState } from "react";
import { useAppConfigContext } from "./useAppConfig";
import { useRouter } from "next/router";
import { defaultPaginatedItem } from "../contexts/AppConfig";
import { PaginatedItems } from "../utilities/constants/paginatedItems";

interface PaginationProps {
  enabled: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  handleChangePage: (newPage: number) => void;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const usePagination = (paginatedItems: PaginatedItems): PaginationProps => {
  const appContext = useAppConfigContext();
  const router = useRouter();
  const pagination = appContext?.pagination?.[paginatedItems];
  const { enabled, pageSize } = pagination || defaultPaginatedItem;
  const [totalPages, setTotalPages] = useState(1);
  const query = router?.query;
  const currentPage = Number(query?.Page) || 1;

  const handleChangePage = useCallback(
    (newPage: number) => {
      if (enabled && router?.isReady && (newPage !== undefined || newPage !== currentPage)) {
        const pageValue = newPage > totalPages ? totalPages : newPage;
        router.push(
          {
            query: { ...router.query, Page: pageValue },
          },
          undefined,
          { shallow: true }
        );
      }
    },
    [currentPage, router, totalPages, enabled]
  );

  useEffect(() => {
    if (enabled && query?.Page === undefined) {
      handleChangePage(currentPage);
    }
  }, [enabled, query?.Page, totalPages, currentPage, handleChangePage]);

  return { enabled, pageSize, currentPage, totalPages, handleChangePage, setTotalPages };
};

export { usePagination, PaginationProps };
