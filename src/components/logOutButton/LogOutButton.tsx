import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/auth.state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./LogOutButton.css";

const LogoutButton: React.FC = () => {
  const { auth, setAuth } = useStateContext();
  const navigate = useNavigate();

  const onClick = () => {
    setAuth({
      isLogged: false,
      user: null,
    });
    sessionStorage.removeItem("_userCredential");
    navigate("/");
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
