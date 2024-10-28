import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";
import { Video } from "../utils/types";

interface VideoDetail extends Video {
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

const VideoDetail: React.FC = () => {
  // Added type annotation for functional component
  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null); // Specified type for useState
  const [videos, setVideos] = useState<Video[]>(null); // Specified type for videos state
  const { id } = useParams<{ id: string }>(); // Added type annotation for useParams

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(
      (data: { items: VideoDetail[] }) => {
        setVideoDetail(data.items[0]);
        // Update the document title with the video title
        const videoTitle = data.items[0]?.snippet?.title;
        if (videoTitle) {
          console.log("Updating document title to:", videoTitle);
          document.title = videoTitle;
        } else {
          console.log("Video title not found, using default");
          document.title = "BeTube";
        }
      }
    );
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data: { items: Video[] }) => {
        setVideos(data.items);
      }
    );
    // Cleanup function
    return () => {
      document.title = "BeTube";
    };
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ sx: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant="h6" // Changed to a single variant
                  color="#fff"
                  sx={{
                    // Added responsive styles using sx
                    fontSize: { sm: "subtitle1", md: "h6" },
                  }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};
export default VideoDetail;
