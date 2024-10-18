import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");

  const [videos, setVideos] = useState<[]>([]);

  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       const data = await fetchFromAPI(
  //         `search?part=snippet&q=${selectedCategory}`
  //       );
  //       setVideos(data.items); // Ensure data.items is the correct path
  //     } catch (error) {
  //       console.error("Error fetching videos:", error);
  //     }
  //   };

  //   fetchVideos();
  // }, [selectedCategory]);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2024 BeTube
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#20B2FF" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};
export default Feed;
