import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";
import { Video } from "../utils/types";

const SearchFeed = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  const { searchTerm } = useParams<{ searchTerm: string }>();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then(
      (data: { items: Video[] }) => {
        setVideos(data.items);
      }
    );
  }, [searchTerm]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for{" "}
        <span style={{ color: "#20B2FF" }}>{searchTerm}</span> videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};
export default SearchFeed;
