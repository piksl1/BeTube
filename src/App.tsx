import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ChannelDetail,
  Feed,
  Navbar,
  SearchFeed,
  VideoDetail,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#1a1c1c" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
export default App;
