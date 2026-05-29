type PaginationProps = {
  currentPage: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
};


// Pagination navigation component
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );


  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "20px",
      }}
    >

      {pages.map((page) => (

        <button
          key={page}
          onClick={() =>
            onPageChange(page)
          }
          style={{
            padding: "8px 14px",
            cursor: "pointer",

            backgroundColor:
              currentPage === page
                ? "#111"
                : "#fff",

            color:
              currentPage === page
                ? "#fff"
                : "#111",

            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >

          {page}

        </button>

      ))}

    </div>
  );
}