import { Box, Stack } from "@mui/material";
import VideoCard from "./VideoCard";

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface VideosProps {
  videos: Video[]; // Specified type for videos prop
  direction?: "row" | "column"; // Optional prop for direction
}

const Videos: React.FC<VideosProps> = ({ videos, direction }: VideosProps) => {
  // Added type annotation for functional component
  if (!videos?.length) return <div>No videos found</div>;

  return (
    <Stack
      direction={direction || "row"} // Default direction to "row"
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((video) => (
        <Box key={video.id.videoId}>
          <VideoCard video={video} />
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
