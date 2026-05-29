type SearchBarProps = {
  searchQuery: string;

  onSearchChange: (
    value: string
  ) => void;

  onSearch: () => void;
};


// Question search input component
export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearch,
}: SearchBarProps) {

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >

      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(event) =>
          onSearchChange(
            event.target.value
          )
        }
        style={{
          padding: "10px",
          flex: 1,
        }}
      />

      <button
        onClick={onSearch}
        style={{
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >

        Search

      </button>

    </div>
  );
}