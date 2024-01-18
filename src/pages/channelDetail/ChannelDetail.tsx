import React, { useState } from "react";
import VideosList from "../../components/videoList/VideosList";
import ChannelStatistics from "../../components/channelStatistics/ChannelStatistics";
import ChannelDetailButton from "../../components/channelDetailButton/ChannelDetailButton";


interface PageState {
  activeTab: "videos" | "statistics";
}

interface ChannelDetailProps {
  channelId: string;
}

const ChannelDetail: React.FC<ChannelDetailProps> = ({ channelId }) => {
  const [pageState, setPageState] = useState<PageState>({
    activeTab: "videos",
  });

  return (
    <div className="channelDetail">
      <div>
        <ChannelDetailButton
          label="LISTA DE VIDEOS"
          onClick={() => setPageState({ activeTab: "videos" })}
          isDisabled={pageState.activeTab === "videos"}
        />
        <ChannelDetailButton
          label="ESTADISTICAS DE CANAL"
          onClick={() => setPageState({ activeTab: "statistics" })}
          isDisabled={pageState.activeTab === "statistics"}
        />
      </div>
      <div>
        {pageState.activeTab === "videos" && (
          <div>
            <VideosList channelId={channelId}></VideosList>
          </div>
        )}
        {pageState.activeTab === "statistics" && (
          <div>
            <ChannelStatistics channelId={channelId}></ChannelStatistics>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDetail;
