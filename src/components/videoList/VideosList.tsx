import { useState, useEffect } from "react";
import { YoutubeSearchListResponse } from "./VideosList.interface";
import VideoCard from "../videoCard/VideoCard";
import PaginationButtons from "../paginationButton/PaginationButtons";

interface VideoListProps {
  channelId: string;
}

const VideosList: React.FC<VideoListProps> = ({ channelId }) => {
  const [videos, setVideos] = useState<YoutubeSearchListResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>(
    undefined
  );
  const APIKEY = import.meta.env.VITE_API_KEY;
  const maxResults = 5;

  const handlePageChange = async (newPage: number, change: string) => {
    try {
      setCurrentPage(newPage);

      let pageToken;
      if (change === "next" && nextPageToken) {
        pageToken = nextPageToken;
      } else if (change === "previous" && prevPageToken) {
        pageToken = prevPageToken;
      }

      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=${channelId}&maxResults=${maxResults}&key=${APIKEY}&pageToken=${pageToken}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("No se pudo cargar los datos");
      }

      const responseData: YoutubeSearchListResponse = await response.json();
      setVideos(responseData); // Almacena la respuesta en el estado local
      setNextPageToken(responseData.nextPageToken);
      setPrevPageToken(responseData.prevPageToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=${channelId}&maxResults=${maxResults}&key=${APIKEY}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("No se pudo cargar los datos");
        }

        const responseData: YoutubeSearchListResponse = await response.json();
        setVideos(responseData); // Almacena la respuesta en el estado local
        setCurrentPage(1);
        setNextPageToken(responseData.nextPageToken);
        setPrevPageToken(responseData.prevPageToken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [channelId]); // El segundo argumento vacío [] indica que este efecto se ejecuta solo una vez al montar el componente

  return (
    <>
      <div className="VideoList">
        {videos ? (
          <>
            <div>
              {videos.items.map((video) => (
                <VideoCard
                  key={video.etag}
                  title={video.snippet.title}
                  publishDate={video.snippet.publishedAt}
                  id={video.id.videoId}
                  img={video.snippet.thumbnails.medium.url}
                />
              ))}
            </div>
            <div>
              <PaginationButtons
                currentPage={currentPage}
                totalPages={videos.pageInfo.totalResults}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </>
  );
};

export default VideosList;
