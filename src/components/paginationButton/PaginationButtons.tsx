import React from "react";
import "./PaginationButton.css";
import { formatearNumero } from "../../utils/utils";

interface PaginationButtonsProps {
  currentPage: number; // pagina actual
  totalPages: number; // paginas totales
  onPageChange: (newPage: number, change: string) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1, "previous");
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1, "next");
    }
  };

  return (
    <div className="pagination">
      <button
        className="paginationButton"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Página Anterior
      </button>
      <span className="paginationTotal">
        {" "}
        <strong>
          Página {currentPage} de {formatearNumero(totalPages.toString())}
        </strong>
      </span>
      <button
        className="paginationButton"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Página Siguiente
      </button>
    </div>
  );
};

export default PaginationButtons;
