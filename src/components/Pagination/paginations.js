import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink
            type="button"
            previous
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem key={number} active={number === currentPage}>
            <PaginationLink type="button" onClick={() => onPageChange(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationLink
            type="button"
            next
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default Paginations;
