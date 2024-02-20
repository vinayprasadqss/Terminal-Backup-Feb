export const handleNextPage = (currentPage, total, setCurrentPage) => {
  if (currentPage === total) {
    return;
  } else {
    setCurrentPage(currentPage + 1);
  }
};
export const handlePrevPage = (currentPage, setCurrentPage) => {
  if (currentPage === 1) {
    return;
  } else {
    setCurrentPage(currentPage - 1);
  }
};
