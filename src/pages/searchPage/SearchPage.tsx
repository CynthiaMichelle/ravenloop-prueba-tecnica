import React, { useState, useEffect } from "react";
import ChannelDetail from "../channelDetail/ChannelDetail";
import LogoutButton from "../../components/logOutButton/LogOutButton";
import Search from "../../components/search/Search";
import "./SearchPage.css";

interface SearchResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ItemsSearchResult[];
}

interface ItemsSearchResult {
  kind: string;
  etag: string;
  id: {
    kind: string;
    channelId: string;
  };
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // Cuando hay un nuevo resultado de búsqueda, establece el canal seleccionado
    if (searchResult && searchResult.items.length > 0) {
      setSelectedChannelId(searchResult.items[0].id.channelId);
    }
  }, [searchResult]);

  const handleSearch = async () => {
    if (query) {
      try {
        // Realiza la llamada al endpoint con la query actual
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=~${query}&type=channel&key=${APIKEY}`
        );
        const data: SearchResult = await response.json();

        // Actualiza el estado con la respuesta del endpoint
        setSearchResult(data);
        if (data.pageInfo.totalResults === 0) {
          window.alert(
            "No se han encontrado resultados. Prueba con otro nombre"
          );
        }
      } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
        window.alert("No se han encontrado resultados. Prueba con otro nombre");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <LogoutButton></LogoutButton>
      <div className="header">
        <h1>Busca tu canal favorito</h1>
        <div className="search-wrapper">
          <Search
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            handleKeyPress={handleKeyPress}
          />
        </div>
      </div>
      {selectedChannelId && (
        <ChannelDetail channelId={selectedChannelId}></ChannelDetail>
      )}
    </div>
  );
};

export default SearchPage;