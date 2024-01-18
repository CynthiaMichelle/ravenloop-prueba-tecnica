import React, { useState, useEffect } from "react";
import("./VideoCard.css");
import { VideoListResponse, VideoCardProps } from "./VideoCard.interface";
import { calcularHashMD5, formatearFecha } from "../../utils/utils";
import { formatearNumero } from "../../utils/utils";

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  publishDate,
  id,
  img,
}) => {
  const [video, setVideo] = useState<VideoListResponse | null>(null);
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  useEffect(() => {
    const APIKEY = import.meta.env.VITE_API_KEY;

    const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${APIKEY}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar los datos");
        }
        return response.json();
      })
      .then((responseData: VideoListResponse) => {
        setVideo(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="video-card">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <img className="video-thumbnail" src={img} alt="foto del canal" />
      </a>
      <div className="video-details">
        <h3>{title}</h3>
        <p>
          <strong>Visitas:</strong>{" "}
          {formatearNumero(video?.items[0].statistics.viewCount)}
        </p>
        <p>
          <strong>Hash: </strong>
          {calcularHashMD5(title)}
        </p>
        <p>
          <strong>Fecha de publicación:</strong> {formatearFecha(publishDate)}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
