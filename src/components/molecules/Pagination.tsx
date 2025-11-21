import React from "react";
import { Container } from "../atoms/Container";
import { PaginationButton } from "../atoms/PaginationButton";
import clsx from "clsx";

const pages = (start, stop) => Array.from({ length: stop - start + 1 }, (value, index) => start + index);

const getPagesToDisplay = (currentPage, totalPages) => {
  let start = 1;

  if (currentPage + 2 > totalPages && totalPages > 4) {
    start = totalPages - 4;
  } else if (currentPage > 3) {
    if (totalPages > 5) {
      start = currentPage - 2;
    } else {
      start = 1;
    }
  }

  const stop = Math.min(start + 4, totalPages);

  return pages(start, stop);
};

const styling = {
  root: "mb-5 mt-5 flex justify-center",
};

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const className = clsx(styling.root);
  const pagesToDisplay = getPagesToDisplay(currentPage, totalPages);

  const showFirstAndLastButton = totalPages > 5;
  const showPrevAndNextButton = totalPages > 1;
  const firstAndPrevButtonDisabled = currentPage === 1;
  const lastAndNextButtonDisabled = currentPage === totalPages;

  const onPageButtonClick = (page) => {
    onChangePage(page);
  };

  const onPrevButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const onNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const onFirstButtonClick = () => {
    onChangePage(1);
  };

  const onLastButtonClick = () => {
    onChangePage(totalPages);
  };

  return (
    <Container classes={className}>
      {!showFirstAndLastButton ? null : (
        <PaginationButton onClick={onFirstButtonClick} disabled={firstAndPrevButtonDisabled} variant="arrow">
          {"<<"}
        </PaginationButton>
      )}
      {!showPrevAndNextButton ? null : (
        <PaginationButton onClick={onPrevButtonClick} disabled={firstAndPrevButtonDisabled} variant="arrow">
          {"<"}
        </PaginationButton>
      )}
      {pagesToDisplay.map((page, index) => (
        <PaginationButton
          value={page}
          onClick={() => onPageButtonClick(page)}
          disabled={false}
          key={index}
          variant={currentPage === page ? "activePage" : "page"}
        >
          {page}
        </PaginationButton>
      ))}
      {!showPrevAndNextButton ? null : (
        <PaginationButton onClick={onNextButtonClick} disabled={lastAndNextButtonDisabled} variant="arrow">
          {">"}
        </PaginationButton>
      )}
      {!showFirstAndLastButton ? null : (
        <PaginationButton onClick={onLastButtonClick} disabled={lastAndNextButtonDisabled} variant="arrow">
          {">>"}
        </PaginationButton>
      )}
    </Container>
  );
};

export { Pagination };
