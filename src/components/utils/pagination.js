const PaginationUtil = (items, pageNumber, pageSize) => {
  let startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export default PaginationUtil;
