import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

type SideBarProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};
const SideBar = ({ selectedCategory, setSelectedCategory }: SideBarProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          style={{
            background: category.name === selectedCategory ? "#20B2FF" : "none",
            color: category.name === selectedCategory ? "white" : "#20B2FF",
          }}
          key={category.name}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : "#20B2FF",
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};
export default SideBar;
