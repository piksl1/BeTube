import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Box } from "@mui/material";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

export interface Channel {
  id?: {
    channelId?: string;
  };
  snippet?: {
    title?: string;
    thumbnails?: {
      high?: {
        url?: string;
      };
    };
  };
  statistics?: {
    subscriberCount?: string;
  };
}

interface Video {
  // Define the structure of a video
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    // Add other fields as necessary
  };
}

const ChannelDetail: React.FC = () => {
  const [channelDetail, setChannelDetail] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const { id } = useParams<{ id: string }>();

  console.log(channelDetail, videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(32,171,255,1) 35%, rgba(32,178,255,1) 100%",
            zIndex: 10,
            height: "300px",
          }}
        />
        {channelDetail && (
          <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
        )}{" "}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} direction="column" />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
