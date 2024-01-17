import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import "./ChannelStatistics.css";
import BarChartComponent from "../barChart/BarChartComponent";
import {
  ChannelListResponse,
  ChannelStatisticsProps,
} from "./ChannelStatistics.interface";
import { calculateViewsPerVideo, formatearNumero } from "../../utils/utils";

const ChannelStatistics: React.FC<ChannelStatisticsProps> = ({ channelId }) => {
  const [statistics, setStatistics] = useState<ChannelListResponse | null>(
    null
  );

  const visitasUltimoAño = {
    enero: 683684,
    febrero: 974407,
    marzo: 783114,
    abril: 737201,
    mayo: 680590,
    junio: 788215,
    julio: 794548,
    agosto: 815474,
    septiembre: 738989,
    octubre: 713444,
    noviembre: 649015,
    diciembre: 817669,
  };

  useEffect(() => {
    // URL del endpoint a la que deseas hacer la solicitud
    const APIKEY = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${channelId}&key=${APIKEY}`;

    // Realiza la solicitud Fetch al endpoint
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar los datos");
        }
        return response.json();
      })
      .then((responseData: ChannelListResponse) => {
        setStatistics(responseData); // Almacena la respuesta en el estado local
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // El segundo argumento vacío [] indica que este efecto se ejecuta solo una vez al montar el componente

  return statistics ? (
    <>
      <h4 className="title-statics">{statistics.items[0].snippet.title}</h4>

      <div className="row">
        <div className="statics-container">
          <div className="total-subscribers">
            <strong>
              <FontAwesomeIcon className="icon-statics" icon={faUsers} />{" "}
              Subscriptores totales
            </strong>
            <p className="p-statics">
              {formatearNumero(statistics.items[0].statistics.subscriberCount)}
            </p>
          </div>
        </div>
        <div className="statics-container">
          <div className="total-videos">
            <strong>
              <FontAwesomeIcon className="icon-statics" icon={faVideo} />
              Videos totales
            </strong>
            <p className="p-statics">
              {formatearNumero(statistics.items[0].statistics.videoCount)}
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="statics-container">
          <div className="total-visits">
            <strong>
              <FontAwesomeIcon className="icon-statics" icon={faEye} />
              Visitas totales
            </strong>
            <p className="p-statics">
              {formatearNumero(statistics.items[0].statistics.viewCount)}
            </p>
          </div>
        </div>

        <div className="statics-container">
          <div className="means-visits">
            <strong>
              <FontAwesomeIcon className="icon-statics" icon={faChartBar} />
              Media de visitas por vídeo
            </strong>
            <p className="p-statics">
              {calculateViewsPerVideo(
                statistics.items[0].statistics.viewCount,
                statistics.items[0].statistics.videoCount
              )}
            </p>
          </div>
        </div>
      </div>

      <BarChartComponent data={visitasUltimoAño} />
    </>
  ) : (
    <p>Cargando datos...</p>
  );
};

export default ChannelStatistics;
