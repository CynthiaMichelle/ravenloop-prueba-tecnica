import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Search.css"

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, handleSearch, handleKeyPress }) => {
  return (
    <div className="searchContainer">
      <input
        className="Search"
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      ></input>
      <div className="Btn">
        <button className="searchButton" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;
