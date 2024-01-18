import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/auth.state";
// Importación de FontAwesomeIcons para mostrar un ícono de cierre de sesión en el componente.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./LogOutButton.css";

const LogoutButton: React.FC = () => {
  const { auth, setAuth } = useStateContext();
  const navigate = useNavigate();

  const onClick = () => {
    if (auth) {
      setAuth({
        isLogged: false,
        user: null,
      });
      sessionStorage.removeItem("_userCredential");
      navigate("/");
    }
  };

  return (
    <div
      className="logout-container"
      onClick={onClick}
      title="Haz click para cerrar sesión"
    >
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
    </div>
  );
};

export default LogoutButton;
