import { Search } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxSizing: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value=""
        onChange={() => {}}
      />
      <IconButton type="submit" sx={{ p: "10px", color: "#20B2FF" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};
export default SearchBar;
